import NextAuth from "next-auth";

import { authOptions } from "@app/modules/auth/server/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
