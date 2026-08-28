import { useTenants } from "../../hooks/useTenants";

function TenantGrowthChart() {
  const { data: tenants = [] } = useTenants();

  const monthOrder = [
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ];

  /*
    Previous months are sample platform history.
    August is calculated from the actual tenants array.
  */
  const data = [
    { month: "Mar", value: 4 },
    { month: "Apr", value: 5 },
    { month: "May", value: 6 },
    { month: "Jun", value: 8 },
    { month: "Jul", value: 10 },
    { month: "Aug", value: tenants.length },
  ];

  const maxValue = Math.max(
    ...data.map((item) => item.value),
    1
  );

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Tenant Growth</h2>

          <p>
            Tenant registrations over the last
            6 months
          </p>
        </div>

        <span className="growth-label">
          {tenants.length} Total
        </span>
      </div>

      <div className="growth-chart">
        {monthOrder.map((month) => {
          const item = data.find(
            (entry) => entry.month === month
          );

          const value = item?.value ?? 0;

          return (
            <div
              className="chart-column"
              key={month}
            >
              <div className="chart-bar-wrapper">
                <span className="chart-number">
                  {value}
                </span>

                <div
                  className="chart-bar"
                  style={{
                    height: `${
                      (value / maxValue) * 100
                    }%`,
                  }}
                />
              </div>

              <span className="chart-month">
                {month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TenantGrowthChart;
