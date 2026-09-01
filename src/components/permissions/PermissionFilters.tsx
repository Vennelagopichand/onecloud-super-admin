interface PermissionFiltersProps {
  search: string;
  status: string;
  module: string;
  action: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onReset: () => void;
}

function PermissionFilters({
  search,
  status,
  module,
  action,
  onSearchChange,
  onStatusChange,
  onModuleChange,
  onActionChange,
  onReset,
}: PermissionFiltersProps) {
  return (
    <div className="permission-filter-card">
      <div className="permission-search-box">
        <span className="permission-search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search permission..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <div className="permission-filter-select">
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="permission-filter-select">
        <select
          value={module}
          onChange={(event) =>
            onModuleChange(event.target.value)
          }
        >
          <option value="All">All Modules</option>
          <option value="Dashboard">Dashboard</option>
          <option value="Tenant Management">
            Tenant Management
          </option>
          <option value="Organization Management">
            Organization Management
          </option>
          <option value="User Management">
            User Management
          </option>
          <option value="Role Management">
            Role Management
          </option>
          <option value="Permission Management">
            Permission Management
          </option>
          <option value="Data Permissions">
            Data Permissions
          </option>
          <option value="Feature Management">
            Feature Management
          </option>
          <option value="Subscription & License">
            Subscription & License
          </option>
          <option value="Platform Configuration">
            Platform Configuration
          </option>
          <option value="Security">Security</option>
          <option value="Audit Logs">Audit Logs</option>
          <option value="Notifications">
            Notifications
          </option>
          <option value="Monitoring">Monitoring</option>
        </select>
      </div>

      <div className="permission-filter-select">
        <select
          value={action}
          onChange={(event) =>
            onActionChange(event.target.value)
          }
        >
          <option value="All">All Actions</option>
          <option value="View">View</option>
          <option value="Create">Create</option>
          <option value="Edit">Edit</option>
          <option value="Delete">Delete</option>
          <option value="Manage">Manage</option>
        </select>
      </div>

      <button
        type="button"
        className="permission-reset-button"
        onClick={onReset}
      >
        <span>↻</span>
        Reset
      </button>
    </div>
  );
}

export default PermissionFilters;
