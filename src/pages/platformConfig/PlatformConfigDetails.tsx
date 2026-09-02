import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { usePlatformConfig } from "../../hooks/platformConfig/usePlatformConfig";
import { useTogglePlatformConfigStatus } from "../../hooks/platformConfig/useTogglePlatformConfigStatus";

function PlatformConfigDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const configId = Number(id);

  const {
    data: config,
    isLoading,
    isError,
  } = usePlatformConfig(configId);

  const toggleStatus =
    useTogglePlatformConfigStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading configuration...
      </div>
    );
  }

  if (isError || !config) {
    return (
      <div className="config-empty">
        <h3>
          Configuration not found
        </h3>

        <p>
          The requested platform
          configuration does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="config-page">
      <div className="config-page-header">
        <div>
          <h1>
            Configuration Details
          </h1>

          <p>
            View platform configuration
            information and status.
          </p>
        </div>

        <button
          type="button"
          className="platform-config-back-btn"
          onClick={() =>
            navigate("/platform-config")
          }
        >
          ← Back
        </button>
      </div>

      <div className="platform-config-detail-profile">
        <div className="platform-config-detail-icon">
          ⚙
        </div>

        <div className="platform-config-detail-title">
          <h2>
            {config.configName}
          </h2>

          <p>
            {config.configCode} ·{" "}
            {config.category}
          </p>

          <span
            className={`config-status ${
              config.status === "Active"
                ? "config-active"
                : "config-inactive"
            }`}
          >
            {config.status}
          </span>
        </div>

        <div className="platform-config-detail-actions">
          <button
            type="button"
            className="platform-config-edit-btn"
            onClick={() =>
              navigate(
                `/platform-config/${config.id}/edit`
              )
            }
          >
            Edit Configuration
          </button>

          <button
            type="button"
            disabled={
              toggleStatus.isPending
            }
            className={
              config.status === "Active"
                ? "platform-config-toggle-off"
                : "platform-config-toggle-on"
            }
            onClick={() =>
              toggleStatus.mutate(config.id)
            }
          >
            {config.status === "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="platform-config-detail-stats">
        <div>
          <span>Category</span>
          <strong>
            {config.category}
          </strong>
        </div>

        <div>
          <span>Environment</span>
          <strong>
            {config.environment}
          </strong>
        </div>

        <div>
          <span>Status</span>
          <strong>
            {config.status}
          </strong>
        </div>

        <div>
          <span>Last Updated</span>
          <strong>
            {config.updatedAt}
          </strong>
        </div>
      </div>

      <div className="platform-config-detail-card">
        <h3>
          Configuration Information
        </h3>

        <div className="platform-config-info-grid">
          <div>
            <span>
              Configuration Name
            </span>

            <strong>
              {config.configName}
            </strong>
          </div>

          <div>
            <span>
              Configuration Code
            </span>

            <strong>
              {config.configCode}
            </strong>
          </div>

          <div>
            <span>Category</span>

            <strong>
              {config.category}
            </strong>
          </div>

          <div>
            <span>Environment</span>

            <strong>
              {config.environment}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <strong>
              {config.status}
            </strong>
          </div>

          <div>
            <span>Updated</span>

            <strong>
              {config.updatedAt}
            </strong>
          </div>
        </div>
      </div>

      <div className="platform-config-detail-card">
        <h3>
          Configuration Value
        </h3>

        <div className="platform-config-value-box">
          {config.configValue}
        </div>
      </div>

      <div className="platform-config-detail-card">
        <h3>Description</h3>

        <p className="platform-config-description">
          {config.description ||
            "No description available."}
        </p>
      </div>
    </div>
  );
}

export default PlatformConfigDetails;
