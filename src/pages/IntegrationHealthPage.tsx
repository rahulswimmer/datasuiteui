import { useState } from "react";
import { Settings } from "lucide-react";
import { useIntegrations } from "../hooks/useIntegrations";
import type { Integration } from "../types/integration";
import { SearchFilters } from "../components/SearchFilters";
import { KPICards } from "../components/KPICards";
import { IntegrationTable } from "../components/IntegrationTable";
import { DetailsDrawer } from "../components/DetailsDrawer";
import { mockApi } from "../api/mock";

export default function IntegrationHealthPage() {
  const [search, setSearch] = useState("");
  const [env, setEnv] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [status, setStatus] = useState("All");

  const { items, kpis } = useIntegrations({ env, platform, status, search });

  const [selected, setSelected] = useState<Integration | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);

  async function triggerIntegration(id: string) {
    setIsTriggering(true);
    try { await mockApi.trigger(id); } finally { setIsTriggering(false); }
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Integration Health</h1>
        </div>
        <button className="px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center">
          <Settings className="h-4 w-4 mr-2" /> Preferences
        </button>
      </div>

      <SearchFilters
        search={search} setSearch={setSearch}
        env={env} setEnv={setEnv}
        platform={platform} setPlatform={setPlatform}
        status={status} setStatus={setStatus}
      />

      <KPICards {...kpis} />

      <IntegrationTable
        items={items}
        onRowClick={(i) => { setSelected(i); setOpenDrawer(true); }}
        onTrigger={triggerIntegration}
        isTriggering={isTriggering}
      />

      <DetailsDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        selected={selected}
        onTrigger={triggerIntegration}
        isTriggering={isTriggering}
      />
    </main>
  );
}
