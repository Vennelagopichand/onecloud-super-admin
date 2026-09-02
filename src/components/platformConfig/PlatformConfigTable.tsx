import { Link } from "react-router-dom";

import type { PlatformConfig } from "../../types/platformConfig";

interface PlatformConfigTableProps {
  configs: PlatformConfig[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function PlatformConfigTable({
  configs,
  onToggleStatus,
  isUpdating = false,
}: PlatformConfigTableProps) {
  if (configs.length === 0) {
    return (
      <div className="config-empty">
        <h3>No configurations found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="config-table-card">
      <div className="table-responsive">
        <table className="config-table">
          <thead>
            <tr>
              <th>Configuration</th>
              <th>Code</th>
              <th>Category</th>
              <th>Environment</th>
              <th>Value</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {configs.map((config) => (
              <tr key={config.id}>
                <td>
                  <div className="config-name-cell">
                    <strong>
                      {config.configName}
                    </strong>

                    <span>
                      {config.description}
                    </span>
                  </div>
                </td>

                <td>
                  <span className="config-code">
                    {config.configCode}
                  </span>
                </td>

                <td>
                  <span className="config-category">
                    {config.category}
                  </span>
                </td>

                <td>
                  <span className="config-environment">
                    {config.environment}
                  </span>
                </td>

                <td>
                  <span className="config-value">
                    {config.configValue}
                  </span>
                </td>

                <td>
                  <span
                    className={`config-status ${
                      config.status === "Active"
                        ? "config-active"
                        : "config-inactive"
                    }`}
                  >
                    {config.status}
                  </span>
                </td>

                <td>{config.updatedAt}</td>

                <td>
                  <div className="config-actions">
                    <Link
                      to={`/platform-config/${config.id}`}
                      className="config-action config-view"
                    >
                      View
                    </Link>

                    <Link
                      to={`/platform-config/${config.id}/edit`}
                      className="config-action config-edit"
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled={isUpdating}
                      className={`config-action ${
                        config.status === "Active"
                          ? "config-disable"
                          : "config-enable"
                      }`}
                      onClick={() =>
                        onToggleStatus(config.id)
                      }
                    >
                      {config.status === "Active"
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

      <div className="config-table-footer">
        <span>
          Showing {configs.length} results
        </span>

        <div>
          <button disabled>‹</button>
          <button className="active">1</button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default PlatformConfigTable;
