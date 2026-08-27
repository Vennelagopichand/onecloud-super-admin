interface EmptyStateProps {
  title: string;
  message: string;
}

function EmptyState({
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        ⌕
      </div>

      <h3>{title}</h3>

      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
