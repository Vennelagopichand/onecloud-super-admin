const tenantGrowthData = [
  {
    month: "Mar",
    value: 62,
  },
  {
    month: "Apr",
    value: 74,
  },
  {
    month: "May",
    value: 83,
  },
  {
    month: "Jun",
    value: 95,
  },
  {
    month: "Jul",
    value: 108,
  },
  {
    month: "Aug",
    value: 125,
  },
];

function TenantGrowthChart() {
  const maxValue = Math.max(
    ...tenantGrowthData.map((item) => item.value)
  );

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Tenant Growth</h2>
          <p>Tenant growth over the last 6 months</p>
        </div>

        <span className="growth-label">
          +18.4%
        </span>
      </div>

      <div className="growth-chart">
        {tenantGrowthData.map((item) => {
          const height =
            (item.value / maxValue) * 100;

          return (
            <div
              className="chart-column"
              key={item.month}
            >
              <div className="chart-bar-wrapper">
                <span className="chart-number">
                  {item.value}
                </span>

                <div
                  className="chart-bar"
                  style={{
                    height: `${height}%`,
                  }}
                />
              </div>

              <span className="chart-month">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TenantGrowthChart;
