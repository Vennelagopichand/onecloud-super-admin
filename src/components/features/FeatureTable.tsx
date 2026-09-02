import { Link } from "react-router-dom";

import type { Feature } from "../../types/feature";

interface FeatureTableProps {
  features: Feature[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function FeatureTable({
  features,
  onToggleStatus,
  isUpdating = false,
}: FeatureTableProps) {
  if (features.length === 0) {
    return (
      <div className="feature-empty">
        <h3>No features found</h3>
        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="feature-table-card">
      <div className="table-responsive">
        <table className="feature-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Code</th>
              <th>Category</th>
              <th>Plan</th>
              <th>Tenants</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {features.map((feature) => (
              <tr key={feature.id}>
                <td>
                  <div className="feature-name-cell">
                    <strong>
                      {feature.featureName}
                    </strong>

                    <span>
                      {feature.description}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="feature-code">
                    {feature.featureCode}
                  </span>
                </td>

                <td>
                  <span className="feature-badge feature-category">
                    {feature.category}
                  </span>
                </td>

                <td>
                  <span className="feature-badge feature-plan">
                    {feature.plan}
                  </span>
                </td>

                <td>
                  {feature.enabledTenants}
                </td>

                <td>
                  <span
                    className={`feature-status ${
                      feature.status ===
                      "Enabled"
                        ? "feature-enabled"
                        : "feature-disabled"
                    }`}
                  >
                    {feature.status}
                  </span>
                </td>

                <td>
                  {feature.createdAt}
                </td>

                <td>
                  <div className="feature-actions">
                    <Link
                      to={`/features/${feature.id}`}
                      className="feature-action feature-view"
                    >
                      View
                    </Link>

                    <Link
                      to={`/features/${feature.id}/edit`}
                      className="feature-action feature-edit"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled={isUpdating}
                      className={`feature-action ${
                        feature.status ===
                        "Enabled"
                          ? "feature-disable"
                          : "feature-enable"
                      }`}
                      onClick={() =>
                        onToggleStatus(
                          feature.id
                        )
                      }
                    >
                      {feature.status ===
                      "Enabled"
                        ? "Disable"
                        : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="feature-table-footer">
        <span>
          Showing {features.length} results
        </span>

        <div>
          <button disabled>‹</button>
          <button className="active">
            1
          </button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default FeatureTable;
