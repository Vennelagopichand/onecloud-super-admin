interface PlatformConfigFiltersProps {
  search: string;
  category: string;
  environment: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onEnvironmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function PlatformConfigFilters({
  search,
  category,
  environment,
  status,
  onSearchChange,
  onCategoryChange,
  onEnvironmentChange,
  onStatusChange,
  onReset,
}: PlatformConfigFiltersProps) {
  return (
    <div className="config-filters">
      <div className="config-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search configuration..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <select
        value={category}
        onChange={(e) =>
          onCategoryChange(e.target.value)
        }
      >
        <option value="All">All Categories</option>
        <option value="General">General</option>
        <option value="Security">Security</option>
        <option value="Email">Email</option>
        <option value="Storage">Storage</option>
        <option value="Localization">
          Localization
        </option>
        <option value="System">System</option>
      </select>

      <select
        value={environment}
        onChange={(e) =>
          onEnvironmentChange(e.target.value)
        }
      >
        <option value="All">All Environments</option>
        <option value="Production">Production</option>
        <option value="Staging">Staging</option>
        <option value="Development">
          Development
        </option>
        <option value="All">All</option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <button
        type="button"
        className="config-reset"
        onClick={onReset}
      >
        ↻ Reset
      </button>
    </div>
  );
}

export default PlatformConfigFilters;
