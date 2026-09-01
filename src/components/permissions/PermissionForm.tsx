import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Permission,
  PermissionAction,
  PermissionModule,
  PermissionStatus,
} from "../../types/permission";

export interface PermissionFormData {
  permissionCode: string;
  permissionName: string;
  module: PermissionModule;
  action: PermissionAction;
  description: string;
  status: PermissionStatus;
}

interface PermissionFormProps {
  initialData?: Permission;
  submitText: string;
  isSubmitting?: boolean;
  onSubmit: (data: PermissionFormData) => void;
}

function PermissionForm({
  initialData,
  submitText,
  isSubmitting = false,
  onSubmit,
}: PermissionFormProps) {
  const [permissionCode, setPermissionCode] =
    useState("");

  const [permissionName, setPermissionName] =
    useState("");

  const [module, setModule] =
    useState<PermissionModule>("Dashboard");

  const [action, setAction] =
    useState<PermissionAction>("View");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<PermissionStatus>("Active");

  useEffect(() => {
    if (!initialData) return;

    setPermissionCode(
      initialData.permissionCode
    );

    setPermissionName(
      initialData.permissionName
    );

    setModule(initialData.module);

    setAction(initialData.action);

    setDescription(
      initialData.description
    );

    setStatus(initialData.status);
  }, [initialData]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    onSubmit({
      permissionCode:
        permissionCode.trim(),

      permissionName:
        permissionName.trim(),

      module,

      action,

      description:
        description.trim(),

      status,
    });
  }

  return (
    <form
      className="permission-form-card"
      onSubmit={handleSubmit}
    >
      <div className="permission-form-header">
        <h2>
          Permission Information
        </h2>

        <p>
          Configure the permission name,
          module, action and status.
        </p>
      </div>

      <div className="permission-form-body">
        <div className="permission-form-grid">

          {/* Permission Code */}
          <div className="permission-form-group">
            <label htmlFor="permissionCode">
              Permission Code
            </label>

            <input
              id="permissionCode"
              type="text"
              placeholder="PER013"
              value={permissionCode}
              onChange={(event) =>
                setPermissionCode(
                  event.target.value
                )
              }
            />

            <small>
              Leave empty to generate
              automatically.
            </small>
          </div>

          {/* Permission Name */}
          <div className="permission-form-group">
            <label htmlFor="permissionName">
              Permission Name *
            </label>

            <input
              id="permissionName"
              type="text"
              placeholder="Example: Create User"
              value={permissionName}
              onChange={(event) =>
                setPermissionName(
                  event.target.value
                )
              }
              required
            />
          </div>

          {/* Module */}
          <div className="permission-form-group">
            <label htmlFor="module">
              Module *
            </label>

            <select
              id="module"
              value={module}
              onChange={(event) =>
                setModule(
                  event.target
                    .value as PermissionModule
                )
              }
              required
            >
              <option value="Dashboard">
                Dashboard
              </option>

              <option value="Tenant Management">
                Tenant Management
              </option>

              <option value="Organization Management">
                Organization Management
              </option>

              <option value="User Management">
                User Management
              </option>

              <option value="Role Management">
                Role Management
              </option>

              <option value="Permission Management">
                Permission Management
              </option>

              <option value="Data Permissions">
                Data Permissions
              </option>

              <option value="Feature Management">
                Feature Management
              </option>

              <option value="Subscription & License">
                Subscription & License
              </option>

              <option value="Platform Configuration">
                Platform Configuration
              </option>

              <option value="Security">
                Security
              </option>

              <option value="Audit Logs">
                Audit Logs
              </option>

              <option value="Notifications">
                Notifications
              </option>

              <option value="Monitoring">
                Monitoring
              </option>
            </select>
          </div>

          {/* Action */}
          <div className="permission-form-group">
            <label htmlFor="action">
              Action *
            </label>

            <select
              id="action"
              value={action}
              onChange={(event) =>
                setAction(
                  event.target
                    .value as PermissionAction
                )
              }
              required
            >
              <option value="View">
                View
              </option>

              <option value="Create">
                Create
              </option>

              <option value="Edit">
                Edit
              </option>

              <option value="Delete">
                Delete
              </option>

              <option value="Manage">
                Manage
              </option>
            </select>
          </div>

          {/* Status */}
          <div className="permission-form-group">
            <label htmlFor="status">
              Status *
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as PermissionStatus
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

          {/* Description */}
          <div className="permission-form-group permission-description-group">
            <label htmlFor="description">
              Description *
            </label>

            <textarea
              id="description"
              rows={5}
              placeholder="Enter permission description..."
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              required
            />
          </div>
        </div>

        <div className="permission-form-actions">
          <button
            type="submit"
            className="permission-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : submitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PermissionForm;
