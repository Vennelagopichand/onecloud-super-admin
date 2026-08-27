import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useState,
} from "react";

import EditTenantForm from "../../components/tenants/EditTenantForm";
import Toast from "../../components/common/Toast";

import {
  useTenant,
} from "../../hooks/useTenant";

import {
  useUpdateTenant,
} from "../../hooks/useUpdateTenant";

import type {
  UpdateTenantInput,
} from "../../hooks/useUpdateTenant";

function EditTenant() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const tenantId =
    Number(id);

  const {
    data: tenant,
    isLoading,
    isError,
    error,
  } = useTenant(tenantId);

  const updateTenant =
    useUpdateTenant();

  const [success, setSuccess] =
    useState(false);

  if (
    !id ||
    Number.isNaN(tenantId)
  ) {
    return (
      <div className="error-state">
        Invalid tenant ID.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading tenant...
      </div>
    );
  }

  if (
    isError ||
    !tenant
  ) {
    return (
      <div className="error-state">
        {error instanceof Error
          ? error.message
          : "Unable to load tenant."}
      </div>
    );
  }

  const handleSubmit = (
    data: UpdateTenantInput
  ) => {
    updateTenant.mutate(data, {
      onSuccess: (
        updatedTenant
      ) => {
        setSuccess(true);

        window.setTimeout(() => {
          navigate(
            `/tenants/${updatedTenant.id}`
          );
        }, 800);
      },
    });
  };

  return (
    <div className="edit-tenant-page">
      {success && (
        <Toast
          message="Tenant updated successfully"
          type="success"
        />
      )}

      <div className="page-header">
        <button
          className="back-button"
          onClick={() =>
            navigate(
              `/tenants/${tenant.id}`
            )
          }
        >
          ← Back to Tenant Details
        </button>

        <h1>Edit Tenant</h1>

        <p>
          Update tenant account,
          administrator and
          subscription information.
        </p>
      </div>

      <div className="edit-tenant-layout">
        <div className="tenant-form-card">
          <div className="form-card-header">
            <div>
              <h2>
                Tenant Information
              </h2>

              <p>
                Update the tenant's
                current information.
              </p>
            </div>

            <span className="edit-code-badge">
              {tenant.tenantCode}
            </span>
          </div>

          <EditTenantForm
            tenant={tenant}
            onSubmit={
              handleSubmit
            }
            onCancel={() =>
              navigate(
                `/tenants/${tenant.id}`
              )
            }
            isSubmitting={
              updateTenant.isPending
            }
            serverError={
              updateTenant.error
                ?.message
            }
          />
        </div>

        <aside className="edit-summary-card">
          <div className="edit-summary-icon">
            {tenant.tenantName
              .charAt(0)
              .toUpperCase()}
          </div>

          <h3>
            {tenant.tenantName}
          </h3>

          <span className="edit-summary-code">
            {tenant.tenantCode}
          </span>

          <div className="edit-summary-list">
            <div>
              <span>
                Current Plan
              </span>

              <strong>
                {
                  tenant.subscription
                }
              </strong>
            </div>

            <div>
              <span>Status</span>

              <strong>
                {tenant.status}
              </strong>
            </div>

            <div>
              <span>Users</span>

              <strong>
                {tenant.users}
              </strong>
            </div>

            <div>
              <span>Created</span>

              <strong>
                {tenant.createdAt}
              </strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EditTenant;
