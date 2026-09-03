import { useNavigate } from "react-router-dom";

import NotificationForm from "../../components/notifications/NotificationForm";

import type { NotificationFormData } from "../../components/notifications/NotificationForm";

import { useCreateNotification } from "../../hooks/notifications/useCreateNotification";

function CreateNotification() {
  const navigate = useNavigate();

  const createNotification =
    useCreateNotification();

  function handleSubmit(
    data: NotificationFormData
  ) {
    createNotification.mutate(data, {
      onSuccess: (notification) => {
        navigate(
          `/notifications/${notification.id}`
        );
      },
    });
  }

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <div>
          <h1>Create Notification</h1>

          <p>
            Create a new platform notification
            or announcement.
          </p>
        </div>
      </div>

      <NotificationForm
        submitText="Create Notification"
        onSubmit={handleSubmit}
        isSubmitting={
          createNotification.isPending
        }
      />
    </div>
  );
}

export default CreateNotification;
