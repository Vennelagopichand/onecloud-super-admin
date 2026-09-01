import { Link } from "react-router-dom";

import type { DataPermission } from "../../types/dataPermission";

interface DataPermissionTableProps {
  dataPermissions: DataPermission[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function DataPermissionTable({
  dataPermissions,
  onToggleStatus,
  isUpdating = false,
}: DataPermissionTableProps) {
  if (dataPermissions.length === 0) {
    return (
      <div className="data-permission-empty">
        <h3>No data permissions found</h3>

        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="data-permission-table-card">
      <div className="table-responsive">
        <table className="data-permission-table">
          <thead>
            <tr>
              <th>Permission</th>
              <th>Code</th>
              <th>Role</th>
              <th>Scope</th>
              <th>Access Level</th>
              <th>Tenant</th>
              <th>Organization</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {dataPermissions.map(
              (permission) => (
                <tr key={permission.id}>
                  <td>
                    <div className="data-permission-name-cell">
                      <strong>
                        {permission.permissionName}
                      </strong>

                      <span>
                        {permission.description}
                      </span>
                    </div>
                  </td>

                  <td>
                    {permission.permissionCode}
                  </td>

                  <td>
                    <span className="data-permission-role-badge">
                      {permission.roleName}
                    </span>
                  </td>

                  <td>
                    <span className="data-permission-scope-badge">
                      {permission.scope}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`data-permission-access-badge data-permission-access-${permission.accessLevel
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {permission.accessLevel}
                    </span>
                  </td>

                  <td>
                    {permission.tenantName}
                  </td>

                  <td>
                    {permission.organizationName}
                  </td>

                  <td>
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
                  </td>

                  <td>
                    {permission.createdAt}
                  </td>

                  <td>
                    <div className="data-permission-actions">
                      <Link
                        to={`/data-permissions/${permission.id}`}
                        className="data-permission-action-btn data-permission-view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/data-permissions/${permission.id}/edit`}
                        className="data-permission-action-btn data-permission-edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        disabled={isUpdating}
                        className={`data-permission-action-btn ${
                          permission.status ===
                          "Active"
                            ? "data-permission-deactivate-btn"
                            : "data-permission-activate-btn"
                        }`}
                        onClick={() =>
                          onToggleStatus(
                            permission.id
                          )
                        }
                      >
                        {permission.status ===
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

      <div className="data-permission-table-footer">
        <span>
          Showing {dataPermissions.length} of{" "}
          {dataPermissions.length} results
        </span>

        <div className="data-permission-pagination">
          <button disabled>‹</button>

          <button className="data-permission-current-page">
            1
          </button>

          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default DataPermissionTable;
