import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useSubscription } from "../../hooks/subscriptions/useSubscription";
import { useToggleSubscriptionStatus } from "../../hooks/subscriptions/useToggleSubscriptionStatus";

function SubscriptionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const subscriptionId = Number(id);

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId);

  const toggleStatus =
    useToggleSubscriptionStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading subscription...
      </div>
    );
  }

  if (isError || !subscription) {
    return (
      <div className="subscription-empty">
        <h3>Subscription not found</h3>

        <p>
          The requested subscription
          does not exist.
        </p>
      </div>
    );
  }

  const usage =
    subscription.totalLicenses > 0
      ? Math.round(
          (subscription.usedLicenses /
            subscription.totalLicenses) *
            100
        )
      : 0;

  const availableLicenses =
    subscription.totalLicenses -
    subscription.usedLicenses;

  return (
    <div className="subscription-page">
      <div className="subscription-page-header">
        <div>
          <h1>Subscription Details</h1>

          <p>
            View plan, billing and license
            information.
          </p>
        </div>

        <button
          type="button"
          className="subscription-back-btn"
          onClick={() =>
            navigate("/subscriptions")
          }
        >
          ← Back
        </button>
      </div>

      <div className="subscription-detail-profile">
        <div className="subscription-detail-icon">
          {subscription.tenantName
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="subscription-detail-title">
          <h2>
            {subscription.tenantName}
          </h2>

          <p>
            {subscription.subscriptionCode} ·{" "}
            {subscription.plan}
          </p>

          <span
            className={`subscription-status status-${subscription.status.toLowerCase()}`}
          >
            {subscription.status}
          </span>
        </div>

        <div className="subscription-detail-actions">
          <button
            type="button"
            className="subscription-edit-btn"
            onClick={() =>
              navigate(
                `/subscriptions/${subscription.id}/edit`
              )
            }
          >
            Edit Subscription
          </button>

          <button
            type="button"
            disabled={
              toggleStatus.isPending
            }
            className={
              subscription.status ===
              "Active"
                ? "subscription-toggle-off"
                : "subscription-toggle-on"
            }
            onClick={() =>
              toggleStatus.mutate(
                subscription.id
              )
            }
          >
            {subscription.status ===
            "Active"
              ? "Suspend"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="subscription-detail-stats">
        <div>
          <span>Total Licenses</span>
          <strong>
            {subscription.totalLicenses}
          </strong>
        </div>

        <div>
          <span>Used Licenses</span>
          <strong>
            {subscription.usedLicenses}
          </strong>
        </div>

        <div>
          <span>Available</span>
          <strong>
            {availableLicenses}
          </strong>
        </div>

        <div>
          <span>Usage</span>
          <strong>{usage}%</strong>
        </div>
      </div>

      <div className="subscription-detail-card">
        <div className="subscription-detail-heading">
          <h3>License Usage</h3>
          <span>{usage}% used</span>
        </div>

        <div className="subscription-detail-progress">
          <span
            style={{
              width: `${Math.min(
                usage,
                100
              )}%`,
            }}
          />
        </div>

        <div className="subscription-license-info">
          <span>
            {subscription.usedLicenses} used
          </span>

          <span>
            {availableLicenses} available
          </span>
        </div>
      </div>

      <div className="subscription-detail-card">
        <h3>Subscription Information</h3>

        <div className="subscription-info-grid">
          <div>
            <span>Subscription Code</span>
            <strong>
              {subscription.subscriptionCode}
            </strong>
          </div>

          <div>
            <span>Tenant</span>
            <strong>
              {subscription.tenantName}
            </strong>
          </div>

          <div>
            <span>Tenant ID</span>
            <strong>
              {subscription.tenantId}
            </strong>
          </div>

          <div>
            <span>Plan</span>
            <strong>
              {subscription.plan}
            </strong>
          </div>

          <div>
            <span>Billing Cycle</span>
            <strong>
              {subscription.billingCycle}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong>
              {subscription.status}
            </strong>
          </div>

          <div>
            <span>Start Date</span>
            <strong>
              {subscription.startDate}
            </strong>
          </div>

          <div>
            <span>Expiry Date</span>
            <strong>
              {subscription.expiryDate}
            </strong>
          </div>

          <div>
            <span>Price</span>
            <strong>
              ₹
              {subscription.price.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div>
            <span>Created</span>
            <strong>
              {subscription.createdAt}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetails;
