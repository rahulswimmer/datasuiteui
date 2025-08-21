import type { IntegrationApi } from "./client";
import type { Integration, Run } from "../types/integration";

const MOCK: Integration[] = [
  {
    id: "p6-primavera",
    name: "P6 Primavera → SKUK Data Platform",
    platform: "Function App",
    environment: "Prod",
    owner: "Rahul Sharma",
    schedule: "Every 6 hours",
    lastRunUtc: new Date(Date.now() - 1000 * 60 * 37).toISOString(),
    lastStatus: "Succeeded",
    durationSec: 412,
    successRate30d: 98,
    slaBreaches7d: 0,
    tags: ["P6", "REST", "CSV"],
  },
  {
    id: "bentley-wsg",
    name: "Bentley WSG Documents → SQL",
    platform: "Function App",
    environment: "Prod",
    owner: "Jason Hows",
    schedule: "08:00–19:00 hourly",
    lastRunUtc: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    lastStatus: "Running",
    successRate30d: 92,
    slaBreaches7d: 1,
    tags: ["Bentley","WSG","Docs"],
  },
  {
    id: "erp-oracle",
    name: "Oracle ERP → ODS",
    platform: "Data Factory",
    environment: "Prod",
    owner: "Ramesh Hirani",
    schedule: "Nightly 02:00",
    lastRunUtc: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
    lastStatus: "Failed",
    durationSec: 1880,
    successRate30d: 86,
    slaBreaches7d: 2,
    tags: ["ERP","REST","ADF"],
  },
];

const WAIT = (ms: number) => new Promise(r => setTimeout(r, ms));

export const mockApi: IntegrationApi = {
  async list(params) {
    await WAIT(150);
    let data = [...MOCK];
    if (params?.env && params.env !== "All") data = data.filter(d => d.environment === params.env);
    if (params?.platform && params.platform !== "All") data = data.filter(d => d.platform === params.platform);
    if (params?.status && params.status !== "All") data = data.filter(d => d.lastStatus === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      data = data.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q) ||
        (d.tags ?? []).some(t => t.toLowerCase().includes(q)));
    }
    return data;
  },
  async runs(id, take = 50) {
    await WAIT(120);
    const now = Date.now();
    const sample: Run[] = Array.from({ length: Math.min(14, take) }).map((_, idx) => ({
      id: `${id}-run-${idx}`,
      startedUtc: new Date(now - (idx + 1) * 3600_000).toISOString(),
      endedUtc: new Date(now - (idx + 1) * 3600_000 + 300_000).toISOString(),
      status: idx % 7 === 0 ? "Failed" : "Succeeded",
      durationSec: 300 + Math.round(Math.random() * 400),
      rowsIn: 1_000 + Math.round(Math.random() * 10_000),
      rowsOut: 1_000 + Math.round(Math.random() * 10_000),
    }));
    return sample;
  },
  async metrics() {
    await WAIT(120);
    return { successRate30d: 94, breaches7d: 1, avgDuration: 520, rowsIn: 120000, rowsOut: 118500 };
  },
  async trigger() {
    await WAIT(300);
  },
};
