import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationTable from "../../components/notifications/NotificationTable";

import { useNotifications } from "../../hooks/notifications/useNotifications";
import { useToggleNotificationStatus } from "../../hooks/notifications/useToggleNotificationStatus";

function NotificationList() {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useNotifications();

  const toggleStatus =
    useToggleNotificationStatus();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [priority, setPriority] = useState("All");
  const [channel, setChannel] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredNotifications = useMemo(() => {
    const text = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !text ||
        notification.title
          .toLowerCase()
          .includes(text) ||
        notification.notificationCode
          .toLowerCase()
          .includes(text) ||
        notification.message
          .toLowerCase()
          .includes(text) ||
        notification.audience
          .toLowerCase()
          .includes(text);

      const matchesType =
        type === "All" ||
        notification.type === type;

      const matchesPriority =
        priority === "All" ||
        notification.priority === priority;

      const matchesChannel =
        channel === "All" ||
        notification.channel === channel;

      const matchesStatus =
        status === "All" ||
        notification.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesPriority &&
        matchesChannel &&
        matchesStatus
      );
    });
  }, [
    notifications,
    search,
    type,
    priority,
    channel,
    status,
  ]);

  const activeCount = notifications.filter(
    (item) => item.status === "Active"
  ).length;

  const criticalCount = notifications.filter(
    (item) => item.priority === "Critical"
  ).length;

  const totalSent = notifications.reduce(
    (total, item) => total + item.sentCount,
    0
  );

  function resetFilters() {
    setSearch("");
    setType("All");
    setPriority("All");
    setChannel("All");
    setStatus("All");
  }

  if (isLoading) {
    return (
      <div className="notification-page">
        <div className="loading-state">
          Loading notifications...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="notification-page">
        <div className="error-state">
          Unable to load notifications.
        </div>
      </div>
    );
  }

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <div>
          <h1>Notification Management</h1>
          <p>
            Create and manage platform notifications and announcements.
          </p>
        </div>

        <Link
          to="/notifications/create"
          className="primary-button"
        >
          + Create Notification
        </Link>
      </div>

      <div className="notification-summary">
        <div className="notification-summary-card">
          <span>Total Notifications</span>
          <strong>{notifications.length}</strong>
        </div>

        <div className="notification-summary-card">
          <span>Active</span>
          <strong className="notification-summary-green">
            {activeCount}
          </strong>
        </div>

        <div className="notification-summary-card">
          <span>Critical</span>
          <strong className="notification-summary-red">
            {criticalCount}
          </strong>
        </div>

        <div className="notification-summary-card">
          <span>Total Sent</span>
          <strong className="notification-summary-blue">
            {totalSent.toLocaleString()}
          </strong>
        </div>
      </div>

      <div className="notification-content">
        <div className="notification-content-header">
          <div>
            <h2>Notifications</h2>
            <p>
              Manage delivery, priority and platform announcements.
            </p>
          </div>

          <span className="notification-result-count">
            {filteredNotifications.length} Results
          </span>
        </div>

        <NotificationFilters
          search={search}
          type={type}
          priority={priority}
          channel={channel}
          status={status}
          onSearchChange={setSearch}
          onTypeChange={setType}
          onPriorityChange={setPriority}
          onChannelChange={setChannel}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />

        <NotificationTable
          notifications={filteredNotifications}
          onToggleStatus={(id) =>
            toggleStatus.mutate(id)
          }
          isUpdating={toggleStatus.isPending}
        />
      </div>
    </div>
  );
}

export default NotificationList;
