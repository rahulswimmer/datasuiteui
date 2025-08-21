import { Menu, RefreshCcw, UserCircle2 } from "lucide-react";

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onToggleSidebar} aria-label="Toggle navigation">
            <Menu className="h-6 w-6" />
          </button>
          <div className="font-bold text-lg">DataSuite UI</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 hidden md:flex items-center">
            <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="User profile">
            <UserCircle2 className="h-7 w-7" />
          </button>
        </div>
      </div>
    </header>
  );
}
