import { useParams } from "react-router-dom";

import { useAuditLog } from "../../hooks/auditLogs/useAuditLog";

function AuditLogDetails() {
  const { id } = useParams();

  const logId = Number(id);

  const {
    data: log,
    isLoading,
    isError,
  } = useAuditLog(logId);

  if (isLoading) {
    return (
      <div className="audit-page">
        <div className="loading-state">
          Loading audit log...
        </div>
      </div>
    );
  }

  if (isError || !log) {
    return (
      <div className="audit-page">
        <div className="error-state">
          Audit log not found.
        </div>
      </div>
    );
  }

  return (
    <div className="audit-page">
      <div className="audit-details-header">
        <div className="audit-details-profile">
          <div className="audit-details-icon">
            ▤
          </div>

          <div>
            <h1>Audit Log Details</h1>

            <p>
              {log.logCode} · {log.module}
            </p>

            <div className="audit-details-badges">
              <span
                className={`audit-status ${
                  log.status === "Success"
                    ? "audit-status-success"
                    : "audit-status-failed"
                }`}
              >
                {log.status}
              </span>

              <span
                className={`audit-severity audit-severity-${log.severity.toLowerCase()}`}
              >
                {log.severity}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={() => window.history.back()}
        >
          ← Back
        </button>
      </div>

      <div className="audit-details-stats">
        <div>
          <span>Action</span>
          <strong>{log.action}</strong>
        </div>

        <div>
          <span>Module</span>
          <strong>{log.module}</strong>
        </div>

        <div>
          <span>Status</span>
          <strong>{log.status}</strong>
        </div>

        <div>
          <span>Severity</span>
          <strong>{log.severity}</strong>
        </div>
      </div>

      <div className="audit-details-grid">
        <div className="audit-details-card">
          <h3>User Information</h3>

          <div className="audit-info-row">
            <span>User Name</span>
            <strong>{log.userName}</strong>
          </div>

          <div className="audit-info-row">
            <span>Email</span>
            <strong>{log.userEmail}</strong>
          </div>

          <div className="audit-info-row">
            <span>IP Address</span>
            <strong className="audit-details-ip">
              {log.ipAddress}
            </strong>
          </div>
        </div>

        <div className="audit-details-card">
          <h3>Event Information</h3>

          <div className="audit-info-row">
            <span>Log Code</span>
            <strong>{log.logCode}</strong>
          </div>

          <div className="audit-info-row">
            <span>Action</span>
            <strong>{log.action}</strong>
          </div>

          <div className="audit-info-row">
            <span>Module</span>
            <strong>{log.module}</strong>
          </div>

          <div className="audit-info-row">
            <span>Date & Time</span>
            <strong>{log.createdAt}</strong>
          </div>
        </div>

        <div className="audit-details-card audit-event-card">
          <h3>Event Description</h3>

          <p>
            {log.description}
          </p>
        </div>

        <div className="audit-details-card">
          <h3>Security Information</h3>

          <div className="audit-security-item">
            <span>Severity Level</span>

            <span
              className={`audit-severity audit-severity-${log.severity.toLowerCase()}`}
            >
              {log.severity}
            </span>
          </div>

          <div className="audit-security-item">
            <span>Execution Status</span>

            <span
              className={`audit-status ${
                log.status === "Success"
                  ? "audit-status-success"
                  : "audit-status-failed"
              }`}
            >
              {log.status}
            </span>
          </div>

          <div className="audit-security-item">
            <span>Source IP</span>

            <code className="audit-ip">
              {log.ipAddress}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditLogDetails;
