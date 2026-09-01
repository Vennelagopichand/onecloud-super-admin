import { useNavigate } from "react-router-dom";

import RoleForm from "../../components/roles/RoleForm";

import { useCreateRole } from "../../hooks/useCreateRole";

function CreateRole() {
  const navigate =
    useNavigate();

  const createRole =
    useCreateRole();

  return (
    <div className="role-create-page">
      <button
        type="button"
        className="role-back-button"
        onClick={() =>
          navigate("/roles")
        }
      >
        ← Back to Roles
      </button>

      <div className="role-create-header">
        <h1>
          Create Role
        </h1>

        <p>
          Create a new role and
          configure its access scope.
        </p>
      </div>

      <RoleForm
        submitText="Create Role"
        isSubmitting={
          createRole.isPending
        }
        onSubmit={(data) => {
          createRole.mutate(
            data,
            {
              onSuccess: (
                role
              ) => {
                navigate(
                  `/roles/${role.id}`
                );
              },
            }
          );
        }}
      />
    </div>
  );
}

export default CreateRole;
