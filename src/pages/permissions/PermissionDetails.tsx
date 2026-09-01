import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { usePermission } from "../../hooks/permissions/usePermission";

import { useTogglePermissionStatus } from "../../hooks/permissions/useTogglePermissionStatus";

function PermissionDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const permissionId =
    Number(id);

  const {
    data: permission,
    isLoading,
    isError,
  } = usePermission(permissionId);

  const toggleStatus =
    useTogglePermissionStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading permission...
      </div>
    );
  }

  if (
    isError ||
    !permission
  ) {
    return (
      <div className="permission-detail-error">
        <h2>
          Permission not found
        </h2>

        <p>
          The requested permission
          could not be found.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/permissions")
          }
        >
          Back to Permissions
        </button>
      </div>
    );
  }

  return (
    <div className="permission-details-page">
      <button
        type="button"
        className="permission-back-button"
        onClick={() =>
          navigate("/permissions")
        }
      >
        ← Back to Permissions
      </button>

      <div className="permission-details-top">
        <div className="permission-details-profile">
          <div className="permission-detail-icon">
            P
          </div>

          <div>
            <div className="permission-detail-title">
              <h1>
                {permission.permissionName}
              </h1>

              <span
                className={`permission-status ${
                  permission.status ===
                  "Active"
                    ? "permission-status-active"
                    : "permission-status-inactive"
                }`}
              >
                {permission.status}
              </span>
            </div>

            <p>
              {permission.permissionCode}
              {" • "}
              {permission.module}
              {" • "}
              {permission.action}
            </p>
          </div>
        </div>

        <div className="permission-detail-actions">
          <Link
            to={`/permissions/${permission.id}/edit`}
            className="permission-detail-edit-btn"
          >
            Edit Permission
          </Link>

          <button
            type="button"
            className={
              permission.status === "Active"
                ? "permission-detail-deactivate-btn"
                : "permission-detail-activate-btn"
            }
            disabled={
              toggleStatus.isPending
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

      {/* Statistics */}

      <div className="permission-detail-stats">
        <div className="permission-detail-stat-card">
          <span>Assigned Roles</span>

          <strong>
            {permission.rolesCount}
          </strong>
        </div>

        <div className="permission-detail-stat-card">
          <span>Module</span>

          <strong>
            {permission.module}
          </strong>
        </div>

        <div className="permission-detail-stat-card">
          <span>Action</span>

          <strong>
            {permission.action}
          </strong>
        </div>

        <div className="permission-detail-stat-card">
          <span>Status</span>

          <strong>
            {permission.status}
          </strong>
        </div>
      </div>

      {/* Permission Information */}

      <div className="permission-information-card">
        <div className="permission-information-header">
          <h2>
            Permission Information
          </h2>

          <p>
            General information about
            this permission.
          </p>
        </div>

        <div className="permission-information-grid">
          <div className="permission-information-item">
            <span>
              Permission Name
            </span>

            <strong>
              {permission.permissionName}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>
              Permission Code
            </span>

            <strong>
              {permission.permissionCode}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>Module</span>

            <strong>
              {permission.module}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>Action</span>

            <strong>
              {permission.action}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>
              Assigned Roles
            </span>

            <strong>
              {permission.rolesCount}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>Status</span>

            <strong>
              {permission.status}
            </strong>
          </div>

          <div className="permission-information-item">
            <span>Created</span>

            <strong>
              {permission.createdAt}
            </strong>
          </div>
        </div>
      </div>

      {/* Description */}

      <div className="permission-description-card">
        <h2>Description</h2>

        <p>
          {permission.description}
        </p>
      </div>
    </div>
  );
}

export default PermissionDetails;
