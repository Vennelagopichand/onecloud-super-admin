const activities = [
  {
    id: 1,
    icon: "+",
    title: "New tenant created",
    description: "CloudSoft Solutions was added",
    time: "10 minutes ago",
    type: "create",
  },
  {
    id: 2,
    icon: "✓",
    title: "Tenant activated",
    description: "TechNova account was activated",
    time: "35 minutes ago",
    type: "active",
  },
  {
    id: 3,
    icon: "⚙",
    title: "Tenant configuration updated",
    description: "Acme Corporation settings changed",
    time: "1 hour ago",
    type: "update",
  },
  {
    id: 4,
    icon: "★",
    title: "License renewed",
    description: "NextGen Technologies renewed Pro plan",
    time: "2 hours ago",
    type: "license",
  },
  {
    id: 5,
    icon: "×",
    title: "Tenant deactivated",
    description: "Alpha Ltd account was deactivated",
    time: "3 hours ago",
    type: "inactive",
  },
];

function RecentActivities() {
  return (
    <div className="dashboard-card activity-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Recent Activities</h2>
          <p>Latest platform activities</p>
        </div>

        <button className="view-all-button">
          View All
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div
            className="activity-item"
            key={activity.id}
          >
            <div
              className={`activity-icon activity-${activity.type}`}
            >
              {activity.icon}
            </div>

            <div className="activity-info">
              <strong>
                {activity.title}
              </strong>

              <p>
                {activity.description}
              </p>
            </div>

            <span className="activity-time">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivities;
