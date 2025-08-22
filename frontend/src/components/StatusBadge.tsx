import { Activity, CheckCircle2, XCircle } from "lucide-react";
import type { RunStatus } from "../types/integration";

export function StatusBadge({ status }: { status: RunStatus }) {
  const base = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
  if (status === "Succeeded") return <span className={`${base} bg-green-100 text-green-900 dark:bg-green-900/30`}><CheckCircle2 className="h-3 w-3 mr-1" />Succeeded</span>;
  if (status === "Failed")    return <span className={`${base} bg-red-100 text-red-900 dark:bg-red-900/30`}><XCircle className="h-3 w-3 mr-1" />Failed</span>;
  if (status === "Running")   return <span className={`${base} bg-blue-100 text-blue-900 dark:bg-blue-900/30`}><Activity className="h-3 w-3 mr-1 animate-pulse" />Running</span>;
  if (status === "Skipped")   return <span className={`${base} bg-gray-100 text-gray-900 dark:bg-gray-900/30`}>Skipped</span>;
  return <span className={`${base} bg-gray-200`}>Stopped</span>;
}
