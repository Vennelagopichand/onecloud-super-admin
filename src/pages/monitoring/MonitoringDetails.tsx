import { Link, useNavigate, useParams } from "react-router-dom";

import { useMonitoringService } from "../../hooks/monitoring/useMonitoringService";
import { useToggleMonitoringStatus } from "../../hooks/monitoring/useToggleMonitoringStatus";

function MonitoringDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const serviceId = Number(id);

  const {
    data: service,
    isLoading,
    isError,
  } = useMonitoringService(serviceId);

  const toggleStatus =
    useToggleMonitoringStatus();

  if (isLoading) {
    return (
      <div className="monitoring-page">
        <div className="loading-state">
          Loading monitoring service...
        </div>
      </div>
    );
  }

  if (isError || !service) {
    return (
      <div className="monitoring-page">
        <div className="error-state">
          Monitoring service not found.
        </div>

        <button
          type="button"
          className="monitoring-back-button"
          onClick={() => navigate("/monitoring")}
        >
          Back to Monitoring
        </button>
      </div>
    );
  }

  function getUsageClass(value: number) {
    if (value >= 85) {
      return "monitoring-detail-critical";
    }

    if (value >= 70) {
      return "monitoring-detail-warning";
    }

    return "monitoring-detail-normal";
  }

  function getStatusClass() {
    return `monitoring-status monitoring-status-${service.status.toLowerCase()}`;
  }

  return (
    <div className="monitoring-page">
      <div className="monitoring-details-header">
        <div className="monitoring-details-profile">
          <div className="monitoring-details-icon">
            ◉
          </div>

          <div>
            <div className="monitoring-breadcrumb">
              <Link to="/monitoring">
                Monitoring Management
              </Link>

              <span>/</span>

              <span>{service.serviceName}</span>
            </div>

            <h1>{service.serviceName}</h1>

            <p>{service.serviceCode}</p>

            <span className={getStatusClass()}>
              <span className="monitoring-status-dot" />
              {service.status}
            </span>
          </div>
        </div>

        <div className="monitoring-details-actions">
          <Link
            to="/monitoring"
            className="monitoring-details-secondary"
          >
            Back
          </Link>

          <button
            type="button"
            disabled={toggleStatus.isPending}
            className={
              service.status === "Offline"
                ? "monitoring-details-online"
                : "monitoring-details-offline"
            }
            onClick={() =>
              toggleStatus.mutate(service.id)
            }
          >
            {toggleStatus.isPending
              ? "Updating..."
              : service.status === "Offline"
              ? "Bring Online"
              : "Set Offline"}
          </button>
        </div>
      </div>

      <div className="monitoring-detail-stats">
        <div className="monitoring-detail-stat">
          <span>Uptime</span>

          <strong className="monitoring-detail-green">
            {service.uptime.toFixed(2)}%
          </strong>

          <small>Service availability</small>
        </div>

        <div className="monitoring-detail-stat">
          <span>Response Time</span>

          <strong>
            {service.responseTime > 0
              ? `${service.responseTime} ms`
              : "—"}
          </strong>

          <small>Average response</small>
        </div>

        <div className="monitoring-detail-stat">
          <span>Requests / Minute</span>

          <strong>
            {service.requestsPerMinute.toLocaleString()}
          </strong>

          <small>Current traffic</small>
        </div>

        <div className="monitoring-detail-stat">
          <span>Category</span>

          <strong>{service.category}</strong>

          <small>Service type</small>
        </div>
      </div>

      <div className="monitoring-details-grid">
        <div className="monitoring-detail-card">
          <div className="monitoring-detail-card-header">
            <div>
              <h2>Resource Usage</h2>

              <p>
                Current infrastructure resource
                consumption.
              </p>
            </div>

            <span className="monitoring-card-icon">
              ◈
            </span>
          </div>

          <div className="monitoring-resource">
            <div className="monitoring-resource-header">
              <span>CPU Usage</span>

              <strong>
                {service.cpuUsage}%
              </strong>
            </div>

            <div className="monitoring-resource-track">
              <div
                className={`monitoring-resource-bar ${getUsageClass(
                  service.cpuUsage
                )}`}
                style={{
                  width: `${service.cpuUsage}%`,
                }}
              />
            </div>

            <small>
              {service.cpuUsage >= 85
                ? "High resource usage"
                : service.cpuUsage >= 70
                ? "Moderate resource usage"
                : "Normal resource usage"}
            </small>
          </div>

          <div className="monitoring-resource">
            <div className="monitoring-resource-header">
              <span>Memory Usage</span>

              <strong>
                {service.memoryUsage}%
              </strong>
            </div>

            <div className="monitoring-resource-track">
              <div
                className={`monitoring-resource-bar ${getUsageClass(
                  service.memoryUsage
                )}`}
                style={{
                  width: `${service.memoryUsage}%`,
                }}
              />
            </div>

            <small>
              {service.memoryUsage >= 85
                ? "High resource usage"
                : service.memoryUsage >= 70
                ? "Moderate resource usage"
                : "Normal resource usage"}
            </small>
          </div>

          <div className="monitoring-resource">
            <div className="monitoring-resource-header">
              <span>Storage Usage</span>

              <strong>
                {service.storageUsage}%
              </strong>
            </div>

            <div className="monitoring-resource-track">
              <div
                className={`monitoring-resource-bar ${getUsageClass(
                  service.storageUsage
                )}`}
                style={{
                  width: `${service.storageUsage}%`,
                }}
              />
            </div>

            <small>
              {service.storageUsage >= 85
                ? "Storage capacity is critical"
                : service.storageUsage >= 70
                ? "Storage capacity requires attention"
                : "Storage capacity is normal"}
            </small>
          </div>
        </div>

        <div className="monitoring-detail-card">
          <div className="monitoring-detail-card-header">
            <div>
              <h2>Service Information</h2>

              <p>
                Configuration and health information.
              </p>
            </div>

            <span className="monitoring-card-icon">
              ℹ
            </span>
          </div>

          <div className="monitoring-info-list">
            <div className="monitoring-info-row">
              <span>Service Code</span>
              <strong>{service.serviceCode}</strong>
            </div>

            <div className="monitoring-info-row">
              <span>Service Name</span>
              <strong>{service.serviceName}</strong>
            </div>

            <div className="monitoring-info-row">
              <span>Category</span>
              <strong>{service.category}</strong>
            </div>

            <div className="monitoring-info-row">
              <span>Current Status</span>

              <span className={getStatusClass()}>
                <span className="monitoring-status-dot" />
                {service.status}
              </span>
            </div>

            <div className="monitoring-info-row">
              <span>Uptime</span>
              <strong>
                {service.uptime.toFixed(2)}%
              </strong>
            </div>

            <div className="monitoring-info-row">
              <span>Response Time</span>
              <strong>
                {service.responseTime > 0
                  ? `${service.responseTime} ms`
                  : "—"}
              </strong>
            </div>

            <div className="monitoring-info-row">
              <span>Requests / Minute</span>
              <strong>
                {service.requestsPerMinute.toLocaleString()}
              </strong>
            </div>

            <div className="monitoring-info-row">
              <span>Last Checked</span>
              <strong>
                {service.lastChecked}
              </strong>
            </div>
          </div>
        </div>

        <div className="monitoring-detail-card monitoring-performance-card">
          <div className="monitoring-detail-card-header">
            <div>
              <h2>Performance Summary</h2>

              <p>
                Current service performance indicators.
              </p>
            </div>
          </div>

          <div className="monitoring-performance-grid">
            <div>
              <span>CPU</span>
              <strong>
                {service.cpuUsage}%
              </strong>
            </div>

            <div>
              <span>Memory</span>
              <strong>
                {service.memoryUsage}%
              </strong>
            </div>

            <div>
              <span>Storage</span>
              <strong>
                {service.storageUsage}%
              </strong>
            </div>

            <div>
              <span>Response</span>
              <strong>
                {service.responseTime > 0
                  ? `${service.responseTime} ms`
                  : "—"}
              </strong>
            </div>
          </div>
        </div>

        <div className="monitoring-detail-card monitoring-health-card">
          <div className="monitoring-detail-card-header">
            <div>
              <h2>Health Status</h2>

              <p>
                Current availability of this service.
              </p>
            </div>
          </div>

          <div className="monitoring-health-status">
            <div
              className={`monitoring-health-icon monitoring-health-${service.status.toLowerCase()}`}
            >
              {service.status === "Healthy"
                ? "✓"
                : service.status === "Warning"
                ? "!"
                : service.status === "Critical"
                ? "!"
                : "×"}
            </div>

            <div>
              <strong>
                Service is {service.status}
              </strong>

              <p>
                Last health check:{" "}
                {service.lastChecked}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="monitoring-details-bottom">
        <Link
          to="/monitoring"
          className="monitoring-back-button"
        >
          ← Back to Monitoring Management
        </Link>
      </div>
    </div>
  );
}

export default MonitoringDetails;
