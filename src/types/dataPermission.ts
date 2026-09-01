export type DataPermissionStatus =
  | "Active"
  | "Inactive";

export type DataPermissionScope =
  | "Platform"
  | "Tenant"
  | "Organization"
  | "Department"
  | "Own Records";

export type DataAccessLevel =
  | "Read"
  | "Write"
  | "Full Access";

export interface DataPermission {
  id: number;

  permissionCode: string;
  permissionName: string;

  roleId: number;
  roleName: string;

  scope: DataPermissionScope;

  accessLevel: DataAccessLevel;

  tenantName: string;
  organizationName: string;

  description: string;

  status: DataPermissionStatus;

  createdAt: string;
}
