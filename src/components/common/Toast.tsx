interface ToastProps {
  message: string;
  type?: "success" | "error";
}

function Toast({
  message,
  type = "success",
}: ToastProps) {
  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </span>

      <span>{message}</span>
    </div>
  );
}

export default Toast;