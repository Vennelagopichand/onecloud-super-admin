import { useState } from "react";
import type {
  Feature,
  FeatureCategory,
  FeaturePlan,
  FeatureStatus,
} from "../../types/feature";

export interface FeatureFormData {
  featureCode: string;
  featureName: string;
  category: FeatureCategory;
  plan: FeaturePlan;
  description: string;
  status: FeatureStatus;
}

interface FeatureFormProps {
  initialData?: Feature;
  submitText: string;
  onSubmit: (data: FeatureFormData) => void;
  isSubmitting?: boolean;
}

function FeatureForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: FeatureFormProps) {
  const [form, setForm] = useState<FeatureFormData>({
    featureCode: initialData?.featureCode ?? "",
    featureName: initialData?.featureName ?? "",
    category: initialData?.category ?? "Core",
    plan: initialData?.plan ?? "Basic",
    description: initialData?.description ?? "",
    status: initialData?.status ?? "Enabled",
  });

  function updateField<K extends keyof FeatureFormData>(
    field: K,
    value: FeatureFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.featureName.trim()) return;

    onSubmit({
      ...form,
      featureCode: form.featureCode.trim(),
      featureName: form.featureName.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <form className="feature-form" onSubmit={handleSubmit}>
      <div className="feature-form-grid">
        <div className="feature-field">
          <label>Feature Code</label>
          <input
            value={form.featureCode}
            placeholder="Example: FEA009"
            onChange={(e) =>
              updateField("featureCode", e.target.value)
            }
          />
        </div>

        <div className="feature-field">
          <label>Feature Name *</label>
          <input
            required
            value={form.featureName}
            placeholder="Enter feature name"
            onChange={(e) =>
              updateField("featureName", e.target.value)
            }
          />
        </div>

        <div className="feature-field">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              updateField(
                "category",
                e.target.value as FeatureCategory
              )
            }
          >
            <option value="Core">Core</option>
            <option value="Security">Security</option>
            <option value="Analytics">Analytics</option>
            <option value="Integration">Integration</option>
            <option value="Communication">Communication</option>
            <option value="AI">AI</option>
          </select>
        </div>

        <div className="feature-field">
          <label>Subscription Plan</label>
          <select
            value={form.plan}
            onChange={(e) =>
              updateField(
                "plan",
                e.target.value as FeaturePlan
              )
            }
          >
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
            <option value="All Plans">All Plans</option>
          </select>
        </div>

        <div className="feature-field">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as FeatureStatus
              )
            }
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <div className="feature-field feature-field-full">
          <label>Description</label>
          <textarea
            rows={5}
            value={form.description}
            placeholder="Enter feature description"
            onChange={(e) =>
              updateField("description", e.target.value)
            }
          />
        </div>
      </div>

      <div className="feature-form-actions">
        <button
          type="button"
          className="feature-cancel-btn"
          onClick={() => history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="feature-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default FeatureForm;
