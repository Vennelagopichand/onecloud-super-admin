import { useState } from "react";

import type {
  SecurityCategory,
  SecurityPolicy,
  SecuritySeverity,
  SecurityStatus,
} from "../../types/security";

export interface SecurityFormData {
  policyCode: string;
  policyName: string;
  category: SecurityCategory;
  severity: SecuritySeverity;
  policyValue: string;
  description: string;
  status: SecurityStatus;
}

interface SecurityFormProps {
  initialData?: SecurityPolicy;
  submitText: string;
  onSubmit: (data: SecurityFormData) => void;
  isSubmitting?: boolean;
}

function SecurityForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: SecurityFormProps) {
  const [form, setForm] = useState<SecurityFormData>({
    policyCode: initialData?.policyCode ?? "",
    policyName: initialData?.policyName ?? "",
    category: initialData?.category ?? "Authentication",
    severity: initialData?.severity ?? "Medium",
    policyValue: initialData?.policyValue ?? "",
    description: initialData?.description ?? "",
    status: initialData?.status ?? "Active",
  });

  const [error, setError] = useState("");

  function updateField(
    field: keyof SecurityFormData,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.policyName.trim()) {
      setError("Policy name is required.");
      return;
    }

    if (!form.policyValue.trim()) {
      setError("Policy value is required.");
      return;
    }

    setError("");

    onSubmit({
      ...form,
      policyCode: form.policyCode.trim(),
      policyName: form.policyName.trim(),
      policyValue: form.policyValue.trim(),
      description: form.description.trim(),
    });
  }

  return (
    <form
      className="security-form-card"
      onSubmit={handleSubmit}
    >
      <div className="security-form-header">
        <h2>Policy Information</h2>
        <p>Configure the security policy settings.</p>
      </div>

      {error && (
        <div className="security-form-error">
          {error}
        </div>
      )}

      <div className="security-form-grid">
        <div className="security-form-group">
          <label>Policy Code</label>
          <input
            value={form.policyCode}
            onChange={(e) =>
              updateField("policyCode", e.target.value)
            }
            placeholder="Auto generated if empty"
          />
        </div>

        <div className="security-form-group">
          <label>Policy Name *</label>
          <input
            value={form.policyName}
            onChange={(e) =>
              updateField("policyName", e.target.value)
            }
            placeholder="Enter policy name"
          />
        </div>

        <div className="security-form-group">
          <label>Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              updateField("category", e.target.value)
            }
          >
            <option value="Authentication">
              Authentication
            </option>
            <option value="Password">Password</option>
            <option value="Session">Session</option>
            <option value="Access Control">
              Access Control
            </option>
            <option value="Network">Network</option>
            <option value="Compliance">Compliance</option>
          </select>
        </div>

        <div className="security-form-group">
          <label>Severity</label>
          <select
            value={form.severity}
            onChange={(e) =>
              updateField("severity", e.target.value)
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="security-form-group">
          <label>Policy Value *</label>
          <input
            value={form.policyValue}
            onChange={(e) =>
              updateField("policyValue", e.target.value)
            }
            placeholder="Example: Required"
          />
        </div>

        <div className="security-form-group">
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value)
            }
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="security-form-group security-form-full">
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) =>
              updateField("description", e.target.value)
            }
            placeholder="Enter policy description"
            rows={5}
          />
        </div>
      </div>

      <div className="security-form-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}

export default SecurityForm;
