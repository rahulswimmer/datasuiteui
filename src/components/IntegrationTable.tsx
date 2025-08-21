import { ChevronRight, Play } from "lucide-react";
import type { Integration } from "../types/integration";
import { StatusBadge } from "./StatusBadge";

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Math.max(1, Math.floor((Date.now() - d) / 1000));
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}

export function IntegrationTable({
  items, onRowClick, onTrigger, isTriggering,
}: {
  items: Integration[];
  onRowClick: (i: Integration) => void;
  onTrigger: (id: string) => void;
  isTriggering: boolean;
}) {
  return (
    <div className="border rounded-xl">
      <div className="px-4 py-3 border-b font-semibold">Integrations</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Platform</th>
              <th className="py-2 px-4">Env</th>
              <th className="py-2 px-4">Owner</th>
              <th className="py-2 px-4">Schedule</th>
              <th className="py-2 px-4">Last run</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Duration</th>
              <th className="py-2 px-4">Success 30d</th>
              <th className="py-2 px-4">SLA 7d</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => onRowClick(i)}>
                <td className="py-2 px-4 font-medium flex items-center gap-2">
                  <span>{i.name}</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </td>
                <td className="py-2 px-4">{i.platform}</td>
                <td className="py-2 px-4">{i.environment}</td>
                <td className="py-2 px-4">{i.owner}</td>
                <td className="py-2 px-4">{i.schedule}</td>
                <td className="py-2 px-4">{timeAgo(i.lastRunUtc)}</td>
                <td className="py-2 px-4"><StatusBadge status={i.lastStatus} /></td>
                <td className="py-2 px-4">{i.durationSec ? `${Math.round(i.durationSec / 60)}m` : "—"}</td>
                <td className="py-2 px-4">{i.successRate30d ?? "—"}%</td>
                <td className="py-2 px-4">{i.slaBreaches7d ?? 0}</td>
                <td className="py-2 px-4" onClick={(e) => e.stopPropagation()}>
                  <button className="px-2 py-1 border rounded-md text-sm inline-flex items-center" onClick={() => onTrigger(i.id)} disabled={isTriggering}>
                    <Play className="h-4 w-4 mr-1" /> Trigger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
