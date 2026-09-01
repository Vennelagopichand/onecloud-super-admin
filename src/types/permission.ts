export type PermissionStatus = "Active" | "Inactive";

export type PermissionModule =
  | "Dashboard"
  | "Tenant Management"
  | "Organization Management"
  | "User Management"
  | "Role Management"
  | "Permission Management"
  | "Data Permissions"
  | "Feature Management"
  | "Subscription & License"
  | "Platform Configuration"
  | "Security"
  | "Audit Logs"
  | "Notifications"
  | "Monitoring";

export type PermissionAction =
  | "View"
  | "Create"
  | "Edit"
  | "Delete"
  | "Manage";

export interface Permission {
  id: number;

  permissionCode: string;
  permissionName: string;

  module: PermissionModule;
  action: PermissionAction;

  description: string;

  rolesCount: number;

  status: PermissionStatus;

  createdAt: string;
}
