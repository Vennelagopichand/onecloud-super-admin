import { useTenants } from "../hooks/useTenants";

import KpiCard from "../components/dashboard/KpiCard";
import PlatformHealth from "../components/dashboard/PlatformHealth";
import TenantGrowthChart from "../components/dashboard/TenantGrowthChart";
import TenantStatusChart from "../components/dashboard/TenantStatusChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import QuickNavigation from "../components/dashboard/QuickNavigation";

function Dashboard() {
  const {
    data: tenants = [],
    isLoading,
    isError,
  } = useTenants();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="dashboard-error">
        Unable to load dashboard data.
      </div>
    );
  }

  const totalTenants = tenants.length;

  const activeTenants = tenants.filter(
    (tenant) => tenant.status === "Active"
  ).length;

  const inactiveTenants = tenants.filter(
    (tenant) => tenant.status === "Inactive"
  ).length;

  const totalUsers = tenants.reduce(
    (total, tenant) => total + tenant.users,
    0
  );

  return (
    <div className="dashboard-page">
      <div className="page-header dashboard-title">
        <div>
          <h1>Global Dashboard</h1>

          <p>
            Monitor platform performance, tenants,
            users and system health.
          </p>
        </div>

        <div className="dashboard-date">
          21 Aug 2026
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <KpiCard
          title="Total Tenants"
          value={totalTenants}
          icon="▦"
          description="Total registered tenants"
          type="blue"
        />

        <KpiCard
          title="Active Tenants"
          value={activeTenants}
          icon="✓"
          description="Currently active tenants"
          type="green"
        />

        <KpiCard
          title="Inactive Tenants"
          value={inactiveTenants}
          icon="×"
          description="Currently inactive tenants"
          type="red"
        />

        <KpiCard
          title="Total Users"
          value={totalUsers.toLocaleString()}
          icon="♟"
          description="Across all tenants"
          type="purple"
        />

        <KpiCard
          title="Active Licenses"
          value={98}
          icon="★"
          description="78.4% utilization"
          type="orange"
        />
      </div>

      {/* ANALYTICS */}
      <div className="dashboard-two-column">
        <TenantGrowthChart />

        <TenantStatusChart />
      </div>

      {/* HEALTH + QUICK NAVIGATION */}
      <div className="dashboard-two-column health-row">
        <PlatformHealth />

        <QuickNavigation />
      </div>

      {/* RECENT ACTIVITY */}
      <RecentActivities />
    </div>
  );
}

export default Dashboard;
