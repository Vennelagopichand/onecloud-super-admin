interface FeatureFiltersProps {
  search: string;
  status: string;
  category: string;
  plan: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onReset: () => void;
}

function FeatureFilters({
  search,
  status,
  category,
  plan,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onPlanChange,
  onReset,
}: FeatureFiltersProps) {
  return (
    <div className="feature-filters">
      <div className="feature-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search feature..."
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
        <option value="All">
          All Categories
        </option>
        <option value="Core">Core</option>
        <option value="Security">
          Security
        </option>
        <option value="Analytics">
          Analytics
        </option>
        <option value="Integration">
          Integration
        </option>
        <option value="Communication">
          Communication
        </option>
        <option value="AI">AI</option>
      </select>

      <select
        value={plan}
        onChange={(e) =>
          onPlanChange(e.target.value)
        }
      >
        <option value="All">
          All Plans
        </option>
        <option value="Basic">
          Basic
        </option>
        <option value="Pro">
          Pro
        </option>
        <option value="Enterprise">
          Enterprise
        </option>
        <option value="All Plans">
          All Plans Access
        </option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
      >
        <option value="All">
          All Status
        </option>
        <option value="Enabled">
          Enabled
        </option>
        <option value="Disabled">
          Disabled
        </option>
      </select>

      <button
        type="button"
        className="feature-reset"
        onClick={onReset}
      >
        ↻ Reset
      </button>
    </div>
  );
}

export default FeatureFilters;
