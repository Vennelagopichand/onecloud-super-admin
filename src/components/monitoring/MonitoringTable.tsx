import { Link } from "react-router-dom";

import type { MonitoringService } from "../../types/monitoring";

interface MonitoringTableProps {
  services: MonitoringService[];
  onToggleStatus: (id: number) => void;
  isUpdating?: boolean;
}

function MonitoringTable({
  services,
  onToggleStatus,
  isUpdating = false,
}: MonitoringTableProps) {
  if (!services.length) {
    return (
      <div className="monitoring-empty">
        <div>◉</div>

        <h3>No monitoring services found</h3>

        <p>
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  function getUsageClass(value: number) {
    if (value >= 85) {
      return "monitoring-usage-critical";
    }

    if (value >= 70) {
      return "monitoring-usage-warning";
    }

    return "monitoring-usage-normal";
  }

  return (
    <div className="monitoring-table-card">
      <div className="table-responsive">
        <table className="monitoring-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Category</th>
              <th>Status</th>
              <th>Uptime</th>
              <th>Response</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Storage</th>
              <th>Requests/Min</th>
              <th>Last Checked</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <div className="monitoring-service-cell">
                    <div className="monitoring-service-icon">
                      ◉
                    </div>

                    <div>
                      <strong>
                        {service.serviceName}
                      </strong>

                      <span>
                        {service.serviceCode}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span className="monitoring-category">
                    {service.category}
                  </span>
                </td>

                <td>
                  <span
                    className={`monitoring-status monitoring-status-${service.status.toLowerCase()}`}
                  >
                    <span className="monitoring-status-dot" />
                    {service.status}
                  </span>
                </td>

                <td>
                  <strong className="monitoring-uptime">
                    {service.uptime.toFixed(2)}%
                  </strong>
                </td>

                <td>
                  <span className="monitoring-response">
                    {service.responseTime > 0
                      ? `${service.responseTime} ms`
                      : "—"}
                  </span>
                </td>

                <td>
                  <div className="monitoring-metric">
                    <div className="monitoring-metric-info">
                      <span>{service.cpuUsage}%</span>
                    </div>

                    <div className="monitoring-metric-track">
                      <div
                        className={`monitoring-metric-bar ${getUsageClass(
                          service.cpuUsage
                        )}`}
                        style={{
                          width: `${service.cpuUsage}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <div className="monitoring-metric">
                    <div className="monitoring-metric-info">
                      <span>
                        {service.memoryUsage}%
                      </span>
                    </div>

                    <div className="monitoring-metric-track">
                      <div
                        className={`monitoring-metric-bar ${getUsageClass(
                          service.memoryUsage
                        )}`}
                        style={{
                          width: `${service.memoryUsage}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <div className="monitoring-metric">
                    <div className="monitoring-metric-info">
                      <span>
                        {service.storageUsage}%
                      </span>
                    </div>

                    <div className="monitoring-metric-track">
                      <div
                        className={`monitoring-metric-bar ${getUsageClass(
                          service.storageUsage
                        )}`}
                        style={{
                          width: `${service.storageUsage}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <strong className="monitoring-requests">
                    {service.requestsPerMinute.toLocaleString()}
                  </strong>
                </td>

                <td>
                  <span className="monitoring-last-checked">
                    {service.lastChecked}
                  </span>
                </td>

                <td>
                  <div className="monitoring-actions">
                    <Link
                      to={`/monitoring/${service.id}`}
                      className="monitoring-action monitoring-view"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      disabled={isUpdating}
                      className={`monitoring-action ${
                        service.status === "Offline"
                          ? "monitoring-online"
                          : "monitoring-offline"
                      }`}
                      onClick={() =>
                        onToggleStatus(service.id)
                      }
                    >
                      {service.status === "Offline"
                        ? "Online"
                        : "Offline"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="monitoring-table-footer">
        <span>
          Showing {services.length} service
          {services.length !== 1 ? "s" : ""}
        </span>

        <div className="monitoring-pagination">
          <button type="button" disabled>
            ‹
          </button>

          <button
            type="button"
            className="active"
          >
            1
          </button>

          <button type="button" disabled>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default MonitoringTable;
