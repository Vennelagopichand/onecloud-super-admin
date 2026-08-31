export type OrganizationStatus = "Active" | "Inactive";

export interface Organization {
  id: number;
  organizationName: string;
  organizationCode: string;
  tenantId: number;
  tenantName: string;
  industry: string;
  country: string;
  email: string;
  phone: string;
  employees: number;
  status: OrganizationStatus;
  createdAt: string;
}
