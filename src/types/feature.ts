export type FeatureStatus = "Enabled" | "Disabled";

export type FeatureCategory =
  | "Core"
  | "Security"
  | "Analytics"
  | "Integration"
  | "Communication"
  | "AI";

export type FeaturePlan =
  | "Basic"
  | "Pro"
  | "Enterprise"
  | "All Plans";

export interface Feature {
  id: number;
  featureCode: string;
  featureName: string;
  category: FeatureCategory;
  plan: FeaturePlan;
  description: string;
  enabledTenants: number;
  status: FeatureStatus;
  createdAt: string;
}
