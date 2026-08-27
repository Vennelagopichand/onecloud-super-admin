import type {
  TenantStats as TenantStatsType,
} from "../../hooks/useTenantStats";

interface TenantStatsProps {
  stats: TenantStatsType;
}

function TenantStats({
  stats,
}: TenantStatsProps) {
  return (
    <div className="tenant-stats-grid">
      <div className="tenant-stat-card">
        <div className="tenant-stat-icon">
          👥
        </div>

        <div>
          <span>Users</span>
          <strong>{stats.users}</strong>
        </div>
      </div>

      <div className="tenant-stat-card">
        <div className="tenant-stat-icon">
          🏢
        </div>

        <div>
          <span>Organizations</span>
          <strong>
            {stats.organizations}
          </strong>
        </div>
      </div>

      <div className="tenant-stat-card">
        <div className="tenant-stat-icon">
          ✓
        </div>

        <div>
          <span>Active Users</span>
          <strong>
            {stats.activeUsers}
          </strong>
        </div>
      </div>

      <div className="tenant-stat-card">
        <div className="tenant-stat-icon">
          ◫
        </div>

        <div>
          <span>Storage</span>
          <strong>
            {stats.storage}%
          </strong>
        </div>
      </div>
    </div>
  );
}

export default TenantStats;
