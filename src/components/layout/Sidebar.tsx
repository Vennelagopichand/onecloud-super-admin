import { NavLink } from "react-router-dom";

interface SidebarProps {
  onClose: () => void;
}

function Sidebar({
  onClose,
}: SidebarProps) {
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
          <span>
            Super Admin Portal
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="menu-title">
          MAIN MENU
        </p>

        <NavLink
          to="/"
          end
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ▦
          </span>
          Dashboard
        </NavLink>

        <NavLink
          to="/tenants"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ◫
          </span>
          Tenant Management
        </NavLink>

        <NavLink
          to="/organizations"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ▣
          </span>
          Organization Management
        </NavLink>

        <NavLink
          to="/users"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ◉
          </span>
          User Management
        </NavLink>

        <NavLink
          to="/roles"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ◆
          </span>
          Role Management
        </NavLink>

        <NavLink
          to="/permissions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ✓
          </span>
          Permission Management
        </NavLink>

        <NavLink
          to="/data-permissions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ◇
          </span>
          Data Permissions
        </NavLink>

        <NavLink
          to="/features"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ⚙
          </span>
          Feature Management
        </NavLink>

        <NavLink
          to="/subscriptions"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ▤
          </span>
          Subscription & License
        </NavLink>

        <NavLink
          to="/platform-config"
          className={navClass}
          onClick={onClose}
        >
          <span className="nav-icon">
            ⚒
          </span>
          Platform Configuration
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">
          SA
        </div>

        <div>
          <strong>
            Super Admin
          </strong>
          <p>Administrator</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
