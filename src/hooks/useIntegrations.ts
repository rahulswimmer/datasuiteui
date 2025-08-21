import { useEffect, useMemo, useState } from "react";
import type { Integration } from "../types/integration";
import { mockApi } from "../api/mock";

export function useIntegrations(filters: {
  env: string; platform: string; status: string; search: string;
}) {
  const [items, setItems] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    mockApi.list(filters).then(data => { if (alive) setItems(data); }).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [filters.env, filters.platform, filters.status, filters.search]);

  const kpis = useMemo(() => {
    const total = items.length;
    const failed = items.filter(i => i.lastStatus === "Failed").length;
    const running = items.filter(i => i.lastStatus === "Running").length;
    const successAvg = Math.round(items.reduce((a, b) => a + (b.successRate30d ?? 0), 0) / Math.max(1, total));
    return { total, failed, running, successAvg };
  }, [items]);

  return { items, loading, kpis };
}
