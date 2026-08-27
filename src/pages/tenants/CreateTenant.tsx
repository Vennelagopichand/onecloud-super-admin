import {
  useNavigate,
} from "react-router-dom";

import {
  useState,
} from "react";

import TenantForm from "../../components/tenants/TenantForm";
import Toast from "../../components/common/Toast";

import {
  useCreateTenant,
} from "../../hooks/useCreateTenant";

import type {
  CreateTenantInput,
} from "../../hooks/useCreateTenant";

function CreateTenant() {
  const navigate =
    useNavigate();

  const createTenant =
    useCreateTenant();

  const [success, setSuccess] =
    useState(false);

  const handleSubmit = (
    data: CreateTenantInput
  ) => {
    createTenant.mutate(data, {
      onSuccess: () => {
        setSuccess(true);

        window.setTimeout(() => {
          navigate("/tenants");
        }, 800);
      },
    });
  };

  return (
    <div className="create-tenant-page">
      {success && (
        <Toast
          message="Tenant created successfully"
          type="success"
        />
      )}

      <div className="page-header">
        <button
          className="back-button"
          onClick={() =>
            navigate("/tenants")
          }
        >
          ← Back to Tenants
        </button>

        <h1>
          Create New Tenant
        </h1>

        <p>
          Register a new tenant on
          the One Enterprise Cloud
          Platform.
        </p>
      </div>

      <div className="create-tenant-layout">
        <div className="tenant-form-card">
          <div className="form-card-header">
            <div>
              <h2>
                Tenant Information
              </h2>

              <p>
                Enter tenant and
                administrator details.
              </p>
            </div>

            <span className="required-note">
              * Required fields
            </span>
          </div>

          <TenantForm
            onSubmit={
              handleSubmit
            }
            onCancel={() =>
              navigate(
                "/tenants"
              )
            }
            isSubmitting={
              createTenant.isPending
            }
            serverError={
              createTenant.error
                ?.message
            }
          />
        </div>

        <aside className="create-help-card">
          <div className="help-icon">
            i
          </div>

          <h3>
            Creating a Tenant
          </h3>

          <p>
            Each tenant receives a
            unique code and
            administrator account.
          </p>

          <ul>
            <li>
              Tenant code must be
              unique.
            </li>

            <li>
              Admin email must be
              valid.
            </li>

            <li>
              Select an appropriate
              subscription plan.
            </li>

            <li>
              Status can be changed
              later.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default CreateTenant;
