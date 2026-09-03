import { Link } from "react-router-dom";

import type { SecurityPolicy } from "../../types/security";

interface SecurityTableProps {
  policies: SecurityPolicy[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function SecurityTable({
  policies,
  onToggleStatus,
  isUpdating = false,
}: SecurityTableProps) {
  if (!policies.length) {
    return (
      <div className="security-empty">
        <div>◈</div>
        <h3>No security policies found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="security-table-card">
      <div className="table-responsive">
        <table className="security-table">
          <thead>
            <tr>
              <th>Policy</th>
              <th>Code</th>
              <th>Category</th>
              <th>Severity</th>
              <th>Value</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id}>
                <td>
                  <div className="security-policy-name">
                    <span className="security-policy-icon">◈</span>

                    <div>
                      <strong>{policy.policyName}</strong>
                      <span>{policy.description}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="security-code">
                    {policy.policyCode}
                  </span>
                </td>

                <td>{policy.category}</td>

                <td>
                  <span
                    className={`security-severity security-severity-${policy.severity
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {policy.severity}
                  </span>
                </td>

                <td>{policy.policyValue}</td>

                <td>
                  <span
                    className={`security-status ${
                      policy.status === "Active"
                        ? "security-status-active"
                        : "security-status-inactive"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>

                <td>{policy.updatedAt}</td>

                <td>
                  <div className="security-actions">
                    <Link
                      to={`/security/${policy.id}`}
                      className="security-action security-view"
                    >
                      View
                    </Link>

                    <Link
                      to={`/security/${policy.id}/edit`}
                      className="security-action security-edit"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => onToggleStatus(policy.id)}
                      className={`security-action ${
                        policy.status === "Active"
                          ? "security-disable"
                          : "security-enable"
                      }`}
                    >
                      {policy.status === "Active"
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

      <div className="security-table-footer">
        <span>
          Showing {policies.length} result
          {policies.length !== 1 ? "s" : ""}
        </span>

        <div className="security-pagination">
          <button disabled>‹</button>
          <button className="active">1</button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default SecurityTable;
