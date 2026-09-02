import { useNavigate } from "react-router-dom";
import FeatureForm, {
  type FeatureFormData,
} from "../../components/features/FeatureForm";
import { useCreateFeature } from "../../hooks/features/useCreateFeature";

function CreateFeature() {
  const navigate = useNavigate();
  const createFeature = useCreateFeature();

  function handleSubmit(data: FeatureFormData) {
    createFeature.mutate(data, {
      onSuccess: (feature) => {
        navigate(`/features/${feature.id}`);
      },
    });
  }

  return (
    <div className="feature-page">
      <div className="feature-page-header">
        <div>
          <h1>Create Feature</h1>
          <p>
            Add a new feature to the OneCloud platform.
          </p>
        </div>

        <button
          type="button"
          className="feature-back-btn"
          onClick={() => navigate("/features")}
        >
          ← Back
        </button>
      </div>

      <div className="feature-form-card">
        <div className="feature-card-heading">
          <h3>Feature Information</h3>
          <p>
            Configure the feature, subscription plan and
            availability.
          </p>
        </div>

        <FeatureForm
          submitText="Create Feature"
          onSubmit={handleSubmit}
          isSubmitting={createFeature.isPending}
        />
      </div>
    </div>
  );
}

export default CreateFeature;
