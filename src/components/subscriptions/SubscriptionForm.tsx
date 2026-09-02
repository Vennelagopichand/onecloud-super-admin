import { useState } from "react";
import type {
  BillingCycle,
  Subscription,
  SubscriptionPlan,
  SubscriptionStatus,
} from "../../types/subscription";

export interface SubscriptionFormData {
  subscriptionCode: string;
  tenantId: number;
  tenantName: string;
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  totalLicenses: number;
  usedLicenses: number;
  startDate: string;
  expiryDate: string;
  price: number;
  status: SubscriptionStatus;
}

interface SubscriptionFormProps {
  initialData?: Subscription;
  submitText: string;
  onSubmit: (data: SubscriptionFormData) => void;
  isSubmitting?: boolean;
}

function SubscriptionForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: SubscriptionFormProps) {
  const [form, setForm] = useState<SubscriptionFormData>({
    subscriptionCode: initialData?.subscriptionCode ?? "",
    tenantId: initialData?.tenantId ?? 0,
    tenantName: initialData?.tenantName ?? "",
    plan: initialData?.plan ?? "Basic",
    billingCycle: initialData?.billingCycle ?? "Monthly",
    totalLicenses: initialData?.totalLicenses ?? 0,
    usedLicenses: initialData?.usedLicenses ?? 0,
    startDate: initialData?.startDate ?? "",
    expiryDate: initialData?.expiryDate ?? "",
    price: initialData?.price ?? 0,
    status: initialData?.status ?? "Active",
  });

  function updateField<K extends keyof SubscriptionFormData>(
    field: K,
    value: SubscriptionFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!form.tenantName.trim()) return;

    if (form.usedLicenses > form.totalLicenses) {
      alert("Used licenses cannot exceed total licenses.");
      return;
    }

    onSubmit({
      ...form,
      subscriptionCode:
        form.subscriptionCode.trim(),
      tenantName: form.tenantName.trim(),
    });
  }

  return (
    <form
      className="subscription-form"
      onSubmit={handleSubmit}
    >
      <div className="subscription-form-grid">
        <div className="subscription-field">
          <label>Subscription Code</label>

          <input
            value={form.subscriptionCode}
            placeholder="Example: SUB009"
            onChange={(e) =>
              updateField(
                "subscriptionCode",
                e.target.value
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Tenant ID *</label>

          <input
            required
            min="1"
            type="number"
            value={form.tenantId || ""}
            placeholder="Enter tenant ID"
            onChange={(e) =>
              updateField(
                "tenantId",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Tenant Name *</label>

          <input
            required
            value={form.tenantName}
            placeholder="Enter tenant name"
            onChange={(e) =>
              updateField(
                "tenantName",
                e.target.value
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Subscription Plan</label>

          <select
            value={form.plan}
            onChange={(e) =>
              updateField(
                "plan",
                e.target.value as SubscriptionPlan
              )
            }
          >
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">
              Enterprise
            </option>
          </select>
        </div>

        <div className="subscription-field">
          <label>Billing Cycle</label>

          <select
            value={form.billingCycle}
            onChange={(e) =>
              updateField(
                "billingCycle",
                e.target.value as BillingCycle
              )
            }
          >
            <option value="Monthly">
              Monthly
            </option>
            <option value="Yearly">
              Yearly
            </option>
          </select>
        </div>

        <div className="subscription-field">
          <label>Status</label>

          <select
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",
                e.target.value as SubscriptionStatus
              )
            }
          >
            <option value="Active">
              Active
            </option>
            <option value="Suspended">
              Suspended
            </option>
            <option value="Expired">
              Expired
            </option>
          </select>
        </div>

        <div className="subscription-field">
          <label>Total Licenses *</label>

          <input
            required
            min="1"
            type="number"
            value={form.totalLicenses || ""}
            placeholder="Example: 500"
            onChange={(e) =>
              updateField(
                "totalLicenses",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Used Licenses</label>

          <input
            min="0"
            type="number"
            value={form.usedLicenses}
            onChange={(e) =>
              updateField(
                "usedLicenses",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Start Date *</label>

          <input
            required
            type="text"
            value={form.startDate}
            placeholder="Example: 01 Sep 2026"
            onChange={(e) =>
              updateField(
                "startDate",
                e.target.value
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Expiry Date *</label>

          <input
            required
            type="text"
            value={form.expiryDate}
            placeholder="Example: 31 Aug 2027"
            onChange={(e) =>
              updateField(
                "expiryDate",
                e.target.value
              )
            }
          />
        </div>

        <div className="subscription-field">
          <label>Price (₹)</label>

          <input
            min="0"
            type="number"
            value={form.price || ""}
            placeholder="Example: 120000"
            onChange={(e) =>
              updateField(
                "price",
                Number(e.target.value)
              )
            }
          />
        </div>
      </div>

      <div className="subscription-form-actions">
        <button
          type="button"
          className="subscription-cancel-btn"
          onClick={() => history.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="subscription-submit-btn"
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

export default SubscriptionForm;
