import { Link } from "react-router-dom";

const navigationItems = [
  {
    title: "Tenant Management",
    description: "View and manage tenants",
    icon: "▤",
    path: "/tenants",
  },
  {
    title: "Create Tenant",
    description: "Register a new tenant",
    icon: "+",
    path: "/tenants/create",
  },
];

function QuickNavigation() {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h2>Quick Navigation</h2>
          <p>Frequently used actions</p>
        </div>
      </div>

      <div className="quick-navigation">
        {navigationItems.map((item) => (
          <Link
            to={item.path}
            className="quick-item"
            key={item.title}
          >
            <div className="quick-icon">
              {item.icon}
            </div>

            <div>
              <strong>
                {item.title}
              </strong>

              <p>
                {item.description}
              </p>
            </div>

            <span className="quick-arrow">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickNavigation;
