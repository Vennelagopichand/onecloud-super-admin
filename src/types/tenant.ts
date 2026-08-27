export type TenantStatus = "Active" | "Inactive";

export type SubscriptionPlan =
  | "Basic"
  | "Pro"
  | "Enterprise";

export interface Tenant {
  id: number;
  tenantName: string;
  tenantCode: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: SubscriptionPlan;
  country: string;
  timeZone: string;
  users: number;
  organizations: number;
  activeUsers: number;
  storage: number;
  status: TenantStatus;
  createdAt: string;
}