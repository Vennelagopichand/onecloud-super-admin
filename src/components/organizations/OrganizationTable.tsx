import { Link } from "react-router-dom";

import type { Organization } from "../../types/organization";

interface OrganizationTableProps {
  organizations: Organization[];

  onToggleStatus: (
    id: number
  ) => void;
}

function OrganizationTable({
  organizations,
  onToggleStatus,
}: OrganizationTableProps) {
  if (organizations.length === 0) {
    return (
      <div className="organization-empty">
        <h3>No organizations found</h3>

        <p>
          Try changing your search or
          filter.
        </p>
      </div>
    );
  }

  return (
    <div className="organization-table-card">
      <div className="table-responsive">
        <table className="organization-table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Code</th>
              <th>Tenant</th>
              <th>Industry</th>
              <th>Country</th>
              <th>Employees</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map(
              (organization) => (
                <tr
                  key={organization.id}
                >
                  <td>
                    <strong className="organization-name">
                      {
                        organization.organizationName
                      }
                    </strong>
                  </td>

                  <td>
                    {
                      organization.organizationCode
                    }
                  </td>

                  <td>
                    {
                      organization.tenantName
                    }
                  </td>

                  <td>
                    {
                      organization.industry
                    }
                  </td>

                  <td>
                    {
                      organization.country
                    }
                  </td>

                  <td>
                    {
                      organization.employees
                    }
                  </td>

                  <td>
                    <span
                      className={`organization-status ${
                        organization.status ===
                        "Active"
                          ? "organization-status-active"
                          : "organization-status-inactive"
                      }`}
                    >
                      {
                        organization.status
                      }
                    </span>
                  </td>

                  <td>
                    {
                      organization.createdAt
                    }
                  </td>

                  <td>
                    <div className="organization-actions">
                      <Link
                        to={`/organizations/${organization.id}`}
                        className="organization-action-btn organization-view-btn"
                      >
                        View
                      </Link>

                      <Link
                        to={`/organizations/${organization.id}/edit`}
                        className="organization-action-btn organization-edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        className={`organization-action-btn ${
                          organization.status ===
                          "Active"
                            ? "organization-deactivate-btn"
                            : "organization-activate-btn"
                        }`}
                        onClick={() =>
                          onToggleStatus(
                            organization.id
                          )
                        }
                      >
                        {organization.status ===
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

      <div className="organization-table-footer">
        <span>
          Showing 1 to{" "}
          {organizations.length} of{" "}
          {organizations.length} results
        </span>

        <div className="organization-pagination">
          <button disabled>
            «
          </button>

          <button disabled>
            ‹
          </button>

          <button className="organization-current-page">
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

export default OrganizationTable;
