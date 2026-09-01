import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import PermissionForm from "../../components/permissions/PermissionForm";

import type { PermissionFormData } from "../../components/permissions/PermissionForm";

import { usePermission } from "../../hooks/permissions/usePermission";

import { useUpdatePermission } from "../../hooks/permissions/useUpdatePermission";

function EditPermission() {
  const { id } = useParams();

  const navigate = useNavigate();

  const permissionId =
    Number(id);

  const {
    data: permission,
    isLoading,
    isError,
  } = usePermission(permissionId);

  const updatePermission =
    useUpdatePermission();

  function handleUpdate(
    data: PermissionFormData
  ) {
    updatePermission.mutate(
      {
        id: permissionId,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            `/permissions/${permissionId}`
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading permission...
      </div>
    );
  }

  if (
    isError ||
    !permission
  ) {
    return (
      <div className="permission-detail-error">
        <h2>
          Permission not found
        </h2>

        <Link to="/permissions">
          Back to Permissions
        </Link>
      </div>
    );
  }

  return (
    <div className="permission-edit-page">
      <Link
        to={`/permissions/${permission.id}`}
        className="permission-back-button"
      >
        ← Back to Permission
      </Link>

      <div className="permission-create-header">
        <h1>Edit Permission</h1>

        <p>
          Update permission details,
          access action and status.
        </p>
      </div>

      <PermissionForm
        initialData={permission}
        submitText="Update Permission"
        isSubmitting={
          updatePermission.isPending
        }
        onSubmit={handleUpdate}
      />

      {updatePermission.isError && (
        <div className="permission-form-error">
          Unable to update permission.
        </div>
      )}
    </div>
  );
}

export default EditPermission;
