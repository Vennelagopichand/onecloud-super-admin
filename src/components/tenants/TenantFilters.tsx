interface TenantFiltersProps {
  search: string;
  status: string;
  plan: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onReset: () => void;
}

function TenantFilters({
  search,
  status,
  plan,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onReset,
}: TenantFiltersProps) {
  return (
    <div className="tenant-filters">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search tenant name or code..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select
        value={plan}
        onChange={(e) => onPlanChange(e.target.value)}
      >
        <option value="All">All Plans</option>
        <option value="Basic">Basic</option>
        <option value="Pro">Pro</option>
        <option value="Enterprise">Enterprise</option>
      </select>

      <button
        type="button"
        className="reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default TenantFilters;
