import { useNavigate } from "react-router-dom";

import OrganizationForm from "../../components/organizations/OrganizationForm";

import { useCreateOrganization } from "../../hooks/useCreateOrganization";

function CreateOrganization() {
  const navigate = useNavigate();

  const createOrganization =
    useCreateOrganization();

  return (
    <div className="create-tenant-page">
      <button
        type="button"
        className="back-button"
        onClick={() =>
          navigate("/organizations")
        }
      >
        ← Back to Organizations
      </button>

      <div className="page-header">
        <h1>Create Organization</h1>

        <p>
          Add a new organization to the
          platform.
        </p>
      </div>

      <OrganizationForm
        submitText="Create Organization"
        onSubmit={(data) => {
          createOrganization.mutate(
            data,
            {
              onSuccess: () =>
                navigate(
                  "/organizations",
                ),
            },
          );
        }}
      />
    </div>
  );
}

export default CreateOrganization;
