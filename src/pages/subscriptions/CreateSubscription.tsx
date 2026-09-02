import { useNavigate } from "react-router-dom";

import SubscriptionForm, {
  type SubscriptionFormData,
} from "../../components/subscriptions/SubscriptionForm";

import { useCreateSubscription } from "../../hooks/subscriptions/useCreateSubscription";

function CreateSubscription() {
  const navigate = useNavigate();
  const createSubscription = useCreateSubscription();

  const handleSubmit = (data: SubscriptionFormData) => {
    createSubscription.mutate(data, {
      onSuccess: (subscription) => {
        navigate(`/subscriptions/${subscription.id}`);
      },
    });
  };

  return (
    <div className="subscription-page">
      <div className="subscription-page-header">
        <div>
          <h1>Create Subscription</h1>
          <p>
            Assign a subscription plan and licenses
            to a tenant.
          </p>
        </div>

        <button
          type="button"
          className="subscription-back-btn"
          onClick={() => navigate("/subscriptions")}
        >
          ← Back
        </button>
      </div>

      <div className="subscription-form-card">
        <div className="subscription-card-heading">
          <h3>Subscription Information</h3>
          <p>
            Configure tenant, billing, license and
            validity details.
          </p>
        </div>

        <SubscriptionForm
          submitText="Create Subscription"
          onSubmit={handleSubmit}
          isSubmitting={createSubscription.isPending}
        />
      </div>
    </div>
  );
}

export default CreateSubscription;
