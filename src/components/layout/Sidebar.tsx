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
      {/* LOGO */}
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

      {/* NAVIGATION */}
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
      </nav>

      {/* SIDEBAR FOOTER */}
      <div className="sidebar-footer">
        <div className="admin-avatar">
          SA
        </div>

        <div>
          <strong>
            Super Admin
          </strong>

          <p>
            Administrator
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;