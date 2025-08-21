export function SearchFilters({
  search, setSearch, env, setEnv, platform, setPlatform, status, setStatus,
}: {
  search: string; setSearch: (v: string) => void;
  env: string; setEnv: (v: string) => void;
  platform: string; setPlatform: (v: string) => void;
  status: string; setStatus: (v: string) => void;
}) {
  return (
    <div className="border rounded-xl p-4 bg-white/70 dark:bg-gray-900/40">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="md:col-span-2 border rounded-md px-3 py-2" placeholder="Search name, owner, tag…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border rounded-md px-3 py-2" value={env} onChange={(e) => setEnv(e.target.value)}>
          <option value="All">All Environments</option><option value="Prod">Prod</option><option value="NonProd">NonProd</option><option value="Dev">Dev</option>
        </select>
        <select className="border rounded-md px-3 py-2" value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="All">All Platforms</option><option>Data Factory</option><option>Function App</option><option>Databricks</option><option>Logic Apps</option><option>Other</option>
        </select>
        <select className="border rounded-md px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">Any Status</option><option>Succeeded</option><option>Running</option><option>Failed</option><option>Skipped</option><option>Stopped</option>
        </select>
        <button className="px-3 py-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">More Filters</button>
      </div>
    </div>
  );
}
