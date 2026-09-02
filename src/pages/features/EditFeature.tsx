import { useNavigate, useParams } from "react-router-dom";
import FeatureForm, {
  type FeatureFormData,
} from "../../components/features/FeatureForm";
import { useFeature } from "../../hooks/features/useFeature";
import { useUpdateFeature } from "../../hooks/features/useUpdateFeature";

function EditFeature() {
  const navigate = useNavigate();
  const { id } = useParams();
  const featureId = Number(id);

  const {
    data: feature,
    isLoading,
    isError,
  } = useFeature(featureId);

  const updateFeature = useUpdateFeature();

  function handleSubmit(data: FeatureFormData) {
    updateFeature.mutate(
      {
        id: featureId,
        data,
      },
      {
        onSuccess: () => {
          navigate(`/features/${featureId}`);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading feature...
      </div>
    );
  }

  if (isError || !feature) {
    return (
      <div className="feature-empty">
        <h3>Feature not found</h3>
        <p>The requested feature does not exist.</p>
      </div>
    );
  }

  return (
    <div className="feature-page">
      <div className="feature-page-header">
        <div>
          <h1>Edit Feature</h1>
          <p>
            Update feature configuration and availability.
          </p>
        </div>

        <button
          type="button"
          className="feature-back-btn"
          onClick={() =>
            navigate(`/features/${feature.id}`)
          }
        >
          ← Back
        </button>
      </div>

      <div className="feature-form-card">
        <div className="feature-card-heading">
          <h3>Edit Feature Information</h3>
          <p>
            Modify the details below and save your changes.
          </p>
        </div>

        <FeatureForm
          initialData={feature}
          submitText="Update Feature"
          onSubmit={handleSubmit}
          isSubmitting={updateFeature.isPending}
        />
      </div>
    </div>
  );
}

export default EditFeature;
