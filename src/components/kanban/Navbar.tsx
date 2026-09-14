import { Kanban } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Kanban className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">FlowBoard</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Organize your work, effortlessly
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Local storage synced
          </div>
        </div>
      </div>
    </header>
  );
}
