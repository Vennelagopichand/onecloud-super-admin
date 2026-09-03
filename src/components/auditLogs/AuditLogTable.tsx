import { Link } from "react-router-dom";

import type { AuditLog } from "../../types/auditLog";

interface AuditLogTableProps {
  logs: AuditLog[];
}

function AuditLogTable({
  logs,
}: AuditLogTableProps) {
  if (!logs.length) {
    return (
      <div className="audit-empty">
        <div>▤</div>
        <h3>No audit logs found</h3>
        <p>Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="audit-table-card">
      <div className="table-responsive">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Log</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Severity</th>
              <th>Status</th>
              <th>IP Address</th>
              <th>Date & Time</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>
                  <span className="audit-code">
                    {log.logCode}
                  </span>
                </td>

                <td>
                  <div className="audit-user">
                    <strong>{log.userName}</strong>
                    <span>{log.userEmail}</span>
                  </div>
                </td>

                <td>
                  <span className="audit-action-badge">
                    {log.action}
                  </span>
                </td>

                <td>{log.module}</td>

                <td>
                  <span
                    className={`audit-severity audit-severity-${log.severity.toLowerCase()}`}
                  >
                    {log.severity}
                  </span>
                </td>

                <td>
                  <span
                    className={`audit-status ${
                      log.status === "Success"
                        ? "audit-status-success"
                        : "audit-status-failed"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>

                <td>
                  <code className="audit-ip">
                    {log.ipAddress}
                  </code>
                </td>

                <td>{log.createdAt}</td>

                <td>
                  <Link
                    to={`/audit-logs/${log.id}`}
                    className="audit-view-button"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="audit-table-footer">
        <span>
          Showing {logs.length} result
          {logs.length !== 1 ? "s" : ""}
        </span>

        <div className="audit-pagination">
          <button disabled>‹</button>
          <button className="active">1</button>
          <button disabled>›</button>
        </div>
      </div>
    </div>
  );
}

export default AuditLogTable;
