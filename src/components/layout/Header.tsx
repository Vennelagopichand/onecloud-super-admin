interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      {/* LEFT SIDE */}
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
          <h3>Super Admin Portal</h3>
          <p>One Enterprise Cloud Platform</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="header-actions">
        {/* Notification */}
        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
        >
          <span className="notification-icon">🔔</span>

          <span className="notification-badge">
            3
          </span>
        </button>

        {/* User */}
        <div className="header-user">
          <div className="header-avatar">
            SA
          </div>

          <div className="header-user-info">
            <strong>Super Admin</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
