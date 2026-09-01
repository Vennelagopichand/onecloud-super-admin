interface DataPermissionFiltersProps {
  search: string;
  status: string;
  role: string;
  scope: string;
  accessLevel: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onScopeChange: (value: string) => void;
  onAccessLevelChange: (value: string) => void;
  onReset: () => void;
}

function DataPermissionFilters({
  search,
  status,
  role,
  scope,
  accessLevel,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onScopeChange,
  onAccessLevelChange,
  onReset,
}: DataPermissionFiltersProps) {
  return (
    <div className="data-permission-filter-card">
      <div className="data-permission-search-box">
        <span className="data-permission-search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search data permission..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <select
        value={role}
        onChange={(event) =>
          onRoleChange(event.target.value)
        }
      >
        <option value="All">All Roles</option>
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
        <option value="Auditor">
          Auditor
        </option>
      </select>

      <select
        value={scope}
        onChange={(event) =>
          onScopeChange(event.target.value)
        }
      >
        <option value="All">All Scopes</option>
        <option value="Platform">
          Platform
        </option>
        <option value="Tenant">
          Tenant
        </option>
        <option value="Organization">
          Organization
        </option>
        <option value="Department">
          Department
        </option>
        <option value="Own Records">
          Own Records
        </option>
      </select>

      <select
        value={accessLevel}
        onChange={(event) =>
          onAccessLevelChange(event.target.value)
        }
      >
        <option value="All">
          All Access Levels
        </option>
        <option value="Read">
          Read
        </option>
        <option value="Write">
          Write
        </option>
        <option value="Full Access">
          Full Access
        </option>
      </select>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
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

      <button
        type="button"
        className="data-permission-reset-button"
        onClick={onReset}
      >
        ↻ Reset
      </button>
    </div>
  );
}

export default DataPermissionFilters;
