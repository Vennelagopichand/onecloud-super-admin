import {
  useEffect,
  useState,
} from "react";

import type {
  Organization,
  OrganizationStatus,
} from "../../types/organization";

interface OrganizationFormProps {
  initialData?: Organization;
  submitText: string;
  onSubmit: (
    data: Omit<
      Organization,
      "id" | "createdAt"
    >,
  ) => void;
}

function OrganizationForm({
  initialData,
  submitText,
  onSubmit,
}: OrganizationFormProps) {
  const [organizationName, setName] =
    useState("");

  const [organizationCode, setCode] =
    useState("");

  const [tenantName, setTenantName] =
    useState("");

  const [tenantId, setTenantId] =
    useState(1);

  const [industry, setIndustry] =
    useState("");

  const [country, setCountry] =
    useState("India");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [employees, setEmployees] =
    useState(0);

  const [status, setStatus] =
    useState<OrganizationStatus>(
      "Active",
    );

  useEffect(() => {
    if (!initialData) return;

    setName(
      initialData.organizationName,
    );

    setCode(
      initialData.organizationCode,
    );

    setTenantName(
      initialData.tenantName,
    );

    setTenantId(
      initialData.tenantId,
    );

    setIndustry(
      initialData.industry,
    );

    setCountry(
      initialData.country,
    );

    setEmail(initialData.email);

    setPhone(initialData.phone);

    setEmployees(
      initialData.employees,
    );

    setStatus(initialData.status);
  }, [initialData]);

  function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    onSubmit({
      organizationName,
      organizationCode,
      tenantId,
      tenantName,
      industry,
      country,
      email,
      phone,
      employees,
      status,
    });
  }

  return (
    <form
      className="tenant-form-card"
      onSubmit={handleSubmit}
    >
      <div className="form-card-header">
        <div>
          <h2>
            Organization Information
          </h2>

          <p>
            Enter organization details.
          </p>
        </div>
      </div>

      <div className="tenant-form">
        <div className="form-grid">
          <div className="form-group">
            <label>
              Organization Name
            </label>

            <input
              required
              value={organizationName}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Organization Code
            </label>

            <input
              required
              value={organizationCode}
              onChange={(event) =>
                setCode(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>
              Tenant Name
            </label>

            <input
              required
              value={tenantName}
              onChange={(event) =>
                setTenantName(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Tenant ID</label>

            <input
              type="number"
              min="1"
              value={tenantId}
              onChange={(event) =>
                setTenantId(
                  Number(
                    event.target.value,
                  ),
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Industry</label>

            <input
              required
              value={industry}
              onChange={(event) =>
                setIndustry(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Country</label>

            <input
              value={country}
              onChange={(event) =>
                setCountry(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              required
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value,
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Employees</label>

            <input
              type="number"
              min="0"
              value={employees}
              onChange={(event) =>
                setEmployees(
                  Number(
                    event.target.value,
                  ),
                )
              }
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as OrganizationStatus,
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
            type="submit"
            className="primary-button"
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrganizationForm;
