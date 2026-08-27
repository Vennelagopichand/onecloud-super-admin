import {
  useState,
  type FormEvent,
} from "react";

import type {
  SubscriptionPlan,
  Tenant,
  TenantStatus,
} from "../../types/tenant";

import type {
  UpdateTenantInput,
} from "../../hooks/useUpdateTenant";

interface EditTenantFormProps {
  tenant: Tenant;

  onSubmit: (
    data: UpdateTenantInput
  ) => void;

  onCancel: () => void;

  isSubmitting?: boolean;
  serverError?: string;
}

interface FormErrors {
  tenantName?: string;
  tenantCode?: string;
  adminName?: string;
  adminEmail?: string;
  phone?: string;
}

function EditTenantForm({
  tenant,
  onSubmit,
  onCancel,
  isSubmitting = false,
  serverError,
}: EditTenantFormProps) {
  const [tenantName, setTenantName] =
    useState(tenant.tenantName);

  const [tenantCode, setTenantCode] =
    useState(tenant.tenantCode);

  const [adminName, setAdminName] =
    useState(tenant.adminName);

  const [adminEmail, setAdminEmail] =
    useState(tenant.adminEmail);

  const [phone, setPhone] =
    useState(tenant.phone);

  const [subscription, setSubscription] =
    useState<SubscriptionPlan>(
      tenant.subscription
    );

  const [country, setCountry] =
    useState(tenant.country);

  const [timeZone, setTimeZone] =
    useState(tenant.timeZone);

  const [status, setStatus] =
    useState<TenantStatus>(
      tenant.status
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!tenantName.trim()) {
      newErrors.tenantName =
        "Tenant name is required";
    }

    if (!tenantCode.trim()) {
      newErrors.tenantCode =
        "Tenant code is required";
    }

    if (!adminName.trim()) {
      newErrors.adminName =
        "Admin name is required";
    }

    if (!adminEmail.trim()) {
      newErrors.adminEmail =
        "Admin email is required";
    } else {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          adminEmail
        )
      ) {
        newErrors.adminEmail =
          "Enter a valid email address";
      }
    }

    if (
      phone.trim() &&
      !/^[0-9+\-\s]{7,15}$/.test(
        phone
      )
    ) {
      newErrors.phone =
        "Enter a valid phone number";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      id: tenant.id,

      tenantName:
        tenantName.trim(),

      tenantCode:
        tenantCode
          .trim()
          .toUpperCase(),

      adminName:
        adminName.trim(),

      adminEmail:
        adminEmail.trim(),

      phone:
        phone.trim(),

      subscription,
      country,
      timeZone,
      status,
    });
  };

  return (
    <form
      className="tenant-form"
      onSubmit={handleSubmit}
    >
      {serverError && (
        <div className="form-server-error">
          {serverError}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label>
            Tenant Name
            <span>*</span>
          </label>

          <input
            type="text"
            value={tenantName}
            onChange={(event) => {
              setTenantName(
                event.target.value
              );

              if (
                errors.tenantName
              ) {
                setErrors({
                  ...errors,
                  tenantName:
                    undefined,
                });
              }
            }}
          />

          {errors.tenantName && (
            <small className="field-error">
              {errors.tenantName}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Tenant Code
            <span>*</span>
          </label>

          <input
            type="text"
            value={tenantCode}
            maxLength={10}
            onChange={(event) => {
              setTenantCode(
                event.target.value
              );

              if (
                errors.tenantCode
              ) {
                setErrors({
                  ...errors,
                  tenantCode:
                    undefined,
                });
              }
            }}
          />

          {errors.tenantCode && (
            <small className="field-error">
              {errors.tenantCode}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Admin Name
            <span>*</span>
          </label>

          <input
            type="text"
            value={adminName}
            onChange={(event) => {
              setAdminName(
                event.target.value
              );

              if (
                errors.adminName
              ) {
                setErrors({
                  ...errors,
                  adminName:
                    undefined,
                });
              }
            }}
          />

          {errors.adminName && (
            <small className="field-error">
              {errors.adminName}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Admin Email
            <span>*</span>
          </label>

          <input
            type="email"
            value={adminEmail}
            onChange={(event) => {
              setAdminEmail(
                event.target.value
              );

              if (
                errors.adminEmail
              ) {
                setErrors({
                  ...errors,
                  adminEmail:
                    undefined,
                });
              }
            }}
          />

          {errors.adminEmail && (
            <small className="field-error">
              {errors.adminEmail}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Phone
          </label>

          <input
            type="text"
            value={phone}
            onChange={(event) => {
              setPhone(
                event.target.value
              );

              if (errors.phone) {
                setErrors({
                  ...errors,
                  phone:
                    undefined,
                });
              }
            }}
          />

          {errors.phone && (
            <small className="field-error">
              {errors.phone}
            </small>
          )}
        </div>

        <div className="form-group">
          <label>
            Subscription
            <span>*</span>
          </label>

          <select
            value={subscription}
            onChange={(event) =>
              setSubscription(
                event.target
                  .value as SubscriptionPlan
              )
            }
          >
            <option value="Enterprise">
              Enterprise
            </option>

            <option value="Pro">
              Pro
            </option>

            <option value="Basic">
              Basic
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Country
          </label>

          <select
            value={country}
            onChange={(event) =>
              setCountry(
                event.target.value
              )
            }
          >
            <option value="India">
              India
            </option>

            <option value="United States">
              United States
            </option>

            <option value="United Kingdom">
              United Kingdom
            </option>

            <option value="Singapore">
              Singapore
            </option>

            <option value="Australia">
              Australia
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Time Zone
          </label>

          <select
            value={timeZone}
            onChange={(event) =>
              setTimeZone(
                event.target.value
              )
            }
          >
            <option value="Asia/Kolkata">
              Asia/Kolkata
            </option>

            <option value="Asia/Singapore">
              Asia/Singapore
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

            <option value="Australia/Sydney">
              Australia/Sydney
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as TenantStatus
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
      </div>

      <div className="tenant-form-actions">
        <button
          type="button"
          className="secondary-button"
          disabled={isSubmitting}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-button form-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Updating..."
            : "Update Tenant"}
        </button>
      </div>
    </form>
  );
}

export default EditTenantForm;
