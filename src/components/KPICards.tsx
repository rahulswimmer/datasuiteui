import { AlertTriangle } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const sparklineData = Array.from({ length: 14 }).map((_, i) => ({ d: i, s: Math.round(80 + Math.random() * 20) }));

export function KPICards({ total, failed, running, successAvg }:{
  total:number; failed:number; running:number; successAvg:number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="border rounded-xl p-4"><div className="text-sm opacity-70">Total Integrations</div><div className="text-3xl font-semibold">{total}</div></div>
      <div className="border rounded-xl p-4"><div className="flex items-center justify-between"><span className="text-sm opacity-70">Failed</span><AlertTriangle className="h-5 w-5"/></div><div className="text-3xl font-semibold">{failed}</div></div>
      <div className="border rounded-xl p-4"><div className="text-sm opacity-70">Running</div><div className="text-3xl font-semibold">{running}</div></div>
      <div className="border rounded-xl p-4">
        <div className="text-sm opacity-70">Avg Success (30d)</div>
        <div className="text-3xl font-semibold">{successAvg}%</div>
        <div className="h-16 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <XAxis dataKey="d" hide /><YAxis hide /><Tooltip /><Line type="monotone" dataKey="s" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
