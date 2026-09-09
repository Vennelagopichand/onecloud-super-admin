import { useMemo } from "react";

interface TenantStatusChartProps {
  activeTenants?: number;
  inactiveTenants?: number;
  totalTenants?: number;
}

function TenantStatusChart({
  activeTenants = 9,
  inactiveTenants = 3,
  totalTenants = 12,
}: TenantStatusChartProps) {
  const status = useMemo(() => {
    const total =
      totalTenants > 0
        ? totalTenants
        : activeTenants + inactiveTenants;

    const activePercentage =
      total > 0
        ? Math.round((activeTenants / total) * 100)
        : 0;

    const inactivePercentage =
      total > 0
        ? Math.round((inactiveTenants / total) * 100)
        : 0;

    const activeDegrees =
      activePercentage * 3.6;

    return {
      total,
      activePercentage,
      inactivePercentage,
      activeDegrees,
    };
  }, [
    activeTenants,
    inactiveTenants,
    totalTenants,
  ]);

  return (
    <div className="tenant-status-chart">

      {/* Header */}

      <div className="tenant-status-header">
        <div>
          <h3>Tenant Status</h3>

          <p>
            Active vs inactive tenants
          </p>
        </div>
      </div>

      {/* Circular Chart */}

      <div className="tenant-status-circle-wrapper">

        <div
          className="tenant-status-circle"
          style={{
            background: `conic-gradient(
              #22c55e 0deg ${status.activeDegrees}deg,
              #ef4444 ${status.activeDegrees}deg 360deg
            )`,
          }}
        >
          <div className="tenant-status-circle-inner">

            <strong>
              {status.total}
            </strong>

            <span>
              Tenants
            </span>

          </div>
        </div>

      </div>

      {/* Status Cards */}

      <div className="tenant-status-items">

        {/* Active */}

        <div className="tenant-status-item">

          <div className="tenant-status-item-label">
            <span className="tenant-status-dot active" />

            <span>
              Active
            </span>
          </div>

          <strong>
            {status.activePercentage}%
          </strong>

        </div>

        {/* Inactive */}

        <div className="tenant-status-item">

          <div className="tenant-status-item-label">
            <span className="tenant-status-dot inactive" />

            <span>
              Inactive
            </span>
          </div>

          <strong>
            {status.inactivePercentage}%
          </strong>

        </div>

      </div>

    </div>
  );
}

export default TenantStatusChart;
