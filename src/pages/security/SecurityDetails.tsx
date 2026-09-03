import { Link, useParams } from "react-router-dom";

import { useSecurityPolicy } from "../../hooks/security/useSecurityPolicy";
import { useToggleSecurityPolicyStatus } from "../../hooks/security/useToggleSecurityPolicyStatus";

function SecurityDetails() {
  const { id } = useParams();

  const policyId = Number(id);

  const {
    data: policy,
    isLoading,
    isError,
  } = useSecurityPolicy(policyId);

  const toggleStatus =
    useToggleSecurityPolicyStatus();

  if (isLoading) {
    return (
      <div className="security-page">
        <div className="loading-state">
          Loading security policy...
        </div>
      </div>
    );
  }

  if (isError || !policy) {
    return (
      <div className="security-page">
        <div className="error-state">
          Security policy not found.
        </div>
      </div>
    );
  }

  return (
    <div className="security-page">
      <div className="security-details-header">
        <div className="security-details-profile">
          <div className="security-details-icon">
            ◈
          </div>

          <div>
            <h1>{policy.policyName}</h1>
            <p>
              {policy.policyCode} · {policy.category}
            </p>

            <span
              className={`security-status ${
                policy.status === "Active"
                  ? "security-status-active"
                  : "security-status-inactive"
              }`}
            >
              {policy.status}
            </span>
          </div>
        </div>

        <div className="security-details-actions">
          <Link
            to={`/security/${policy.id}/edit`}
            className="secondary-button"
          >
            Edit Policy
          </Link>

          <button
            type="button"
            className={
              policy.status === "Active"
                ? "danger-button"
                : "primary-button"
            }
            disabled={toggleStatus.isPending}
            onClick={() =>
              toggleStatus.mutate(policy.id)
            }
          >
            {policy.status === "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="security-details-stats">
        <div>
          <span>Category</span>
          <strong>{policy.category}</strong>
        </div>

        <div>
          <span>Severity</span>
          <strong>{policy.severity}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{policy.status}</strong>
        </div>

        <div>
          <span>Last Updated</span>
          <strong>{policy.updatedAt}</strong>
        </div>
      </div>

      <div className="security-details-grid">
        <div className="security-details-card">
          <h3>Policy Information</h3>

          <div className="security-info-row">
            <span>Policy Code</span>
            <strong>{policy.policyCode}</strong>
          </div>

          <div className="security-info-row">
            <span>Policy Name</span>
            <strong>{policy.policyName}</strong>
          </div>

          <div className="security-info-row">
            <span>Category</span>
            <strong>{policy.category}</strong>
          </div>

          <div className="security-info-row">
            <span>Severity</span>
            <strong>{policy.severity}</strong>
          </div>
        </div>

        <div className="security-details-card">
          <h3>Policy Value</h3>

          <div className="security-policy-value">
            {policy.policyValue}
          </div>
        </div>

        <div className="security-details-card security-description-card">
          <h3>Description</h3>

          <p>
            {policy.description ||
              "No description available."}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="secondary-button security-back-button"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
    </div>
  );
}

export default SecurityDetails;
