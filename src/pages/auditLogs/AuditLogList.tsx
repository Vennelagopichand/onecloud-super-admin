import { useMemo, useState } from "react";

import AuditLogFilters from "../../components/auditLogs/AuditLogFilters";
import AuditLogTable from "../../components/auditLogs/AuditLogTable";

import { useAuditLogs } from "../../hooks/auditLogs/useAuditLogs";

function AuditLogList() {
  const {
    data: logs = [],
    isLoading,
    isError,
  } = useAuditLogs();

  const [search, setSearch] = useState("");
  const [module, setModule] = useState("All");
  const [action, setAction] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredLogs = useMemo(() => {
    const text = search.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !text ||
        log.logCode.toLowerCase().includes(text) ||
        log.userName.toLowerCase().includes(text) ||
        log.userEmail.toLowerCase().includes(text) ||
        log.description.toLowerCase().includes(text) ||
        log.ipAddress.toLowerCase().includes(text);

      const matchesModule =
        module === "All" ||
        log.module === module;

      const matchesAction =
        action === "All" ||
        log.action === action;

      const matchesSeverity =
        severity === "All" ||
        log.severity === severity;

      const matchesStatus =
        status === "All" ||
        log.status === status;

      return (
        matchesSearch &&
        matchesModule &&
        matchesAction &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [
    logs,
    search,
    module,
    action,
    severity,
    status,
  ]);

  const successCount = logs.filter(
    (log) => log.status === "Success"
  ).length;

  const failedCount = logs.filter(
    (log) => log.status === "Failed"
  ).length;

  const criticalCount = logs.filter(
    (log) => log.severity === "Critical"
  ).length;

  function resetFilters() {
    setSearch("");
    setModule("All");
    setAction("All");
    setSeverity("All");
    setStatus("All");
  }

  if (isLoading) {
    return (
      <div className="audit-page">
        <div className="loading-state">
          Loading audit logs...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="audit-page">
        <div className="error-state">
          Unable to load audit logs.
        </div>
      </div>
    );
  }

  return (
    <div className="audit-page">
      <div className="audit-page-header">
        <div>
          <h1>Audit Logs</h1>
          <p>
            Review platform activity, security events and administrative actions.
          </p>
        </div>
      </div>

      <div className="audit-summary">
        <div className="audit-summary-card">
          <span>Total Logs</span>
          <strong>{logs.length}</strong>
        </div>

        <div className="audit-summary-card">
          <span>Successful</span>
          <strong className="audit-summary-green">
            {successCount}
          </strong>
        </div>

        <div className="audit-summary-card">
          <span>Failed</span>
          <strong className="audit-summary-red">
            {failedCount}
          </strong>
        </div>

        <div className="audit-summary-card">
          <span>Critical Events</span>
          <strong className="audit-summary-orange">
            {criticalCount}
          </strong>
        </div>
      </div>

      <div className="audit-content">
        <div className="audit-content-header">
          <div>
            <h2>Platform Activity</h2>
            <p>
              Track user actions and security-related events.
            </p>
          </div>

          <span className="audit-result-count">
            {filteredLogs.length} Results
          </span>
        </div>

        <AuditLogFilters
          search={search}
          module={module}
          action={action}
          severity={severity}
          status={status}
          onSearchChange={setSearch}
          onModuleChange={setModule}
          onActionChange={setAction}
          onSeverityChange={setSeverity}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />

        <AuditLogTable logs={filteredLogs} />
      </div>
    </div>
  );
}

export default AuditLogList;
