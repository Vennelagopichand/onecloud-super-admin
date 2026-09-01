import {
  Link,
  useNavigate,
} from "react-router-dom";

import PermissionForm from "../../components/permissions/PermissionForm";

import type { PermissionFormData } from "../../components/permissions/PermissionForm";

import { useCreatePermission } from "../../hooks/permissions/useCreatePermission";

function CreatePermission() {
  const navigate = useNavigate();

  const createPermission =
    useCreatePermission();

  function handleCreate(
    data: PermissionFormData
  ) {
    createPermission.mutate(
      data,
      {
        onSuccess: (permission) => {
          navigate(
            `/permissions/${permission.id}`
          );
        },
      }
    );
  }

  return (
    <div className="permission-create-page">
      <Link
        to="/permissions"
        className="permission-back-button"
      >
        ← Back to Permissions
      </Link>

      <div className="permission-create-header">
        <h1>Create Permission</h1>

        <p>
          Create a new platform
          permission and configure its
          access.
        </p>
      </div>

      <PermissionForm
        submitText="Create Permission"
        isSubmitting={
          createPermission.isPending
        }
        onSubmit={handleCreate}
      />

      {createPermission.isError && (
        <div className="permission-form-error">
          Unable to create permission.
        </div>
      )}
    </div>
  );
}

export default CreatePermission;
