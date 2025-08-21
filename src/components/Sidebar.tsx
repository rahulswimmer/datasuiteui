type NavId = "overview" | "health" | "metrics" | "settings";

export function Sidebar({
  open, onClose, active, onSelect,
}: {
  open: boolean;
  onClose: () => void;
  active: NavId;
  onSelect: (id: NavId) => void;
}) {
  const Item = ({ id, label }: { id: NavId; label: string }) => {
    const selected = active === id;
    return (
      <button
        className={`w-full text-left px-3 py-2 rounded-lg transition ${selected ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
        onClick={() => onSelect(id)}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r shadow-sm transform transition-transform duration-300 md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <span className="font-bold text-lg">Navigation</span>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onClose}>✕</button>
        </div>
        <nav className="p-4 space-y-1">
          <Item id="overview" label="Overview" />
          <Item id="health" label="Data Integration Health" />
          <Item id="metrics" label="Metrics" />
          <Item id="settings" label="Settings" />
        </nav>
      </aside>
      {open && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={onClose} />}
    </>
  );
}
