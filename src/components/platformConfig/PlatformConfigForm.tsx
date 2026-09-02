import { useState } from "react";

import type {
  ConfigCategory,
  ConfigEnvironment,
  ConfigStatus,
  PlatformConfig,
} from "../../types/platformConfig";

export interface PlatformConfigFormData {
  configCode: string;
  configName: string;
  category: ConfigCategory;
  environment: ConfigEnvironment;
  configValue: string;
  description: string;
  status: ConfigStatus;
}

interface PlatformConfigFormProps {
  initialData?: PlatformConfig;
  submitText: string;
  onSubmit: (data: PlatformConfigFormData) => void;
  isSubmitting?: boolean;
}

function PlatformConfigForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: PlatformConfigFormProps) {
  const [form, setForm] = useState<PlatformConfigFormData>({
    configCode: initialData?.configCode ?? "",
    configName: initialData?.configName ?? "",
    category: initialData?.category ?? "General",
    environment: initialData?.environment ?? "All",
    configValue: initialData?.configValue ?? "",
    description: initialData?.description ?? "",
    status: initialData?.status ?? "Active",
  });

  function updateField<K extends keyof PlatformConfigFormData>(
    field: K,
    value: PlatformConfigFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.configName.trim()) {
      return;
    }

    if (!form.configValue.trim()) {
      return;
    }

    onSubmit({
      ...form,
      configCode: form.configCode.trim(),
      configName: form.configName.trim(),
      configValue: form.configValue.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <form
      className="platform-config-form"
      onSubmit={handleSubmit}
    >
      <div className="platform-config-form-grid">
        <div className="platform-config-field">
          <label>Configuration Code</label>

          <input
            type="text"
            value={form.configCode}
            placeholder="Example: CFG009"
            onChange={(event) =>
              updateField(
                "configCode",
                event.target.value
              )
            }
          />
        </div>

        <div className="platform-config-field">
          <label>Configuration Name *</label>

          <input
            required
            type="text"
            value={form.configName}
            placeholder="Enter configuration name"
            onChange={(event) =>
              updateField(
                "configName",
                event.target.value
              )
            }
          />
        </div>

        <div className="platform-config-field">
          <label>Category</label>

          <select
            value={form.category}
            onChange={(event) =>
              updateField(
                "category",
                event.target.value as ConfigCategory
              )
            }
          >
            <option value="General">
              General
            </option>

            <option value="Security">
              Security
            </option>

            <option value="Email">
              Email
            </option>

            <option value="Storage">
              Storage
            </option>

            <option value="Localization">
              Localization
            </option>

            <option value="System">
              System
            </option>
          </select>
        </div>

        <div className="platform-config-field">
          <label>Environment</label>

          <select
            value={form.environment}
            onChange={(event) =>
              updateField(
                "environment",
                event.target.value as ConfigEnvironment
              )
            }
          >
            <option value="All">
              All
            </option>

            <option value="Production">
              Production
            </option>

            <option value="Staging">
              Staging
            </option>

            <option value="Development">
              Development
            </option>
          </select>
        </div>

        <div className="platform-config-field">
          <label>Status</label>

          <select
            value={form.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value as ConfigStatus
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

        <div className="platform-config-field">
          <label>Configuration Value *</label>

          <input
            required
            type="text"
            value={form.configValue}
            placeholder="Enter configuration value"
            onChange={(event) =>
              updateField(
                "configValue",
                event.target.value
              )
            }
          />
        </div>

        <div className="platform-config-field platform-config-field-full">
          <label>Description</label>

          <textarea
            value={form.description}
            placeholder="Enter configuration description"
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
          />
        </div>
      </div>

      <div className="platform-config-form-actions">
        <button
          type="button"
          className="platform-config-cancel-btn"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="platform-config-submit-btn"
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

export default PlatformConfigForm;
