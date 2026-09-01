import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useRole } from "../../hooks/useRole";
import { useToggleRoleStatus } from "../../hooks/useToggleRoleStatus";

function RoleDetails() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const roleId =
    Number(id);

  const {
    data: role,
    isLoading,
    isError,
  } = useRole(roleId);

  const toggleStatus =
    useToggleRoleStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading role...
      </div>
    );
  }

  if (
    isError ||
    !role
  ) {
    return (
      <div className="role-detail-error">
        <h2>
          Role not found
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/roles")
          }
        >
          Back to Roles
        </button>
      </div>
    );
  }

  return (
    <div className="role-details-page">
      <button
        type="button"
        className="role-back-button"
        onClick={() =>
          navigate("/roles")
        }
      >
        ← Back to Roles
      </button>

      {/* TOP */}

      <div className="role-details-top">
        <div className="role-details-profile">
          <div className="role-details-icon">
            R
          </div>

          <div>
            <div className="role-details-title-row">
              <h1>
                {role.roleName}
              </h1>

              <span
                className={`role-status ${
                  role.status ===
                  "Active"
                    ? "role-status-active"
                    : "role-status-inactive"
                }`}
              >
                {role.status}
              </span>
            </div>

            <p>
              {role.roleCode} •{" "}
              {role.scope} Scope
            </p>
          </div>
        </div>

        <div className="role-details-actions">
          <Link
            to={`/roles/${role.id}/edit`}
            className="role-detail-edit-btn"
          >
            Edit Role
          </Link>

          <button
            type="button"
            className={
              role.status ===
              "Active"
                ? "role-detail-deactivate-btn"
                : "role-detail-activate-btn"
            }
            disabled={
              toggleStatus.isPending
            }
            onClick={() =>
              toggleStatus.mutate(
                role.id
              )
            }
          >
            {toggleStatus.isPending
              ? "Updating..."
              : role.status ===
                  "Active"
                ? "Deactivate"
                : "Activate"}
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="role-detail-stats">
        <div className="role-detail-stat-card">
          <span>
            Assigned Users
          </span>

          <strong>
            {role.usersCount}
          </strong>
        </div>

        <div className="role-detail-stat-card">
          <span>
            Permissions
          </span>

          <strong>
            {
              role.permissionsCount
            }
          </strong>
        </div>

        <div className="role-detail-stat-card">
          <span>
            Access Scope
          </span>

          <strong>
            {role.scope}
          </strong>
        </div>

        <div className="role-detail-stat-card">
          <span>
            Status
          </span>

          <strong>
            {role.status}
          </strong>
        </div>
      </div>

      {/* INFORMATION */}

      <div className="role-information-card">
        <div className="role-information-header">
          <h2>
            Role Information
          </h2>

          <p>
            Role configuration and
            access information.
          </p>
        </div>

        <div className="role-information-grid">
          <div className="role-info-item">
            <span>
              Role Name
            </span>

            <strong>
              {role.roleName}
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Role Code
            </span>

            <strong>
              {role.roleCode}
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Scope
            </span>

            <strong>
              {role.scope}
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Assigned Users
            </span>

            <strong>
              {role.usersCount}
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Permissions
            </span>

            <strong>
              {
                role.permissionsCount
              }
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Status
            </span>

            <strong>
              {role.status}
            </strong>
          </div>

          <div className="role-info-item">
            <span>
              Created
            </span>

            <strong>
              {role.createdAt}
            </strong>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}

      <div className="role-description-card">
        <h2>
          Description
        </h2>

        <p>
          {role.description}
        </p>
      </div>
    </div>
  );
}

export default RoleDetails;
