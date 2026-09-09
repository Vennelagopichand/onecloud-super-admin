import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import MonitoringFilters from "../../components/monitoring/MonitoringFilters";
import MonitoringTable from "../../components/monitoring/MonitoringTable";

import { useMonitoringServices } from "../../hooks/monitoring/useMonitoringServices";
import { useToggleMonitoringStatus } from "../../hooks/monitoring/useToggleMonitoringStatus";

function MonitoringList() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useMonitoringServices();

  const toggleStatus =
    useToggleMonitoringStatus();

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");
  const [status, setStatus] =
    useState("All");

  const filteredServices = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !searchText ||
        service.serviceName
          .toLowerCase()
          .includes(searchText) ||
        service.serviceCode
          .toLowerCase()
          .includes(searchText) ||
        service.category
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        service.category === category;

      const matchesStatus =
        status === "All" ||
        service.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    services,
    search,
    category,
    status,
  ]);

  const healthyCount = services.filter(
    (service) =>
      service.status === "Healthy"
  ).length;

  const warningCount = services.filter(
    (service) =>
      service.status === "Warning"
  ).length;

  const criticalCount = services.filter(
    (service) =>
      service.status === "Critical"
  ).length;

  const offlineCount = services.filter(
    (service) =>
      service.status === "Offline"
  ).length;

  const averageUptime =
    services.length > 0
      ? services.reduce(
          (total, service) =>
            total + service.uptime,
          0
        ) / services.length
      : 0;

  const averageResponse =
    services.length > 0
      ? Math.round(
          services.reduce(
            (total, service) =>
              total + service.responseTime,
            0
          ) / services.length
        )
      : 0;

  const totalRequests =
    services.reduce(
      (total, service) =>
        total + service.requestsPerMinute,
      0
    );

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setStatus("All");
  }

  if (isLoading) {
    return (
      <div className="monitoring-page">
        <div className="loading-state">
          Loading monitoring services...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="monitoring-page">
        <div className="error-state">
          Unable to load monitoring services.
        </div>
      </div>
    );
  }

  return (
    <div className="monitoring-page">
      <div className="monitoring-page-header">
        <div>
          <h1>Monitoring Management</h1>

          <p>
            Monitor platform services, system health
            and application performance.
          </p>
        </div>

        <div className="monitoring-live-indicator">
          <span />
          System Monitoring
        </div>
      </div>

      <div className="monitoring-summary">
        <div className="monitoring-summary-card">
          <div className="monitoring-summary-icon">
            ◉
          </div>

          <div>
            <span>Total Services</span>
            <strong>{services.length}</strong>
          </div>
        </div>

        <div className="monitoring-summary-card">
          <div className="monitoring-summary-icon monitoring-summary-healthy">
            ✓
          </div>

          <div>
            <span>Healthy</span>

            <strong className="monitoring-green">
              {healthyCount}
            </strong>
          </div>
        </div>

        <div className="monitoring-summary-card">
          <div className="monitoring-summary-icon monitoring-summary-warning">
            !
          </div>

          <div>
            <span>Warning</span>

            <strong className="monitoring-orange">
              {warningCount}
            </strong>
          </div>
        </div>

        <div className="monitoring-summary-card">
          <div className="monitoring-summary-icon monitoring-summary-critical">
            !
          </div>

          <div>
            <span>Critical / Offline</span>

            <strong className="monitoring-red">
              {criticalCount + offlineCount}
            </strong>
          </div>
        </div>
      </div>

      <div className="monitoring-overview">
        <div className="monitoring-overview-card">
          <span>Average Uptime</span>

          <strong>
            {averageUptime.toFixed(2)}%
          </strong>

          <small>Across all services</small>
        </div>

        <div className="monitoring-overview-card">
          <span>Average Response</span>

          <strong>
            {averageResponse} ms
          </strong>

          <small>Service response time</small>
        </div>

        <div className="monitoring-overview-card">
          <span>Requests / Minute</span>

          <strong>
            {totalRequests.toLocaleString()}
          </strong>

          <small>Current platform traffic</small>
        </div>
      </div>

      <div className="monitoring-content">
        <div className="monitoring-content-header">
          <div>
            <h2>Service Health</h2>

            <p>
              Real-time overview of platform
              infrastructure and services.
            </p>
          </div>

          <span className="monitoring-result-count">
            {filteredServices.length} Results
          </span>
        </div>

        <MonitoringFilters
          search={search}
          category={category}
          status={status}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />

        <MonitoringTable
          services={filteredServices}
          onToggleStatus={(id) =>
            toggleStatus.mutate(id)
          }
          isUpdating={
            toggleStatus.isPending
          }
        />
      </div>

      <div className="monitoring-footer-note">
        <span>
          ● Monitoring data is refreshed through
          TanStack Query.
        </span>

        <Link to="/">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default MonitoringList;
