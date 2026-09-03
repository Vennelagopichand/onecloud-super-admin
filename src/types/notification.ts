export type NotificationStatus =
  | "Active"
  | "Inactive";

export type NotificationType =
  | "System"
  | "Security"
  | "Subscription"
  | "Tenant"
  | "Maintenance"
  | "Announcement";

export type NotificationPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";

export type NotificationChannel =
  | "In-App"
  | "Email"
  | "SMS"
  | "Push";

export interface Notification {
  id: number;
  notificationCode: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  channel: NotificationChannel;
  audience: string;
  sentCount: number;
  readCount: number;
  status: NotificationStatus;
  createdAt: string;
}
