import { Link } from "react-router-dom";
import type { Subscription } from "../../types/subscription";

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function SubscriptionTable({
  subscriptions,
  onToggleStatus,
  isUpdating = false,
}: SubscriptionTableProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="subscription-empty">
        <h3>No subscriptions found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="subscription-table-card">
      <div className="table-responsive">
        <table className="subscription-table">
          <thead>
            <tr>
              <th>Subscription</th>
              <th>Tenant</th>
              <th>Plan</th>
              <th>Billing</th>
              <th>License Usage</th>
              <th>Expiry</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((subscription) => {
              const usage =
                subscription.totalLicenses > 0
                  ? Math.round(
                      (subscription.usedLicenses /
                        subscription.totalLicenses) *
                        100
                    )
                  : 0;

              return (
                <tr key={subscription.id}>
                  <td>
                    <div className="subscription-name-cell">
                      <strong>
                        {subscription.subscriptionCode}
                      </strong>

                      <span>
                        Started {subscription.startDate}
                      </span>
                    </div>
                  </td>

                  <td>
                    <strong className="subscription-tenant">
                      {subscription.tenantName}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`subscription-plan plan-${subscription.plan.toLowerCase()}`}
                    >
                      {subscription.plan}
                    </span>
                  </td>

                  <td>
                    {subscription.billingCycle}
                  </td>

                  <td>
                    <div className="license-usage">
                      <div className="license-usage-text">
                        <span>
                          {subscription.usedLicenses}/
                          {subscription.totalLicenses}
                        </span>

                        <strong>{usage}%</strong>
                      </div>

                      <div className="license-progress">
                        <span
                          style={{
                            width: `${Math.min(usage, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    {subscription.expiryDate}
                  </td>

                  <td>
                    ₹
                    {subscription.price.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    <span
                      className={`subscription-status status-${subscription.status.toLowerCase()}`}
                    >
                      {subscription.status}
                    </span>
                  </td>

                  <td>
                    <div className="subscription-actions">
                      <Link
                        to={`/subscriptions/${subscription.id}`}
                        className="subscription-action subscription-view"
                      >
                        View
                      </Link>

                      <Link
                        to={`/subscriptions/${subscription.id}/edit`}
                        className="subscription-action subscription-edit"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={isUpdating}
                        className={`subscription-action ${
                          subscription.status === "Active"
                            ? "subscription-suspend"
                            : "subscription-activate"
                        }`}
                        onClick={() =>
                          onToggleStatus(subscription.id)
                        }
                      >
                        {subscription.status === "Active"
                          ? "Suspend"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="subscription-table-footer">
        <span>
          Showing {subscriptions.length} results
        </span>

        <div>
          <button disabled>‹</button>
          <button className="active">1</button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTable;
