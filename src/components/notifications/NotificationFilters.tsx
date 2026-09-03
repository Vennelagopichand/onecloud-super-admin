interface NotificationFiltersProps {
  search: string;
  type: string;
  priority: string;
  channel: string;
  status: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onChannelChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function NotificationFilters({
  search,
  type,
  priority,
  channel,
  status,
  onSearchChange,
  onTypeChange,
  onPriorityChange,
  onChannelChange,
  onStatusChange,
  onReset,
}: NotificationFiltersProps) {
  return (
    <div className="notification-filters">
      <div className="notification-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option value="All">All Types</option>
        <option value="System">System</option>
        <option value="Security">Security</option>
        <option value="Subscription">Subscription</option>
        <option value="Tenant">Tenant</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Announcement">Announcement</option>
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      <select
        value={channel}
        onChange={(e) => onChannelChange(e.target.value)}
      >
        <option value="All">All Channels</option>
        <option value="In-App">In-App</option>
        <option value="Email">Email</option>
        <option value="SMS">SMS</option>
        <option value="Push">Push</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button
        type="button"
        className="notification-reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default NotificationFilters;
