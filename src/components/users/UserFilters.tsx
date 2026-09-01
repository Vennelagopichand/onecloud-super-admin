interface UserFiltersProps {
  search: string;
  status: string;
  role: string;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  onRoleChange: (
    value: string
  ) => void;

  onReset: () => void;
}

function UserFilters({
  search,
  status,
  role,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onReset,
}: UserFiltersProps) {
  return (
    <div className="user-filter-card">
      {/* Search */}
      <div className="user-search-box">
        <span className="user-search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
        />
      </div>

      {/* Status */}
      <div className="user-filter-select">
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

      {/* Role */}
      <div className="user-filter-select">
        <select
          value={role}
          onChange={(event) =>
            onRoleChange(
              event.target.value
            )
          }
        >
          <option value="All">
            All Roles
          </option>

          <option value="Super Admin">
            Super Admin
          </option>

          <option value="Tenant Admin">
            Tenant Admin
          </option>

          <option value="Organization Admin">
            Organization Admin
          </option>

          <option value="Manager">
            Manager
          </option>

          <option value="User">
            User
          </option>
        </select>
      </div>

      {/* Reset */}
      <button
        type="button"
        className="user-reset-button"
        onClick={onReset}
      >
        <span>↻</span>
        Reset
      </button>
    </div>
  );
}

export default UserFilters;
