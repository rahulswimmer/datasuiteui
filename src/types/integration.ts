export type Platform = "Data Factory" | "Function App" | "Databricks" | "Logic Apps" | "Other";
export type Env = "Prod" | "NonProd" | "Dev";
export type RunStatus = "Succeeded" | "Failed" | "Running" | "Skipped" | "Stopped";

export type Integration = {
  id: string;
  name: string;
  platform: Platform;
  environment: Env;
  owner: string;
  schedule: string;        // humanized
  lastRunUtc: string;      // ISO
  lastStatus: RunStatus;
  durationSec?: number;
  successRate30d?: number; // 0..100
  slaBreaches7d?: number;
  tags?: string[];
};

export type Run = {
  id: string;
  startedUtc: string;
  endedUtc?: string;
  status: RunStatus;
  durationSec?: number;
  rowsIn?: number;
  rowsOut?: number;
  error?: string;
};
