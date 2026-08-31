interface OrganizationFiltersProps {
  search: string;
  status: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onReset: () => void;
}

function OrganizationFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onReset,
}: OrganizationFiltersProps) {
  return (
    <div className="organization-filter-card">
      {/* Search */}
      <div className="organization-search-box">
        <span className="organization-search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search organization..."
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
        />
      </div>

      {/* Status */}
      <div className="organization-status-filter">
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
        >
          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      {/* Reset */}
      <button
        type="button"
        className="organization-reset-button"
        onClick={onReset}
      >
        <span>↻</span>
        Reset
      </button>
    </div>
  );
}

export default OrganizationFilters;
