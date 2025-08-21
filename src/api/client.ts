import type { Integration, Run } from "../types/integration";

export interface IntegrationApi {
  list(params?: {
    env?: string; platform?: string; status?: string; search?: string;
  }): Promise<Integration[]>;
  runs(id: string, take?: number): Promise<Run[]>;
  metrics(id: string): Promise<{ successRate30d?: number; breaches7d?: number; avgDuration?: number; rowsIn?: number; rowsOut?: number }>;
  trigger(id: string): Promise<void>;
}
