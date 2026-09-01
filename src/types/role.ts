export type RoleStatus = "Active" | "Inactive";

export interface Role {
  id: number;
  roleCode: string;
  roleName: string;

  description: string;

  scope:
    | "Platform"
    | "Tenant"
    | "Organization";

  usersCount: number;
  permissionsCount: number;

  status: RoleStatus;

  createdAt: string;
}
