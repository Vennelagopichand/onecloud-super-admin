import { useNavigate } from "react-router-dom";

import PlatformConfigForm, {
  type PlatformConfigFormData,
} from "../../components/platformConfig/PlatformConfigForm";

import { useCreatePlatformConfig } from "../../hooks/platformConfig/useCreatePlatformConfig";

function CreatePlatformConfig() {
  const navigate = useNavigate();
  const createConfig =
    useCreatePlatformConfig();

  function handleSubmit(
    data: PlatformConfigFormData
  ) {
    createConfig.mutate(data, {
      onSuccess: (config) => {
        navigate(
          `/platform-config/${config.id}`
        );
      },
    });
  }

  return (
    <div className="config-page">
      <div className="config-page-header">
        <div>
          <h1>
            Add Platform Configuration
          </h1>

          <p>
            Create a new global platform
            configuration setting.
          </p>
        </div>

        <button
          type="button"
          className="platform-config-back-btn"
          onClick={() =>
            navigate("/platform-config")
          }
        >
          ← Back
        </button>
      </div>

      <div className="platform-config-form-card">
        <div className="platform-config-card-heading">
          <h3>
            Configuration Information
          </h3>

          <p>
            Configure category,
            environment, value and status.
          </p>
        </div>

        <PlatformConfigForm
          submitText="Create Configuration"
          onSubmit={handleSubmit}
          isSubmitting={
            createConfig.isPending
          }
        />
      </div>
    </div>
  );
}

export default CreatePlatformConfig;
