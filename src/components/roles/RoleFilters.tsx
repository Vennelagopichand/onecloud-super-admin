interface RoleFiltersProps {
  search: string;
  status: string;
  scope: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onScopeChange: (value: string) => void;
  onReset: () => void;
}

function RoleFilters({
  search,
  status,
  scope,
  onSearchChange,
  onStatusChange,
  onScopeChange,
  onReset,
}: RoleFiltersProps) {
  return (
    <div className="role-filter-card">
      <div className="role-search-box">
        <span className="role-search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search role..."
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
        />
      </div>

      <div className="role-filter-select">
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

      <div className="role-filter-select">
        <select
          value={scope}
          onChange={(event) =>
            onScopeChange(
              event.target.value
            )
          }
        >
          <option value="All">
            All Scope
          </option>

          <option value="Platform">
            Platform
          </option>

          <option value="Tenant">
            Tenant
          </option>

          <option value="Organization">
            Organization
          </option>
        </select>
      </div>

      <button
        type="button"
        className="role-reset-button"
        onClick={onReset}
      >
        <span>↻</span>
        Reset
      </button>
    </div>
  );
}

export default RoleFilters;
