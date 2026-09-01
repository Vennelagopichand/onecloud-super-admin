import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useUser } from "../../hooks/useUser";

import { useToggleUserStatus } from "../../hooks/useToggleUserStatus";

function UserDetails() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const userId =
    Number(id);

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(userId);

  const toggleStatus =
    useToggleUserStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading user...
      </div>
    );
  }

  if (
    isError ||
    !user
  ) {
    return (
      <div className="user-detail-error">
        <h2>
          User not found
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/users")
          }
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="user-details-page">
      <button
        type="button"
        className="user-back-button"
        onClick={() =>
          navigate("/users")
        }
      >
        ← Back to Users
      </button>

      <div className="user-details-top">
        <div className="user-details-profile">
          <div className="user-details-avatar">
            {user.fullName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <div className="user-details-title-row">
              <h1>
                {user.fullName}
              </h1>

              <span
                className={`user-status ${
                  user.status ===
                  "Active"
                    ? "user-status-active"
                    : "user-status-inactive"
                }`}
              >
                {user.status}
              </span>
            </div>

            <p>
              {user.userId} •{" "}
              {user.role}
            </p>
          </div>
        </div>

        <div className="user-details-actions">
          <Link
            to={`/users/${user.id}/edit`}
            className="user-detail-edit-btn"
          >
            Edit User
          </Link>

          <button
            type="button"
            className={
              user.status ===
              "Active"
                ? "user-detail-deactivate-btn"
                : "user-detail-activate-btn"
            }
            disabled={
              toggleStatus.isPending
            }
            onClick={() =>
              toggleStatus.mutate(
                user.id
              )
            }
          >
            {toggleStatus.isPending
              ? "Updating..."
              : user.status ===
                "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="user-detail-stats">
        <div className="user-detail-stat-card">
          <span>
            Role
          </span>

          <strong>
            {user.role}
          </strong>
        </div>

        <div className="user-detail-stat-card">
          <span>
            Status
          </span>

          <strong>
            {user.status}
          </strong>
        </div>

        <div className="user-detail-stat-card">
          <span>
            Last Login
          </span>

          <strong>
            {user.lastLogin}
          </strong>
        </div>
      </div>

      <div className="user-information-card">
        <div className="user-information-header">
          <h2>
            User Information
          </h2>

          <p>
            Account, tenant and
            organization details.
          </p>
        </div>

        <div className="user-information-grid">
          <div className="user-info-item">
            <span>
              User ID
            </span>

            <strong>
              {user.userId}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Full Name
            </span>

            <strong>
              {user.fullName}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Email
            </span>

            <strong>
              {user.email}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Phone
            </span>

            <strong>
              {user.phone}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Tenant
            </span>

            <strong>
              {user.tenantName}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Tenant ID
            </span>

            <strong>
              {user.tenantId}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Organization
            </span>

            <strong>
              {
                user.organizationName
              }
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Organization ID
            </span>

            <strong>
              {
                user.organizationId
              }
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Role
            </span>

            <strong>
              {user.role}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Status
            </span>

            <strong>
              {user.status}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Last Login
            </span>

            <strong>
              {user.lastLogin}
            </strong>
          </div>

          <div className="user-info-item">
            <span>
              Created
            </span>

            <strong>
              {user.createdAt}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
