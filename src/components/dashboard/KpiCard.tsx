interface KpiCardProps {
  title: string;
  value: string | number;
  icon: string;
  description?: string;
  type?: "blue" | "green" | "red" | "purple" | "orange";
}

function KpiCard({
  title,
  value,
  icon,
  description,
  type = "blue",
}: KpiCardProps) {
  return (
    <div className={`kpi-card kpi-${type}`}>
      <div className="kpi-top">
        <div className="kpi-icon">{icon}</div>

        <span className="kpi-dot">•••</span>
      </div>

      <h3>{value}</h3>

      <p>{title}</p>

      {description && (
        <span className="kpi-description">
          {description}
        </span>
      )}
    </div>
  );
}

export default KpiCard;
