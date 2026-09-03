export type AuditAction =
  | "Create"
  | "Update"
  | "Delete"
  | "Login"
  | "Logout"
  | "Activate"
  | "Deactivate"
  | "View";

export type AuditSeverity =
  | "Info"
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type AuditStatus =
  | "Success"
  | "Failed";

export interface AuditLog {
  id: number;
  logCode: string;
  userName: string;
  userEmail: string;
  action: AuditAction;
  module: string;
  description: string;
  ipAddress: string;
  severity: AuditSeverity;
  status: AuditStatus;
  createdAt: string;
}
