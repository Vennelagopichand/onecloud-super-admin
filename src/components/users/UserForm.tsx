import {
  useEffect,
  useState,
} from "react";

import type {
  User,
  UserRole,
  UserStatus,
} from "../../types/user";

interface UserFormProps {
  initialData?: User;

  submitText: string;

  onSubmit: (
    data: Omit<
      User,
      "id" | "createdAt" | "lastLogin"
    >
  ) => void;

  isSubmitting?: boolean;
}

function UserForm({
  initialData,
  submitText,
  onSubmit,
  isSubmitting = false,
}: UserFormProps) {
  const [userId, setUserId] =
    useState("");

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [tenantId, setTenantId] =
    useState(1);

  const [tenantName, setTenantName] =
    useState("");

  const [
    organizationId,
    setOrganizationId,
  ] = useState(1);

  const [
    organizationName,
    setOrganizationName,
  ] = useState("");

  const [role, setRole] =
    useState<UserRole>("User");

  const [status, setStatus] =
    useState<UserStatus>("Active");

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setUserId(
      initialData.userId
    );

    setFullName(
      initialData.fullName
    );

    setEmail(
      initialData.email
    );

    setPhone(
      initialData.phone
    );

    setTenantId(
      initialData.tenantId
    );

    setTenantName(
      initialData.tenantName
    );

    setOrganizationId(
      initialData.organizationId
    );

    setOrganizationName(
      initialData.organizationName
    );

    setRole(
      initialData.role
    );

    setStatus(
      initialData.status
    );
  }, [initialData]);

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    onSubmit({
      userId,
      fullName,
      email,
      phone,
      tenantId,
      tenantName,
      organizationId,
      organizationName,
      role,
      status,
    });
  }

  return (
    <form
      className="user-form-card"
      onSubmit={handleSubmit}
    >
      <div className="user-form-header">
        <div>
          <h2>
            User Information
          </h2>

          <p>
            Enter user account and
            organization details.
          </p>
        </div>
      </div>

      <div className="user-form-body">
        <div className="user-form-grid">
          <div className="user-form-group">
            <label>
              User ID
            </label>

            <input
              type="text"
              placeholder="USR009"
              value={userId}
              onChange={(event) =>
                setUserId(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Full Name
            </label>

            <input
              required
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(event) =>
                setFullName(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Email
            </label>

            <input
              required
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Phone
            </label>

            <input
              required
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Tenant ID
            </label>

            <input
              required
              type="number"
              min="1"
              value={tenantId}
              onChange={(event) =>
                setTenantId(
                  Number(
                    event.target.value
                  )
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Tenant Name
            </label>

            <input
              required
              type="text"
              placeholder="Acme Corporation"
              value={tenantName}
              onChange={(event) =>
                setTenantName(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Organization ID
            </label>

            <input
              required
              type="number"
              min="1"
              value={organizationId}
              onChange={(event) =>
                setOrganizationId(
                  Number(
                    event.target.value
                  )
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Organization Name
            </label>

            <input
              required
              type="text"
              placeholder="Acme India Pvt Ltd"
              value={organizationName}
              onChange={(event) =>
                setOrganizationName(
                  event.target.value
                )
              }
            />
          </div>

          <div className="user-form-group">
            <label>
              Role
            </label>

            <select
              value={role}
              onChange={(event) =>
                setRole(
                  event.target
                    .value as UserRole
                )
              }
            >
              <option value="Super Admin">
                Super Admin
              </option>

              <option value="Tenant Admin">
                Tenant Admin
              </option>

              <option value="Organization Admin">
                Organization Admin
              </option>

              <option value="Manager">
                Manager
              </option>

              <option value="User">
                User
              </option>
            </select>
          </div>

          <div className="user-form-group">
            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as UserStatus
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

        <div className="user-form-actions">
          <button
            type="submit"
            className="user-form-submit"
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

export default UserForm;
