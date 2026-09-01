import { Link } from "react-router-dom";

import type { Permission } from "../../types/permission";

interface PermissionTableProps {
  permissions: Permission[];
  onToggleStatus: (id: number) => void;
}

function PermissionTable({
  permissions,
  onToggleStatus,
}: PermissionTableProps) {
  if (permissions.length === 0) {
    return (
      <div className="permission-empty">
        <h3>No permissions found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="permission-table-card">
      <div className="table-responsive">
        <table className="permission-table">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Code</th>
              <th>Module</th>
              <th>Action</th>
              <th>Roles</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td>
                  <div className="permission-name-cell">
                    <strong>
                      {permission.permissionName}
                    </strong>

                    <span>
                      {permission.description}
                    </span>
                  </div>
                </td>

                <td>{permission.permissionCode}</td>

                <td>
                  <span className="permission-module-badge">
                    {permission.module}
                  </span>
                </td>

                <td>
                  <span
                    className={`permission-action-badge permission-action-${permission.action.toLowerCase()}`}
                  >
                    {permission.action}
                  </span>
                </td>

                <td>{permission.rolesCount}</td>

                <td>
                  <span
                    className={`permission-status ${
                      permission.status === "Active"
                        ? "permission-status-active"
                        : "permission-status-inactive"
                    }`}
                  >
                    {permission.status}
                  </span>
                </td>

                <td>{permission.createdAt}</td>

                <td>
                  <div className="permission-actions">
                    <Link
                      to={`/permissions/${permission.id}`}
                      className="permission-action-btn permission-view-btn"
                    >
                      View
                    </Link>

                    <Link
                      to={`/permissions/${permission.id}/edit`}
                      className="permission-action-btn permission-edit-btn"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      className={`permission-action-btn ${
                        permission.status === "Active"
                          ? "permission-deactivate-btn"
                          : "permission-activate-btn"
                      }`}
                      onClick={() =>
                        onToggleStatus(permission.id)
                      }
                    >
                      {permission.status === "Active"
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

      <div className="permission-table-footer">
        <span>
          Showing 1 to {permissions.length} of{" "}
          {permissions.length} results
        </span>

        <div className="permission-pagination">
          <button disabled>«</button>
          <button disabled>‹</button>
          <button className="permission-current-page">
            1
          </button>
          <button disabled>›</button>
          <button disabled>»</button>
        </div>
      </div>
    </div>
  );
}

export default PermissionTable;
