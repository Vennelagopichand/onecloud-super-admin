const healthItems = [
  {
    label: "API Gateway",
    value: "Healthy",
    type: "success",
  },
  {
    label: "Database",
    value: "Connected",
    type: "success",
  },
  {
    label: "Server",
    value: "Running",
    type: "success",
  },
];

const usageItems = [
  {
    label: "Storage",
    value: 68,
  },
  {
    label: "CPU Usage",
    value: 42,
  },
  {
    label: "Memory Usage",
    value: 61,
  },
];

function PlatformHealth() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Platform Health</h2>
          <p>Real-time system status</p>
        </div>

        <span className="healthy-badge">
          ● All Systems Operational
        </span>
      </div>

      <div className="health-status-list">
        {healthItems.map((item) => (
          <div
            className="health-status-item"
            key={item.label}
          >
            <div className="health-name">
              <span className="health-indicator" />
              {item.label}
            </div>

            <span className="health-value">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="usage-section">
        {usageItems.map((item) => (
          <div
            className="usage-item"
            key={item.label}
          >
            <div className="usage-header">
              <span>{item.label}</span>

              <strong>{item.value}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{
                  width: `${item.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlatformHealth;
