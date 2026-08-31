import {
  Link,
  useParams,
} from "react-router-dom";

import { useOrganization } from "../../hooks/useOrganization";
import { useToggleOrganizationStatus } from "../../hooks/useToggleOrganizationStatus";

function OrganizationDetails() {
  const { id } = useParams();

  const organizationId = Number(id);

  const {
    data: organization,
    isLoading,
    isError,
  } = useOrganization(organizationId);

  const toggleStatus =
    useToggleOrganizationStatus();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading organization...
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="error-state">
        Organization not found.
      </div>
    );
  }

  return (
    <div className="tenant-details-page">
      <button
        type="button"
        className="back-button"
        onClick={() =>
          history.back()
        }
      >
        ← Back
      </button>

      <div className="details-heading-row">
        <div className="details-heading">
          <div className="details-logo">
            {organization.organizationName
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <div className="tenant-title-row">
              <h1>
                {
                  organization.organizationName
                }
              </h1>

              <span
                className={`status ${
                  organization.status ===
                  "Active"
                    ? "active-status"
                    : "inactive-status"
                }`}
              >
                {organization.status}
              </span>
            </div>

            <p>
              {
                organization.organizationCode
              }{" "}
              • {organization.tenantName}
            </p>
          </div>
        </div>

        <div className="details-top-actions">
          <Link
            to={`/organizations/${organization.id}/edit`}
            className="secondary-button"
          >
            Edit Organization
          </Link>

          <button
            type="button"
            className={
              organization.status ===
              "Active"
                ? "danger-button"
                : "success-button"
            }
            onClick={() =>
              toggleStatus.mutate(
                organization.id,
              )
            }
          >
            {organization.status ===
            "Active"
              ? "Deactivate"
              : "Activate"}
          </button>
        </div>
      </div>

      <div className="tenant-information-card">
        <div className="details-card-header">
          <h2>
            Organization Information
          </h2>

          <p>
            Basic organization details
          </p>
        </div>

        <div className="tenant-info-grid">
          <div className="info-item">
            <span>Tenant</span>
            <strong>
              {organization.tenantName}
            </strong>
          </div>

          <div className="info-item">
            <span>Industry</span>
            <strong>
              {organization.industry}
            </strong>
          </div>

          <div className="info-item">
            <span>Country</span>
            <strong>
              {organization.country}
            </strong>
          </div>

          <div className="info-item">
            <span>Email</span>
            <strong>
              {organization.email}
            </strong>
          </div>

          <div className="info-item">
            <span>Phone</span>
            <strong>
              {organization.phone}
            </strong>
          </div>

          <div className="info-item">
            <span>Employees</span>
            <strong>
              {organization.employees}
            </strong>
          </div>

          <div className="info-item">
            <span>Created</span>
            <strong>
              {organization.createdAt}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationDetails;
