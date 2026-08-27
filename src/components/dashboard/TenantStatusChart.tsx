import { useTenants } from "../../hooks/useTenants";

function TenantStatusChart() {
  const {
    data: tenants = [],
  } = useTenants();

  const activeTenants = tenants.filter(
    (tenant) => tenant.status === "Active"
  ).length;

  const inactiveTenants = tenants.filter(
    (tenant) => tenant.status === "Inactive"
  ).length;

  const total = tenants.length;

  const activePercentage =
    total > 0
      ? Math.round(
          (activeTenants / total) * 100
        )
      : 0;

  const inactivePercentage =
    total > 0
      ? Math.round(
          (inactiveTenants / total) * 100
        )
      : 0;

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Tenant Status</h2>
          <p>Active vs inactive tenants</p>
        </div>
      </div>

      <div className="status-chart-content">
        <div
          className="donut-chart"
          style={{
            background: `conic-gradient(
              #22c55e 0% ${activePercentage}%,
              #ef4444 ${activePercentage}% 100%
            )`,
          }}
        >
          <div className="donut-center">
            <strong>{total}</strong>
            <span>Tenants</span>
          </div>
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <div>
              <span className="legend-dot active-dot" />
              Active
            </div>

            <strong>
              {activeTenants}
            </strong>

            <span>
              {activePercentage}%
            </span>
          </div>

          <div className="legend-item">
            <div>
              <span className="legend-dot inactive-dot" />
              Inactive
            </div>

            <strong>
              {inactiveTenants}
            </strong>

            <span>
              {inactivePercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantStatusChart;
