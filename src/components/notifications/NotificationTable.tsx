import { Link } from "react-router-dom";

import type { Notification } from "../../types/notification";

interface NotificationTableProps {
  notifications: Notification[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function NotificationTable({
  notifications,
  onToggleStatus,
  isUpdating = false,
}: NotificationTableProps) {
  if (!notifications.length) {
    return (
      <div className="notification-empty">
        <div>🔔</div>
        <h3>No notifications found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="notification-table-card">
      <div className="table-responsive">
        <table className="notification-table">
          <thead>
            <tr>
              <th>Notification</th>
              <th>Type</th>
              <th>Priority</th>
              <th>Channel</th>
              <th>Audience</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((notification) => {
              const readPercent =
                notification.sentCount > 0
                  ? Math.round(
                      (notification.readCount /
                        notification.sentCount) *
                        100
                    )
                  : 0;

              return (
                <tr key={notification.id}>
                  <td>
                    <div className="notification-title-cell">
                      <div className="notification-icon">
                        🔔
                      </div>

                      <div>
                        <strong>
                          {notification.title}
                        </strong>

                        <span>
                          {notification.notificationCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{notification.type}</td>

                  <td>
                    <span
                      className={`notification-priority notification-priority-${notification.priority.toLowerCase()}`}
                    >
                      {notification.priority}
                    </span>
                  </td>

                  <td>
                    <span className="notification-channel">
                      {notification.channel}
                    </span>
                  </td>

                  <td>{notification.audience}</td>

                  <td>
                    <div className="notification-delivery">
                      <div className="notification-delivery-info">
                        <span>
                          {notification.readCount}/
                          {notification.sentCount}
                        </span>

                        <strong>
                          {readPercent}%
                        </strong>
                      </div>

                      <div className="notification-progress">
                        <div
                          className="notification-progress-bar"
                          style={{
                            width: `${Math.min(
                              readPercent,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`notification-status ${
                        notification.status === "Active"
                          ? "notification-status-active"
                          : "notification-status-inactive"
                      }`}
                    >
                      {notification.status}
                    </span>
                  </td>

                  <td>{notification.createdAt}</td>

                  <td>
                    <div className="notification-actions">
                      <Link
                        to={`/notifications/${notification.id}`}
                        className="notification-action notification-view"
                      >
                        View
                      </Link>

                      <Link
                        to={`/notifications/${notification.id}/edit`}
                        className="notification-action notification-edit"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          onToggleStatus(notification.id)
                        }
                        className={`notification-action ${
                          notification.status === "Active"
                            ? "notification-disable"
                            : "notification-enable"
                        }`}
                      >
                        {notification.status === "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="notification-table-footer">
        <span>
          Showing {notifications.length} result
          {notifications.length !== 1 ? "s" : ""}
        </span>

        <div className="notification-pagination">
          <button disabled>‹</button>
          <button className="active">1</button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default NotificationTable;
