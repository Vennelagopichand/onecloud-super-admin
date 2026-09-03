export type SecurityStatus = "Active" | "Inactive";

export type SecurityCategory =
  | "Authentication"
  | "Password"
  | "Session"
  | "Access Control"
  | "Network"
  | "Compliance";

export type SecuritySeverity =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export interface SecurityPolicy {
  id: number;
  policyCode: string;
  policyName: string;
  category: SecurityCategory;
  severity: SecuritySeverity;
  policyValue: string;
  description: string;
  status: SecurityStatus;
  updatedAt: string;
}
