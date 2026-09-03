import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useNotification } from "../../hooks/notifications/useNotification";
import { useToggleNotificationStatus } from "../../hooks/notifications/useToggleNotificationStatus";

function NotificationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const notificationId = Number(id);

  const {
    data: notification,
    isLoading,
    isError,
  } = useNotification(notificationId);

  const toggleStatus =
    useToggleNotificationStatus();

  if (isLoading) {
    return (
      <div className="notification-page">
        <div className="loading-state">
          Loading notification...
        </div>
      </div>
    );
  }

  if (isError || !notification) {
    return (
      <div className="notification-page">
        <div className="error-state">
          Notification not found.
        </div>
      </div>
    );
  }

  const readPercentage =
    notification.sentCount > 0
      ? Math.round(
          (notification.readCount /
            notification.sentCount) *
            100
        )
      : 0;

  function handleToggleStatus() {
    toggleStatus.mutate(
      notification.id
    );
  }

  return (
    <div className="notification-page">
      <div className="notification-details-header">
        <div className="notification-details-profile">
          <div className="notification-details-icon">
            🔔
          </div>

          <div>
            <h1>{notification.title}</h1>

            <p>
              {notification.notificationCode}
            </p>

            <div className="notification-details-badges">
              <span
                className={`notification-priority notification-priority-${notification.priority.toLowerCase()}`}
              >
                {notification.priority}
              </span>

              <span
                className={`notification-status ${
                  notification.status ===
                  "Active"
                    ? "notification-status-active"
                    : "notification-status-inactive"
                }`}
              >
                {notification.status}
              </span>
            </div>
          </div>
        </div>

        <div className="notification-details-actions">
          <Link
            to={`/notifications/${notification.id}/edit`}
            className="secondary-button"
          >
            Edit
          </Link>

          <button
            type="button"
            className={
              notification.status === "Active"
                ? "danger-button"
                : "primary-button"
            }
            disabled={
              toggleStatus.isPending
            }
            onClick={handleToggleStatus}
          >
            {notification.status === "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="notification-details-stats">
        <div>
          <span>Type</span>
          <strong>
            {notification.type}
          </strong>
        </div>

        <div>
          <span>Channel</span>
          <strong>
            {notification.channel}
          </strong>
        </div>

        <div>
          <span>Sent</span>
          <strong>
            {notification.sentCount.toLocaleString()}
          </strong>
        </div>

        <div>
          <span>Read Rate</span>
          <strong>
            {readPercentage}%
          </strong>
        </div>
      </div>

      <div className="notification-details-grid">
        <div className="notification-details-card">
          <h3>Notification Information</h3>

          <div className="notification-info-row">
            <span>Code</span>
            <strong>
              {notification.notificationCode}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Type</span>
            <strong>
              {notification.type}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Priority</span>

            <span
              className={`notification-priority notification-priority-${notification.priority.toLowerCase()}`}
            >
              {notification.priority}
            </span>
          </div>

          <div className="notification-info-row">
            <span>Status</span>

            <span
              className={`notification-status ${
                notification.status ===
                "Active"
                  ? "notification-status-active"
                  : "notification-status-inactive"
              }`}
            >
              {notification.status}
            </span>
          </div>

          <div className="notification-info-row">
            <span>Created</span>
            <strong>
              {notification.createdAt}
            </strong>
          </div>
        </div>

        <div className="notification-details-card">
          <h3>Delivery Information</h3>

          <div className="notification-info-row">
            <span>Channel</span>
            <strong>
              {notification.channel}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Audience</span>
            <strong>
              {notification.audience}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Sent Count</span>
            <strong>
              {notification.sentCount.toLocaleString()}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Read Count</span>
            <strong>
              {notification.readCount.toLocaleString()}
            </strong>
          </div>

          <div className="notification-info-row">
            <span>Read Rate</span>
            <strong>
              {readPercentage}%
            </strong>
          </div>
        </div>

        <div className="notification-details-card notification-message-card">
          <h3>Message</h3>

          <p>
            {notification.message}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="secondary-button notification-back-button"
        onClick={() =>
          navigate("/notifications")
        }
      >
        ← Back to Notifications
      </button>
    </div>
  );
}

export default NotificationDetails;
