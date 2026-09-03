interface AuditLogFiltersProps {
  search: string;
  module: string;
  action: string;
  severity: string;
  status: string;
  onSearchChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function AuditLogFilters({
  search,
  module,
  action,
  severity,
  status,
  onSearchChange,
  onModuleChange,
  onActionChange,
  onSeverityChange,
  onStatusChange,
  onReset,
}: AuditLogFiltersProps) {
  return (
    <div className="audit-filters">
      <div className="audit-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        value={module}
        onChange={(e) => onModuleChange(e.target.value)}
      >
        <option value="All">All Modules</option>
        <option value="Authentication">Authentication</option>
        <option value="Tenant Management">Tenant Management</option>
        <option value="User Management">User Management</option>
        <option value="Security Management">Security Management</option>
        <option value="Platform Configuration">Platform Configuration</option>
        <option value="Subscription & License">Subscription & License</option>
        <option value="Audit Logs">Audit Logs</option>
      </select>

      <select
        value={action}
        onChange={(e) => onActionChange(e.target.value)}
      >
        <option value="All">All Actions</option>
        <option value="Create">Create</option>
        <option value="Update">Update</option>
        <option value="Delete">Delete</option>
        <option value="Login">Login</option>
        <option value="Logout">Logout</option>
        <option value="Activate">Activate</option>
        <option value="Deactivate">Deactivate</option>
        <option value="View">View</option>
      </select>

      <select
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value)}
      >
        <option value="All">All Severities</option>
        <option value="Info">Info</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Critical">Critical</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Success">Success</option>
        <option value="Failed">Failed</option>
      </select>

      <button
        type="button"
        className="audit-reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default AuditLogFilters;
