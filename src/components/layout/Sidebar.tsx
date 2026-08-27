import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">O</div>

        <div>
          <h2>OneCloud</h2>
          <span>Super Admin</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="menu-title">MAIN MENU</p>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/tenants"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="nav-icon">▤</span>
          Tenant Management
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">SA</div>

        <div>
          <strong>Super Admin</strong>
          <p>Administrator</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
