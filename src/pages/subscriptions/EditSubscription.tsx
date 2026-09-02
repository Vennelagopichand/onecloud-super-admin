import {
  useNavigate,
  useParams,
} from "react-router-dom";

import SubscriptionForm, {
  type SubscriptionFormData,
} from "../../components/subscriptions/SubscriptionForm";

import { useSubscription } from "../../hooks/subscriptions/useSubscription";
import { useUpdateSubscription } from "../../hooks/subscriptions/useUpdateSubscription";

function EditSubscription() {
  const navigate = useNavigate();
  const { id } = useParams();

  const subscriptionId = Number(id);

  const {
    data: subscription,
    isLoading,
    isError,
  } = useSubscription(subscriptionId);

  const updateSubscription =
    useUpdateSubscription();

  function handleSubmit(
    data: SubscriptionFormData
  ) {
    updateSubscription.mutate(
      {
        id: subscriptionId,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            `/subscriptions/${subscriptionId}`
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading subscription...
      </div>
    );
  }

  if (isError || !subscription) {
    return (
      <div className="subscription-empty">
        <h3>Subscription not found</h3>

        <p>
          The requested subscription
          does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      <div className="subscription-page-header">
        <div>
          <h1>Edit Subscription</h1>

          <p>
            Update subscription, billing
            and license information.
          </p>
        </div>

        <button
          type="button"
          className="subscription-back-btn"
          onClick={() =>
            navigate(
              `/subscriptions/${subscription.id}`
            )
          }
        >
          ← Back
        </button>
      </div>

      <div className="subscription-form-card">
        <div className="subscription-card-heading">
          <h3>
            Edit Subscription Information
          </h3>

          <p>
            Modify the information below
            and save your changes.
          </p>
        </div>

        <SubscriptionForm
          initialData={subscription}
          submitText="Update Subscription"
          onSubmit={handleSubmit}
          isSubmitting={
            updateSubscription.isPending
          }
        />
      </div>
    </div>
  );
}

export default EditSubscription;
