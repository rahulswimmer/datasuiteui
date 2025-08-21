import type { Integration } from "../types/integration";
import { Play, Timer } from "lucide-react";

export function DetailsDrawer({
  open, onClose, selected, onTrigger, isTriggering,
}: {
  open: boolean; onClose: () => void;
  selected: Integration | null;
  onTrigger: (id: string) => void;
  isTriggering: boolean;
}) {
  if (!open || !selected) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[90%] sm:w-[520px] bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{selected.name}</h2>
          <button className="px-3 py-1 border rounded-md" onClick={onClose}>Close</button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm mt-4">
          <div><span className="opacity-60">Platform</span><div>{selected.platform}</div></div>
          <div><span className="opacity-60">Environment</span><div>{selected.environment}</div></div>
          <div><span className="opacity-60">Owner</span><div>{selected.owner}</div></div>
          <div><span className="opacity-60">Schedule</span><div>{selected.schedule}</div></div>
          <div><span className="opacity-60">Last run</span><div>{new Date(selected.lastRunUtc).toLocaleString()}</div></div>
          <div><span className="opacity-60">Success 30d</span><div>{selected.successRate30d ?? "—"}%</div></div>
          <div><span className="opacity-60">SLA Breaches 7d</span><div>{selected.slaBreaches7d ?? 0}</div></div>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="px-3 py-2 rounded-md border inline-flex items-center" onClick={() => onTrigger(selected.id)} disabled={isTriggering}><Play className="h-4 w-4 mr-2" /> Trigger now</button>
          <button className="px-3 py-2 rounded-md border inline-flex items-center"><Timer className="h-4 w-4 mr-2" /> Run window</button>
        </div>
      </div>
    </div>
  );
}
