interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div>
          <h3>Super Admin Portal</h3>
          <p>One Enterprise Cloud Platform</p>
        </div>
      </div>

      <div className="header-right">
        <button className="notification-button">
          🔔
          <span className="notification-badge">3</span>
        </button>

        <div className="header-user">
          <div className="header-avatar">SA</div>

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
