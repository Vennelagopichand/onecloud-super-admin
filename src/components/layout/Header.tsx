import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({
  onMenuClick,
}: HeaderProps) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="header-title">
          <h3>
            Super Admin Portal
          </h3>

          <p>
            One Enterprise Cloud Platform
          </p>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <span className="notification-icon">
            🔔
          </span>

          <span className="notification-badge">
            3
          </span>
        </button>

        <div className="header-user">
          <div className="header-avatar">
            SA
          </div>

          <div className="header-user-info">
            <strong>
              Super Admin
            </strong>

            <span>
              Administrator
            </span>
          </div>
        </div>

        <button
          type="button"
          className="header-logout"
          onClick={handleLogout}
          title="Logout"
        >
          ↪
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
