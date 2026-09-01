import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import DataPermissionForm from "../../components/dataPermissions/DataPermissionForm";

import type { DataPermissionFormData } from "../../components/dataPermissions/DataPermissionForm";

import { useDataPermission } from "../../hooks/dataPermissions/useDataPermission";

import { useUpdateDataPermission } from "../../hooks/dataPermissions/useUpdateDataPermission";

function EditDataPermission() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dataPermissionId =
    Number(id);

  const {
    data: dataPermission,
    isLoading,
    isError,
  } = useDataPermission(
    dataPermissionId
  );

  const updateDataPermission =
    useUpdateDataPermission();

  function handleUpdate(
    data: DataPermissionFormData
  ) {
    updateDataPermission.mutate(
      {
        id: dataPermissionId,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            `/data-permissions/${dataPermissionId}`
          );
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading data permission...
      </div>
    );
  }

  if (
    isError ||
    !dataPermission
  ) {
    return (
      <div className="data-permission-detail-error">
        <h2>
          Data permission not found
        </h2>

        <Link to="/data-permissions">
          Back to Data Permissions
        </Link>
      </div>
    );
  }

  return (
    <div className="data-permission-edit-page">
      <Link
        to={`/data-permissions/${dataPermission.id}`}
        className="data-permission-back-button"
      >
        ← Back to Data Permission
      </Link>

      <div className="data-permission-create-header">
        <h1>
          Edit Data Permission
        </h1>

        <p>
          Update role, data scope,
          access level and assignment.
        </p>
      </div>

      <DataPermissionForm
        initialData={dataPermission}
        submitText="Update Data Permission"
        isSubmitting={
          updateDataPermission.isPending
        }
        onSubmit={handleUpdate}
      />

      {updateDataPermission.isError && (
        <div className="data-permission-form-error">
          Unable to update data
          permission.
        </div>
      )}
    </div>
  );
}

export default EditDataPermission;
