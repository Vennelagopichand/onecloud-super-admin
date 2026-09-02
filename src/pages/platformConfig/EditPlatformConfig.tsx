import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PlatformConfigForm, {
  type PlatformConfigFormData,
} from "../../components/platformConfig/PlatformConfigForm";

import { usePlatformConfig } from "../../hooks/platformConfig/usePlatformConfig";
import { useUpdatePlatformConfig } from "../../hooks/platformConfig/useUpdatePlatformConfig";

function EditPlatformConfig() {
  const navigate = useNavigate();
  const { id } = useParams();

  const configId = Number(id);

  const {
    data: config,
    isLoading,
    isError,
  } = usePlatformConfig(configId);

  const updateConfig =
    useUpdatePlatformConfig();

  function handleSubmit(
    data: PlatformConfigFormData
  ) {
    updateConfig.mutate(
      {
        id: configId,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            `/platform-config/${configId}`
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading configuration...
      </div>
    );
  }

  if (isError || !config) {
    return (
      <div className="config-empty">
        <h3>
          Configuration not found
        </h3>

        <p>
          The requested platform
          configuration does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="config-page">
      <div className="config-page-header">
        <div>
          <h1>
            Edit Platform Configuration
          </h1>

          <p>
            Update configuration settings
            and system values.
          </p>
        </div>

        <button
          type="button"
          className="platform-config-back-btn"
          onClick={() =>
            navigate(
              `/platform-config/${config.id}`
            )
          }
        >
          ← Back
        </button>
      </div>

      <div className="platform-config-form-card">
        <div className="platform-config-card-heading">
          <h3>
            Edit Configuration
          </h3>

          <p>
            Modify the information below
            and save your changes.
          </p>
        </div>

        <PlatformConfigForm
          initialData={config}
          submitText="Update Configuration"
          onSubmit={handleSubmit}
          isSubmitting={
            updateConfig.isPending
          }
        />
      </div>
    </div>
  );
}

export default EditPlatformConfig;
