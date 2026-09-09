interface MonitoringFiltersProps {
  search: string;
  category: string;
  status: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function MonitoringFilters({
  search,
  category,
  status,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}: MonitoringFiltersProps) {
  return (
    <div className="monitoring-filters">
      <div className="monitoring-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />
      </div>

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
      >
        <option value="All">All Categories</option>
        <option value="API">API</option>
        <option value="Database">Database</option>
        <option value="Server">Server</option>
        <option value="Storage">Storage</option>
        <option value="Network">Network</option>
        <option value="Application">Application</option>
      </select>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
      >
        <option value="All">All Status</option>
        <option value="Healthy">Healthy</option>
        <option value="Warning">Warning</option>
        <option value="Critical">Critical</option>
        <option value="Offline">Offline</option>
      </select>

      <button
        type="button"
        className="monitoring-reset-button"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

export default MonitoringFilters;
