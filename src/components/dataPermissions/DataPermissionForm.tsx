import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  DataPermission,
  DataPermissionScope,
  DataAccessLevel,
  DataPermissionStatus,
} from "../../types/dataPermission";

export interface DataPermissionFormData {
  permissionCode: string;
  permissionName: string;

  roleId: number;
  roleName: string;

  scope: DataPermissionScope;
  accessLevel: DataAccessLevel;

  tenantName: string;
  organizationName: string;

  description: string;
  status: DataPermissionStatus;
}

interface DataPermissionFormProps {
  initialData?: DataPermission;

  submitText: string;

  isSubmitting?: boolean;

  onSubmit: (
    data: DataPermissionFormData
  ) => void;
}

function DataPermissionForm({
  initialData,
  submitText,
  isSubmitting = false,
  onSubmit,
}: DataPermissionFormProps) {
  const [
    permissionCode,
    setPermissionCode,
  ] = useState("");

  const [
    permissionName,
    setPermissionName,
  ] = useState("");

  const [roleId, setRoleId] =
    useState(1);

  const [roleName, setRoleName] =
    useState("Super Admin");

  const [scope, setScope] =
    useState<DataPermissionScope>(
      "Platform"
    );

  const [
    accessLevel,
    setAccessLevel,
  ] = useState<DataAccessLevel>(
    "Full Access"
  );

  const [
    tenantName,
    setTenantName,
  ] = useState("All Tenants");

  const [
    organizationName,
    setOrganizationName,
  ] = useState(
    "All Organizations"
  );

  const [
    description,
    setDescription,
  ] = useState("");

  const [status, setStatus] =
    useState<DataPermissionStatus>(
      "Active"
    );

  useEffect(() => {
    if (!initialData) return;

    setPermissionCode(
      initialData.permissionCode
    );

    setPermissionName(
      initialData.permissionName
    );

    setRoleId(
      initialData.roleId
    );

    setRoleName(
      initialData.roleName
    );

    setScope(
      initialData.scope
    );

    setAccessLevel(
      initialData.accessLevel
    );

    setTenantName(
      initialData.tenantName
    );

    setOrganizationName(
      initialData.organizationName
    );

    setDescription(
      initialData.description
    );

    setStatus(
      initialData.status
    );
  }, [initialData]);

  function handleRoleChange(
    value: string
  ) {
    const roles = [
      {
        id: 1,
        name: "Super Admin",
      },
      {
        id: 2,
        name: "Tenant Admin",
      },
      {
        id: 3,
        name: "Organization Admin",
      },
      {
        id: 4,
        name: "Manager",
      },
      {
        id: 5,
        name: "User",
      },
      {
        id: 6,
        name: "Auditor",
      },
    ];

    const selectedRole =
      roles.find(
        (role) =>
          role.id === Number(value)
      );

    if (!selectedRole) return;

    setRoleId(selectedRole.id);
    setRoleName(
      selectedRole.name
    );
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    onSubmit({
      permissionCode:
        permissionCode.trim(),

      permissionName:
        permissionName.trim(),

      roleId,
      roleName,

      scope,
      accessLevel,

      tenantName:
        tenantName.trim(),

      organizationName:
        organizationName.trim(),

      description:
        description.trim(),

      status,
    });
  }

  return (
    <form
      className="data-permission-form-card"
      onSubmit={handleSubmit}
    >
      <div className="data-permission-form-header">
        <h2>
          Data Permission Information
        </h2>

        <p>
          Configure role-based data
          access, scope and access level.
        </p>
      </div>

      <div className="data-permission-form-body">
        <div className="data-permission-form-grid">

          {/* Code */}

          <div className="data-permission-form-group">
            <label htmlFor="permissionCode">
              Permission Code
            </label>

            <input
              id="permissionCode"
              type="text"
              placeholder="DPR009"
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

          {/* Name */}

          <div className="data-permission-form-group">
            <label htmlFor="permissionName">
              Permission Name *
            </label>

            <input
              id="permissionName"
              type="text"
              placeholder="Example: Tenant Read Access"
              value={permissionName}
              onChange={(event) =>
                setPermissionName(
                  event.target.value
                )
              }
              required
            />
          </div>

          {/* Role */}

          <div className="data-permission-form-group">
            <label htmlFor="role">
              Role *
            </label>

            <select
              id="role"
              value={roleId}
              onChange={(event) =>
                handleRoleChange(
                  event.target.value
                )
              }
            >
              <option value={1}>
                Super Admin
              </option>

              <option value={2}>
                Tenant Admin
              </option>

              <option value={3}>
                Organization Admin
              </option>

              <option value={4}>
                Manager
              </option>

              <option value={5}>
                User
              </option>

              <option value={6}>
                Auditor
              </option>
            </select>
          </div>

          {/* Scope */}

          <div className="data-permission-form-group">
            <label htmlFor="scope">
              Data Scope *
            </label>

            <select
              id="scope"
              value={scope}
              onChange={(event) =>
                setScope(
                  event.target
                    .value as DataPermissionScope
                )
              }
            >
              <option value="Platform">
                Platform
              </option>

              <option value="Tenant">
                Tenant
              </option>

              <option value="Organization">
                Organization
              </option>

              <option value="Department">
                Department
              </option>

              <option value="Own Records">
                Own Records
              </option>
            </select>
          </div>

          {/* Access */}

          <div className="data-permission-form-group">
            <label htmlFor="accessLevel">
              Access Level *
            </label>

            <select
              id="accessLevel"
              value={accessLevel}
              onChange={(event) =>
                setAccessLevel(
                  event.target
                    .value as DataAccessLevel
                )
              }
            >
              <option value="Read">
                Read
              </option>

              <option value="Write">
                Write
              </option>

              <option value="Full Access">
                Full Access
              </option>
            </select>
          </div>

          {/* Status */}

          <div className="data-permission-form-group">
            <label htmlFor="status">
              Status *
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as DataPermissionStatus
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

          {/* Tenant */}

          <div className="data-permission-form-group">
            <label htmlFor="tenantName">
              Tenant *
            </label>

            <input
              id="tenantName"
              type="text"
              placeholder="Example: Acme Corporation"
              value={tenantName}
              onChange={(event) =>
                setTenantName(
                  event.target.value
                )
              }
              required
            />
          </div>

          {/* Organization */}

          <div className="data-permission-form-group">
            <label htmlFor="organizationName">
              Organization *
            </label>

            <input
              id="organizationName"
              type="text"
              placeholder="Example: Acme India Pvt Ltd"
              value={
                organizationName
              }
              onChange={(event) =>
                setOrganizationName(
                  event.target.value
                )
              }
              required
            />
          </div>

          {/* Description */}

          <div className="data-permission-form-group data-permission-description-group">
            <label htmlFor="description">
              Description *
            </label>

            <textarea
              id="description"
              rows={5}
              placeholder="Describe the data access provided by this permission..."
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

        <div className="data-permission-form-actions">
          <button
            type="submit"
            className="data-permission-submit-button"
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

export default DataPermissionForm;
