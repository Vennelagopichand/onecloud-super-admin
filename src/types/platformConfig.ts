export type ConfigStatus = "Active" | "Inactive";

export type ConfigCategory =
  | "General"
  | "Security"
  | "Email"
  | "Storage"
  | "Localization"
  | "System";

export type ConfigEnvironment =
  | "Production"
  | "Staging"
  | "Development"
  | "All";

export interface PlatformConfig {
  id: number;
  configCode: string;
  configName: string;
  category: ConfigCategory;
  environment: ConfigEnvironment;
  configValue: string;
  description: string;
  status: ConfigStatus;
  updatedAt: string;
}
