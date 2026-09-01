import { Link } from "react-router-dom";

import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];

  onToggleStatus: (
    id: number
  ) => void;
}

function UserTable({
  users,
  onToggleStatus,
}: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="user-empty">
        <h3>No users found</h3>

        <p>
          Try changing the search
          or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="user-table-card">
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Tenant</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-name-cell">
                      <div className="user-avatar-small">
                        {user.fullName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {user.fullName}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {user.userId}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.tenantName}
                  </td>

                  <td>
                    {
                      user.organizationName
                    }
                  </td>

                  <td>
                    <span className="user-role-badge">
                      {user.role}
                    </span>
                  </td>

                  <td>
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
                  </td>

                  <td>
                    {user.lastLogin}
                  </td>

                  <td>
                    {user.createdAt}
                  </td>

                  <td>
                    <div className="user-actions">
                      <Link
                        to={`/users/${user.id}`}
                        className="user-action-btn user-view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/users/${user.id}/edit`}
                        className="user-action-btn user-edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className={`user-action-btn ${
                          user.status ===
                          "Active"
                            ? "user-deactivate-btn"
                            : "user-activate-btn"
                        }`}
                        onClick={() =>
                          onToggleStatus(
                            user.id
                          )
                        }
                      >
                        {user.status ===
                        "Active"
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="user-table-footer">
        <span>
          Showing 1 to {users.length} of{" "}
          {users.length} results
        </span>

        <div className="user-pagination">
          <button disabled>
            «
          </button>

          <button disabled>
            ‹
          </button>

          <button className="user-current-page">
            1
          </button>

          <button disabled>
            ›
          </button>

          <button disabled>
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
