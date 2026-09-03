interface SecurityFiltersProps {
  search: string;
  category: string;
  severity: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function SecurityFilters({
  search,
  category,
  severity,
  status,
  onSearchChange,
  onCategoryChange,
  onSeverityChange,
  onStatusChange,
  onReset,
}: SecurityFiltersProps) {
  return (
    <div className="security-filters">
      <div className="security-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search security policy..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Authentication">Authentication</option>
        <option value="Password">Password</option>
        <option value="Session">Session</option>
        <option value="Access Control">Access Control</option>
        <option value="Network">Network</option>
        <option value="Compliance">Compliance</option>
      </select>

      <select
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value)}
      >
        <option value="All">All Severities</option>
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
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button
        type="button"
        className="security-reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default SecurityFilters;
