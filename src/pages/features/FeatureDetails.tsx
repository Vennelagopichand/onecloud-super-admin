import { useNavigate, useParams } from "react-router-dom";
import { useFeature } from "../../hooks/features/useFeature";
import { useToggleFeatureStatus } from "../../hooks/features/useToggleFeatureStatus";

function FeatureDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const featureId = Number(id);
  const { data: feature, isLoading, isError } =
    useFeature(featureId);

  const toggleStatus = useToggleFeatureStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading feature...
      </div>
    );
  }

  if (isError || !feature) {
    return (
      <div className="feature-empty">
        <h3>Feature not found</h3>
        <p>The requested feature does not exist.</p>
      </div>
    );
  }

  return (
    <div className="feature-page">
      <div className="feature-page-header">
        <div>
          <h1>Feature Details</h1>
          <p>
            View feature configuration and availability.
          </p>
        </div>

        <button
          type="button"
          className="feature-back-btn"
          onClick={() => navigate("/features")}
        >
          ← Back
        </button>
      </div>

      <div className="feature-detail-profile">
        <div className="feature-detail-icon">
          {feature.featureName.charAt(0)}
        </div>

        <div className="feature-detail-title">
          <h2>{feature.featureName}</h2>
          <p>
            {feature.featureCode} · {feature.category}
          </p>

          <span
            className={`feature-status ${
              feature.status === "Enabled"
                ? "feature-enabled"
                : "feature-disabled"
            }`}
          >
            {feature.status}
          </span>
        </div>

        <div className="feature-detail-actions">
          <button
            type="button"
            className="feature-edit-btn"
            onClick={() =>
              navigate(`/features/${feature.id}/edit`)
            }
          >
            Edit Feature
          </button>

          <button
            type="button"
            disabled={toggleStatus.isPending}
            className={
              feature.status === "Enabled"
                ? "feature-toggle-off"
                : "feature-toggle-on"
            }
            onClick={() =>
              toggleStatus.mutate(feature.id)
            }
          >
            {feature.status === "Enabled"
              ? "Disable"
              : "Enable"}
          </button>
        </div>
      </div>

      <div className="feature-detail-stats">
        <div>
          <span>Enabled Tenants</span>
          <strong>{feature.enabledTenants}</strong>
        </div>

        <div>
          <span>Category</span>
          <strong>{feature.category}</strong>
        </div>

        <div>
          <span>Plan</span>
          <strong>{feature.plan}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{feature.status}</strong>
        </div>
      </div>

      <div className="feature-detail-card">
        <h3>Feature Information</h3>

        <div className="feature-info-grid">
          <div>
            <span>Feature Name</span>
            <strong>{feature.featureName}</strong>
          </div>

          <div>
            <span>Feature Code</span>
            <strong>{feature.featureCode}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{feature.category}</strong>
          </div>

          <div>
            <span>Subscription Plan</span>
            <strong>{feature.plan}</strong>
          </div>

          <div>
            <span>Enabled Tenants</span>
            <strong>{feature.enabledTenants}</strong>
          </div>

          <div>
            <span>Created Date</span>
            <strong>{feature.createdAt}</strong>
          </div>
        </div>
      </div>

      <div className="feature-detail-card">
        <h3>Description</h3>
        <p className="feature-description">
          {feature.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}

export default FeatureDetails;
