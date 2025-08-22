import { useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Settings as SettingsIcon,
  X,
} from "lucide-react";

type NavId = "overview" | "health" | "metrics" | "settings";

export function Sidebar({
  open,
  onClose,
  active,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  active: NavId;
  onSelect: (id: NavId) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC + basic focus management
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      // Simple roving focus for menu (↑/↓/Home/End)
      const links = panelRef.current?.querySelectorAll<HTMLButtonElement>("[data-nav]");
      if (!links || links.length === 0) return;
      const current = document.activeElement as HTMLElement | null;
      const idx = Array.from(links).findIndex((el) => el === current);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = links[Math.min((idx + 1 + links.length) % links.length, links.length - 1)];
        (next || links[0]).focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = links[(idx - 1 + links.length) % links.length];
        (prev || links[links.length - 1]).focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        links[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        links[links.length - 1]?.focus();
      }
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const Item = ({
    id,
    label,
    Icon,
  }: {
    id: NavId;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }) => {
    const selected = active === id;
    return (
      <button
        data-nav
        className={`group w-full text-left px-3 py-2 rounded-lg grid grid-cols-[20px,1fr] items-center gap-3
          transition outline-none
          ${selected
            ? "bg-skanska-blue text-white" : "hover:bg-skanska-gray"} 
          focus-visible:ring-2 focus-visible:ring-[#143275]/60`}
        onClick={() => onSelect(id)}
      >
        <Icon className={`h-4 w-4 ${selected ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`} />
        <span className="text-sm">{label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
          bg-white dark:bg-gray-900 border-r shadow-lg
          ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar navigation"
        aria-hidden={!open}
      >
        <div ref={panelRef} className="h-full flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold tracking-tight">Navigation</div>
            <button
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-[#143275]/60 outline-none"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sections */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <div className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 mb-2">
              Overview
            </div>
            <div className="space-y-1">
              <Item id="overview" label="Overview" Icon={LayoutDashboard} />
              <Item id="health" label="Data Integration Health" Icon={Activity} />
            </div>

            <div className="mt-5 h-px bg-gray-200 dark:bg-gray-800" />

            <div className="mt-5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 mb-2">
              Analytics
            </div>
            <div className="space-y-1">
              <Item id="metrics" label="Metrics" Icon={BarChart3} />
            </div>

            <div className="mt-5 h-px bg-gray-200 dark:bg-gray-800" />

            <div className="mt-5 text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 px-2 mb-2">
              Administration
            </div>
            <div className="space-y-1">
              <Item id="settings" label="Settings" Icon={SettingsIcon} />
            </div>
          </div>

          {/* Help / footer */}
          <div className="px-4 py-3 border-t text-xs text-gray-500 dark:text-gray-400">
            v0.1 • DataSuite UI
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30"
          onClick={onClose}
          aria-hidden
        />
      )}
    </>
  );
}
