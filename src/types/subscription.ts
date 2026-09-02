export type SubscriptionStatus =
  | "Active"
  | "Expired"
  | "Suspended";

export type SubscriptionPlan =
  | "Basic"
  | "Pro"
  | "Enterprise";

export type BillingCycle =
  | "Monthly"
  | "Yearly";

export interface Subscription {
  id: number;
  subscriptionCode: string;
  tenantId: number;
  tenantName: string;
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  totalLicenses: number;
  usedLicenses: number;
  startDate: string;
  expiryDate: string;
  price: number;
  status: SubscriptionStatus;
  createdAt: string;
}
