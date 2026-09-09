import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div
        className={`sidebar-wrapper ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <Sidebar
          onClose={closeSidebar}
        />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Main Application Area */}
      <div className="admin-main">

        {/* Header */}
        <Header
          onMenuClick={openSidebar}
        />

        {/* Page Content */}
        <main className="main-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;
