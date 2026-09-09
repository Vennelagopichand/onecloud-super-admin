export type MonitoringStatus =
  | "Healthy"
  | "Warning"
  | "Critical"
  | "Offline";

export type MonitoringCategory =
  | "API"
  | "Database"
  | "Server"
  | "Storage"
  | "Network"
  | "Application";

export interface MonitoringService {
  id: number;
  serviceCode: string;
  serviceName: string;
  category: MonitoringCategory;
  status: MonitoringStatus;
  uptime: number;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  requestsPerMinute: number;
  lastChecked: string;
}
