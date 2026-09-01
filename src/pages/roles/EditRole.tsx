import {
  useNavigate,
  useParams,
} from "react-router-dom";

import RoleForm from "../../components/roles/RoleForm";

import { useRole } from "../../hooks/useRole";
import { useUpdateRole } from "../../hooks/useUpdateRole";

function EditRole() {
  const { id } =
    useParams();

  const roleId =
    Number(id);

  const navigate =
    useNavigate();

  const {
    data: role,
    isLoading,
    isError,
  } = useRole(roleId);

  const updateRole =
    useUpdateRole();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading role...
      </div>
    );
  }

  if (
    isError ||
    !role
  ) {
    return (
      <div className="role-detail-error">
        <h2>
          Role not found
        </h2>

        <button
          type="button"
          onClick={() =>
            navigate("/roles")
          }
        >
          Back to Roles
        </button>
      </div>
    );
  }

  return (
    <div className="role-edit-page">
      <button
        type="button"
        className="role-back-button"
        onClick={() =>
          navigate(
            `/roles/${roleId}`
          )
        }
      >
        ← Back to Role
      </button>

      <div className="role-create-header">
        <h1>
          Edit Role
        </h1>

        <p>
          Update role information,
          access scope and
          permissions.
        </p>
      </div>

      <RoleForm
        initialData={role}
        submitText="Update Role"
        isSubmitting={
          updateRole.isPending
        }
        onSubmit={(data) => {
          updateRole.mutate(
            {
              id: roleId,
              data,
            },
            {
              onSuccess: () => {
                navigate(
                  `/roles/${roleId}`
                );
              },
            }
          );
        }}
      />
    </div>
  );
}

export default EditRole;
