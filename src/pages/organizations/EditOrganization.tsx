import {
  useNavigate,
  useParams,
} from "react-router-dom";

import OrganizationForm from "../../components/organizations/OrganizationForm";

import { useOrganization } from "../../hooks/useOrganization";
import { useUpdateOrganization } from "../../hooks/useUpdateOrganization";

function EditOrganization() {
  const { id } = useParams();

  const organizationId = Number(id);

  const navigate = useNavigate();

  const {
    data: organization,
    isLoading,
  } = useOrganization(organizationId);

  const updateOrganization =
    useUpdateOrganization();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading organization...
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="error-state">
        Organization not found.
      </div>
    );
  }

  return (
    <div className="edit-tenant-page">
      <button
        type="button"
        className="back-button"
        onClick={() =>
          navigate(
            `/organizations/${organizationId}`,
          )
        }
      >
        ← Back
      </button>

      <div className="page-header">
        <h1>Edit Organization</h1>

        <p>
          Update organization information.
        </p>
      </div>

      <OrganizationForm
        initialData={organization}
        submitText="Update Organization"
        onSubmit={(data) => {
          updateOrganization.mutate(
            {
              id: organizationId,
              data,
            },
            {
              onSuccess: () =>
                navigate(
                  `/organizations/${organizationId}`,
                ),
            },
          );
        }}
      />
    </div>
  );
}

export default EditOrganization;
