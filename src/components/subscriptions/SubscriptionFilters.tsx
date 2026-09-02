interface SubscriptionFiltersProps {
  search: string;
  plan: string;
  billing: string;
  status: string;
  onSearchChange: (value: string) => void;
  onPlanChange: (value: string) => void;
  onBillingChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

function SubscriptionFilters({
  search,
  plan,
  billing,
  status,
  onSearchChange,
  onPlanChange,
  onBillingChange,
  onStatusChange,
  onReset,
}: SubscriptionFiltersProps) {
  return (
    <div className="subscription-filters">
      <div className="subscription-search">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search tenant or subscription..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <select
        value={plan}
        onChange={(e) =>
          onPlanChange(e.target.value)
        }
      >
        <option value="All">All Plans</option>
        <option value="Basic">Basic</option>
        <option value="Pro">Pro</option>
        <option value="Enterprise">Enterprise</option>
      </select>

      <select
        value={billing}
        onChange={(e) =>
          onBillingChange(e.target.value)
        }
      >
        <option value="All">All Billing</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Suspended">Suspended</option>
        <option value="Expired">Expired</option>
      </select>

      <button
        type="button"
        className="subscription-reset"
        onClick={onReset}
      >
        ↻ Reset
      </button>
    </div>
  );
}

export default SubscriptionFilters;
