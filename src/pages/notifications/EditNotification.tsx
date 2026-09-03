import {
  useNavigate,
  useParams,
} from "react-router-dom";

import NotificationForm from "../../components/notifications/NotificationForm";

import type { NotificationFormData } from "../../components/notifications/NotificationForm";

import { useNotification } from "../../hooks/notifications/useNotification";
import { useUpdateNotification } from "../../hooks/notifications/useUpdateNotification";

function EditNotification() {
  const { id } = useParams();

  const navigate = useNavigate();

  const notificationId = Number(id);

  const {
    data: notification,
    isLoading,
    isError,
  } = useNotification(notificationId);

  const updateNotification =
    useUpdateNotification();

  if (isLoading) {
    return (
      <div className="notification-page">
        <div className="loading-state">
          Loading notification...
        </div>
      </div>
    );
  }

  if (isError || !notification) {
    return (
      <div className="notification-page">
        <div className="error-state">
          Notification not found.
        </div>
      </div>
    );
  }

  const initialData: NotificationFormData = {
    notificationCode:
      notification.notificationCode,
    title: notification.title,
    message: notification.message,
    type: notification.type,
    priority: notification.priority,
    channel: notification.channel,
    audience: notification.audience,
    sentCount: notification.sentCount,
    readCount: notification.readCount,
    status: notification.status,
  };

  function handleSubmit(
    data: NotificationFormData
  ) {
    updateNotification.mutate(
      {
        id: notificationId,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            `/notifications/${notificationId}`
          );
        },
      }
    );
  }

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <div>
          <h1>Edit Notification</h1>

          <p>
            Update notification delivery
            and content settings.
          </p>
        </div>
      </div>

      <NotificationForm
        initialData={initialData}
        submitText="Update Notification"
        onSubmit={handleSubmit}
        isSubmitting={
          updateNotification.isPending
        }
      />
    </div>
  );
}

export default EditNotification;
