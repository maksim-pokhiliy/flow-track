"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { useForm } from "react-hook-form";

import { FormModal } from "@app/components/flows/modal/form-modal";
import { Stack } from "@app/components/layout";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  RadioGroup,
  RadioGroupItem,
} from "@app/components/ui";
import { useCreateInvitation } from "@app/modules/invitations/api";
import { inviteFormSchema, type InviteFormValues } from "@app/modules/workspaces/model";

type Props = {
  open: boolean;
  workspaceId: string;
  onOpenChange: (open: boolean) => void;
};

export function InviteWorkspaceDialog({ open, workspaceId, onOpenChange }: Props) {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: { email: "", role: Role.MEMBER },
  });

  const { mutate: createInvitation, isPending } = useCreateInvitation(workspaceId);

  const handleSubmit = (values: InviteFormValues) => {
    createInvitation(
      { email: values.email.trim(), role: values.role },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset({ email: "", role: Role.MEMBER });
        },
      },
    );
  };

  return (
    <FormModal<InviteFormValues>
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);

        if (v) {
          form.reset({ email: "", role: Role.MEMBER });
        }
      }}
      title="Invite member"
      description="Send an invitation to join this workspace."
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      submitText="Send invite"
    >
      {(f) => (
        <Stack spacing={4}>
          <FormField
            control={f.control}
            disabled={isPending}
            name="email"
            render={({ field }) => <FormInput type="email" placeholder="Email" {...field} />}
          />

          <FormField
            control={f.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <Stack spacing={2}>
                  <FormLabel>Role</FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <Stack direction="row" spacing={4}>
                        <Stack direction="row" align="center" spacing={2}>
                          <RadioGroupItem value={Role.MEMBER} id="role-member" />

                          <FormLabel htmlFor="role-member" className="font-normal">
                            Member
                          </FormLabel>
                        </Stack>

                        <Stack direction="row" align="center" spacing={2}>
                          <RadioGroupItem value={Role.ADMIN} id="role-admin" />

                          <FormLabel htmlFor="role-admin" className="font-normal">
                            Admin
                          </FormLabel>
                        </Stack>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </FormItem>
            )}
          />
        </Stack>
      )}
    </FormModal>
  );
}
