import { useState } from "react";

import type {
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
} from "../../types/notification";

export interface NotificationFormData {
  notificationCode: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  channel: NotificationChannel;
  audience: string;
  sentCount: number;
  readCount: number;
  status: NotificationStatus;
}

interface NotificationFormProps {
  initialData?: NotificationFormData;
  submitText: string;
  onSubmit: (data: NotificationFormData) => void;
  isSubmitting?: boolean;
}

function NotificationForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: NotificationFormProps) {
  const [formData, setFormData] =
    useState<NotificationFormData>(
      initialData ?? {
        notificationCode: "",
        title: "",
        message: "",
        type: "System",
        priority: "Medium",
        channel: "In-App",
        audience: "",
        sentCount: 0,
        readCount: 0,
        status: "Active",
      }
    );

  const [error, setError] = useState("");

  function updateField(
    field: keyof NotificationFormData,
    value: string | number
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Notification title is required.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Notification message is required.");
      return;
    }

    if (!formData.audience.trim()) {
      setError("Audience is required.");
      return;
    }

    if (formData.readCount > formData.sentCount) {
      setError(
        "Read count cannot be greater than sent count."
      );
      return;
    }

    setError("");
    onSubmit(formData);
  }

  return (
    <form
      className="notification-form-card"
      onSubmit={handleSubmit}
    >
      <div className="notification-form-header">
        <h2>Notification Information</h2>
        <p>
          Configure notification content,
          delivery and audience settings.
        </p>
      </div>

      {error && (
        <div className="notification-form-error">
          {error}
        </div>
      )}

      <div className="notification-form-grid">
        <div className="notification-form-group">
          <label>Notification Code</label>

          <input
            type="text"
            value={formData.notificationCode}
            placeholder="Auto generated if empty"
            onChange={(e) =>
              updateField(
                "notificationCode",
                e.target.value
              )
            }
          />
        </div>

        <div className="notification-form-group">
          <label>Title *</label>

          <input
            type="text"
            value={formData.title}
            placeholder="Enter notification title"
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
          />
        </div>

        <div className="notification-form-group">
          <label>Type</label>

          <select
            value={formData.type}
            onChange={(e) =>
              updateField(
                "type",
                e.target.value as NotificationType
              )
            }
          >
            <option value="System">
              System
            </option>
            <option value="Security">
              Security
            </option>
            <option value="Subscription">
              Subscription
            </option>
            <option value="Tenant">
              Tenant
            </option>
            <option value="Maintenance">
              Maintenance
            </option>
            <option value="Announcement">
              Announcement
            </option>
          </select>
        </div>

        <div className="notification-form-group">
          <label>Priority</label>

          <select
            value={formData.priority}
            onChange={(e) =>
              updateField(
                "priority",
                e.target.value as NotificationPriority
              )
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">High</option>
            <option value="Critical">
              Critical
            </option>
          </select>
        </div>

        <div className="notification-form-group">
          <label>Channel</label>

          <select
            value={formData.channel}
            onChange={(e) =>
              updateField(
                "channel",
                e.target.value as NotificationChannel
              )
            }
          >
            <option value="In-App">
              In-App
            </option>
            <option value="Email">
              Email
            </option>
            <option value="SMS">
              SMS
            </option>
            <option value="Push">
              Push
            </option>
          </select>
        </div>

        <div className="notification-form-group">
          <label>Status</label>

          <select
            value={formData.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as NotificationStatus
              )
            }
          >
            <option value="Active">
              Active
            </option>
            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="notification-form-group notification-form-full">
          <label>Audience *</label>

          <input
            type="text"
            value={formData.audience}
            placeholder="Example: All Users"
            onChange={(e) =>
              updateField(
                "audience",
                e.target.value
              )
            }
          />
        </div>

        <div className="notification-form-group">
          <label>Sent Count</label>

          <input
            type="number"
            min="0"
            value={formData.sentCount}
            onChange={(e) =>
              updateField(
                "sentCount",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="notification-form-group">
          <label>Read Count</label>

          <input
            type="number"
            min="0"
            value={formData.readCount}
            onChange={(e) =>
              updateField(
                "readCount",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="notification-form-group notification-form-full">
          <label>Message *</label>

          <textarea
            rows={5}
            value={formData.message}
            placeholder="Enter notification message"
            onChange={(e) =>
              updateField(
                "message",
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="notification-form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            window.history.back()
          }
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : submitText}
        </button>
      </div>
    </form>
  );
}

export default NotificationForm;
