import { NavLink } from "react-router-dom";

interface SidebarProps {
  onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const navClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    isActive
      ? "nav-link active"
      : "nav-link";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          O
        </div>

        <div>
          <h2>OneCloud</h2>
          <span>Super Admin Portal</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="menu-title">
          MAIN MENU
        </p>

        {/* Dashboard */}

        <NavLink
          to="/"
          end
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">▦</span>
          Dashboard
        </NavLink>

        {/* Tenant Management */}

        <NavLink
          to="/tenants"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◫</span>
          Tenant Management
        </NavLink>

        {/* Organization Management */}

        <NavLink
          to="/organizations"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">▣</span>
          Organization Management
        </NavLink>

        {/* User Management */}

        <NavLink
          to="/users"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◉</span>
          User Management
        </NavLink>

        {/* Role Management */}

        <NavLink
          to="/roles"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◆</span>
          Role Management
        </NavLink>

        {/* Permission Management */}

        <NavLink
          to="/permissions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">✓</span>
          Permission Management
        </NavLink>

        {/* Data Permissions */}

        <NavLink
          to="/data-permissions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◇</span>
          Data Permissions
        </NavLink>

        {/* Feature Management */}

        <NavLink
          to="/features"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">⚙</span>
          Feature Management
        </NavLink>

        {/* Subscription & License */}

        <NavLink
          to="/subscriptions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">▤</span>
          Subscription & License
        </NavLink>

        {/* Platform Configuration */}

        <NavLink
          to="/platform-config"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">⚒</span>
          Platform Configuration
        </NavLink>

        {/* Security Management */}

        <NavLink
          to="/security"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◈</span>
          Security Management
        </NavLink>

        {/* Audit Logs */}

        <NavLink
          to="/audit-logs"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">▥</span>
          Audit Logs
        </NavLink>

        {/* Notification Management */}

        <NavLink
          to="/notifications"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">🔔</span>
          Notification Management
        </NavLink>

        {/* Monitoring Management */}

        <NavLink
          to="/monitoring"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">◉</span>
          Monitoring Management
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">
          SA
        </div>

        <div>
          <strong>Super Admin</strong>
          <p>Administrator</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
