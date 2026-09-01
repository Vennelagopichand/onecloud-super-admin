import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useDataPermission } from "../../hooks/dataPermissions/useDataPermission";

import { useToggleDataPermissionStatus } from "../../hooks/dataPermissions/useToggleDataPermissionStatus";

function DataPermissionDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dataPermissionId =
    Number(id);

  const {
    data: permission,
    isLoading,
    isError,
  } = useDataPermission(
    dataPermissionId
  );

  const toggleStatus =
    useToggleDataPermissionStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading data permission...
      </div>
    );
  }

  if (
    isError ||
    !permission
  ) {
    return (
      <div className="data-permission-detail-error">
        <h2>
          Data permission not found
        </h2>

        <p>
          The requested data permission
          could not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/data-permissions"
            )
          }
        >
          Back to Data Permissions
        </button>
      </div>
    );
  }

  return (
    <div className="data-permission-details-page">
      <button
        type="button"
        className="data-permission-back-button"
        onClick={() =>
          navigate(
            "/data-permissions"
          )
        }
      >
        ← Back to Data Permissions
      </button>

      {/* TOP */}

      <div className="data-permission-details-top">
        <div className="data-permission-details-profile">
          <div className="data-permission-detail-icon">
            DP
          </div>

          <div>
            <div className="data-permission-detail-title">
              <h1>
                {
                  permission.permissionName
                }
              </h1>

              <span
                className={`data-permission-status ${
                  permission.status ===
                  "Active"
                    ? "data-permission-status-active"
                    : "data-permission-status-inactive"
                }`}
              >
                {permission.status}
              </span>
            </div>

            <p>
              {
                permission.permissionCode
              }
              {" • "}
              {permission.roleName}
              {" • "}
              {permission.scope}
            </p>
          </div>
        </div>

        <div className="data-permission-detail-actions">
          <Link
            to={`/data-permissions/${permission.id}/edit`}
            className="data-permission-detail-edit-btn"
          >
            Edit Permission
          </Link>

          <button
            type="button"
            disabled={
              toggleStatus.isPending
            }
            className={
              permission.status ===
              "Active"
                ? "data-permission-detail-deactivate-btn"
                : "data-permission-detail-activate-btn"
            }
            onClick={() =>
              toggleStatus.mutate(
                permission.id
              )
            }
          >
            {toggleStatus.isPending
              ? "Updating..."
              : permission.status ===
                  "Active"
                ? "Deactivate"
                : "Activate"}
          </button>
        </div>
      </div>

      {/* SUMMARY */}

      <div className="data-permission-detail-stats">
        <div className="data-permission-detail-stat-card">
          <span>Role</span>

          <strong>
            {permission.roleName}
          </strong>
        </div>

        <div className="data-permission-detail-stat-card">
          <span>Data Scope</span>

          <strong>
            {permission.scope}
          </strong>
        </div>

        <div className="data-permission-detail-stat-card">
          <span>Access Level</span>

          <strong>
            {permission.accessLevel}
          </strong>
        </div>

        <div className="data-permission-detail-stat-card">
          <span>Status</span>

          <strong>
            {permission.status}
          </strong>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="data-permission-information-card">
        <div className="data-permission-information-header">
          <h2>
            Data Permission Information
          </h2>

          <p>
            General data access and
            assignment information.
          </p>
        </div>

        <div className="data-permission-information-grid">
          <div className="data-permission-information-item">
            <span>
              Permission Name
            </span>

            <strong>
              {
                permission.permissionName
              }
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>
              Permission Code
            </span>

            <strong>
              {
                permission.permissionCode
              }
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>Role</span>

            <strong>
              {permission.roleName}
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>Scope</span>

            <strong>
              {permission.scope}
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>
              Access Level
            </span>

            <strong>
              {permission.accessLevel}
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>Tenant</span>

            <strong>
              {permission.tenantName}
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>
              Organization
            </span>

            <strong>
              {
                permission.organizationName
              }
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>Status</span>

            <strong>
              {permission.status}
            </strong>
          </div>

          <div className="data-permission-information-item">
            <span>Created</span>

            <strong>
              {permission.createdAt}
            </strong>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <div className="data-permission-description-card">
        <h2>Description</h2>

        <p>
          {permission.description}
        </p>
      </div>
    </div>
  );
}

export default DataPermissionDetails;
