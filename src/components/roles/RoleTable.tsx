import { Link } from "react-router-dom";

import type { Role } from "../../types/role";

interface RoleTableProps {
  roles: Role[];

  onToggleStatus: (
    id: number
  ) => void;
}

function RoleTable({
  roles,
  onToggleStatus,
}: RoleTableProps) {
  if (roles.length === 0) {
    return (
      <div className="role-empty">
        <h3>No roles found</h3>

        <p>
          Try changing your search or
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="role-table-card">
      <div className="table-responsive">
        <table className="role-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Code</th>
              <th>Scope</th>
              <th>Users</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>
                  <div className="role-name-cell">
                    <strong>
                      {role.roleName}
                    </strong>

                    <span>
                      {role.description}
                    </span>
                  </div>
                </td>

                <td>
                  {role.roleCode}
                </td>

                <td>
                  <span className="role-scope-badge">
                    {role.scope}
                  </span>
                </td>

                <td>
                  {role.usersCount}
                </td>

                <td>
                  {
                    role.permissionsCount
                  }
                </td>

                <td>
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
                </td>

                <td>
                  {role.createdAt}
                </td>

                <td>
                  <div className="role-actions">
                    <Link
                      to={`/roles/${role.id}`}
                      className="role-action-btn role-view-btn"
                    >
                      View
                    </Link>

                    <Link
                      to={`/roles/${role.id}/edit`}
                      className="role-action-btn role-edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className={`role-action-btn ${
                        role.status ===
                        "Active"
                          ? "role-deactivate-btn"
                          : "role-activate-btn"
                      }`}
                      onClick={() =>
                        onToggleStatus(
                          role.id
                        )
                      }
                    >
                      {role.status ===
                      "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="role-table-footer">
        <span>
          Showing 1 to {roles.length} of{" "}
          {roles.length} results
        </span>

        <div className="role-pagination">
          <button disabled>
            «
          </button>

          <button disabled>
            ‹
          </button>

          <button className="role-current-page">
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

export default RoleTable;
