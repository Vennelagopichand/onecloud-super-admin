import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import type {
  Role,
  RoleStatus,
} from "../../types/role";

type RoleScope =
  | "Platform"
  | "Tenant"
  | "Organization";

interface RoleFormData {
  roleCode: string;
  roleName: string;
  description: string;
  scope: RoleScope;
  permissionsCount: number;
  status: RoleStatus;
}

interface RoleFormProps {
  initialData?: Role;
  submitText: string;
  isSubmitting?: boolean;
  onSubmit: (
    data: RoleFormData
  ) => void;
}

function RoleForm({
  initialData,
  submitText,
  isSubmitting = false,
  onSubmit,
}: RoleFormProps) {
  const [roleCode, setRoleCode] =
    useState("");

  const [roleName, setRoleName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [scope, setScope] =
    useState<RoleScope>(
      "Organization"
    );

  const [
    permissionsCount,
    setPermissionsCount,
  ] = useState(0);

  const [status, setStatus] =
    useState<RoleStatus>("Active");

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setRoleCode(
      initialData.roleCode
    );

    setRoleName(
      initialData.roleName
    );

    setDescription(
      initialData.description
    );

    setScope(
      initialData.scope
    );

    setPermissionsCount(
      initialData.permissionsCount
    );

    setStatus(
      initialData.status
    );
  }, [initialData]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    onSubmit({
      roleCode,
      roleName,
      description,
      scope,
      permissionsCount,
      status,
    });
  }

  return (
    <form
      className="role-form-card"
      onSubmit={handleSubmit}
    >
      <div className="role-form-header">
        <div>
          <h2>
            Role Information
          </h2>

          <p>
            Configure role details,
            access scope and
            permissions.
          </p>
        </div>
      </div>

      <div className="role-form-body">
        <div className="role-form-grid">
          {/* ROLE CODE */}

          <div className="role-form-group">
            <label>
              Role Code
            </label>

            <input
              type="text"
              placeholder="ROL007"
              value={roleCode}
              onChange={(event) =>
                setRoleCode(
                  event.target.value
                )
              }
            />
          </div>

          {/* ROLE NAME */}

          <div className="role-form-group">
            <label>
              Role Name
            </label>

            <input
              required
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(event) =>
                setRoleName(
                  event.target.value
                )
              }
            />
          </div>

          {/* SCOPE */}

          <div className="role-form-group">
            <label>
              Access Scope
            </label>

            <select
              value={scope}
              onChange={(event) =>
                setScope(
                  event.target
                    .value as RoleScope
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
            </select>
          </div>

          {/* PERMISSIONS */}

          <div className="role-form-group">
            <label>
              Permissions Count
            </label>

            <input
              type="number"
              min="0"
              value={permissionsCount}
              onChange={(event) =>
                setPermissionsCount(
                  Math.max(
                    0,
                    Number(
                      event.target.value
                    )
                  )
                )
              }
            />
          </div>

          {/* STATUS */}

          <div className="role-form-group">
            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as RoleStatus
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

          {/* DESCRIPTION */}

          <div className="role-form-group role-description-group">
            <label>
              Description
            </label>

            <textarea
              required
              rows={5}
              placeholder="Enter role description..."
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
            />
          </div>
        </div>

        <div className="role-form-actions">
          <button
            type="submit"
            className="role-form-submit"
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

export default RoleForm;
