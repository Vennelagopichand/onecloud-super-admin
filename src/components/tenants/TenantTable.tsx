import { Link } from "react-router-dom";

import type { Tenant } from "../../types/tenant";

import EmptyState from "../common/EmptyState";

interface TenantTableProps {
  tenants: Tenant[];

  sortField:
    | "tenantName"
    | "tenantCode"
    | "users"
    | "createdAt";

  sortDirection:
    | "asc"
    | "desc";

  onSort: (
    field:
      | "tenantName"
      | "tenantCode"
      | "users"
      | "createdAt"
  ) => void;

  onActivate: (
    id: number
  ) => void;

  onDeactivate: (
    id: number
  ) => void;
}

function TenantTable({
  tenants,
  sortField,
  sortDirection,
  onSort,
  onActivate,
  onDeactivate,
}: TenantTableProps) {
  const getSortIcon = (
    field:
      | "tenantName"
      | "tenantCode"
      | "users"
      | "createdAt"
  ) => {
    if (sortField !== field) {
      return "↕";
    }

    return sortDirection === "asc"
      ? "↑"
      : "↓";
  };

  return (
    <div className="table-responsive">
      <table className="tenant-table">
        <thead>
          <tr>
            {/* TENANT NAME */}
            <th>
              <button
                type="button"
                className="sort-button"
                onClick={() =>
                  onSort("tenantName")
                }
              >
                Tenant{" "}
                {getSortIcon(
                  "tenantName"
                )}
              </button>
            </th>

            {/* TENANT CODE */}
            <th>
              <button
                type="button"
                className="sort-button"
                onClick={() =>
                  onSort("tenantCode")
                }
              >
                Code{" "}
                {getSortIcon(
                  "tenantCode"
                )}
              </button>
            </th>

            <th>Admin</th>

            <th>Plan</th>

            {/* USERS */}
            <th>
              <button
                type="button"
                className="sort-button"
                onClick={() =>
                  onSort("users")
                }
              >
                Users{" "}
                {getSortIcon(
                  "users"
                )}
              </button>
            </th>

            <th>Status</th>

            {/* CREATED DATE */}
            <th>
              <button
                type="button"
                className="sort-button"
                onClick={() =>
                  onSort("createdAt")
                }
              >
                Created{" "}
                {getSortIcon(
                  "createdAt"
                )}
              </button>
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tenants.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="empty-table"
              >
                <EmptyState
                  title="No tenants found"
                  message="Try changing your search or filters."
                />
              </td>
            </tr>
          ) : (
            tenants.map(
              (tenant) => (
                <tr key={tenant.id}>
                  {/* TENANT */}
                  <td>
                    <div className="tenant-name-cell">
                      <div className="tenant-initial">
                        {tenant.tenantName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {
                            tenant.tenantName
                          }
                        </strong>

                        <span>
                          {
                            tenant.adminEmail
                          }
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* CODE */}
                  <td>
                    <span className="tenant-code">
                      {
                        tenant.tenantCode
                      }
                    </span>
                  </td>

                  {/* ADMIN */}
                  <td>
                    {
                      tenant.adminName
                    }
                  </td>

                  {/* SUBSCRIPTION */}
                  <td>
                    <span
                      className={`plan-badge plan-${tenant.subscription.toLowerCase()}`}
                    >
                      {
                        tenant.subscription
                      }
                    </span>
                  </td>

                  {/* USERS */}
                  <td>
                    {tenant.users}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={
                        tenant.status ===
                        "Active"
                          ? "status active-status"
                          : "status inactive-status"
                      }
                    >
                      <span className="status-dot" />

                      {tenant.status}
                    </span>
                  </td>

                  {/* CREATED */}
                  <td>
                    {
                      tenant.createdAt
                    }
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="table-actions">
                      {/* VIEW */}
                      <Link
                        to={`/tenants/${tenant.id}`}
                        className="action-button view-action"
                      >
                        View
                      </Link>

                      {/* EDIT */}
                      <Link
                        to={`/tenants/${tenant.id}/edit`}
                        className="action-button edit-action"
                      >
                        Edit
                      </Link>

                      {/* ACTIVATE / DEACTIVATE */}
                      {tenant.status ===
                      "Active" ? (
                        <button
                          type="button"
                          className="action-button deactivate-action"
                          onClick={() =>
                            onDeactivate(
                              tenant.id
                            )
                          }
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="action-button activate-action"
                          onClick={() =>
                            onActivate(
                              tenant.id
                            )
                          }
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TenantTable;
