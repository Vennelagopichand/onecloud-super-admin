export type UserStatus = "Active" | "Inactive";

export type UserRole =
  | "Super Admin"
  | "Tenant Admin"
  | "Organization Admin"
  | "Manager"
  | "User";

export interface User {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  phone: string;

  tenantId: number;
  tenantName: string;

  organizationId: number;
  organizationName: string;

  role: UserRole;
  status: UserStatus;

  lastLogin: string;
  createdAt: string;
}
