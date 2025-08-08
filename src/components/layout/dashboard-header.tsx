export function DashboardHeader() {
  return (
    <header className="border-b border-default">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <div className="font-semibold">FlowTrack</div>
        <div>{/* user menu, workspace switcher — позже */}</div>
      </div>
    </header>
  );
}
