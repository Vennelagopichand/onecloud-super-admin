import {
  Link,
  useNavigate,
} from "react-router-dom";

import DataPermissionForm from "../../components/dataPermissions/DataPermissionForm";

import type { DataPermissionFormData } from "../../components/dataPermissions/DataPermissionForm";

import { useCreateDataPermission } from "../../hooks/dataPermissions/useCreateDataPermission";

function CreateDataPermission() {
  const navigate = useNavigate();

  const createDataPermission =
    useCreateDataPermission();

  function handleCreate(
    data: DataPermissionFormData
  ) {
    createDataPermission.mutate(
      data,
      {
        onSuccess: (
          dataPermission
        ) => {
          navigate(
            `/data-permissions/${dataPermission.id}`
          );
        },
      }
    );
  }

  return (
    <div className="data-permission-create-page">
      <Link
        to="/data-permissions"
        className="data-permission-back-button"
      >
        ← Back to Data Permissions
      </Link>

      <div className="data-permission-create-header">
        <h1>
          Create Data Permission
        </h1>

        <p>
          Configure role-based access
          to platform, tenant and
          organization data.
        </p>
      </div>

      <DataPermissionForm
        submitText="Create Data Permission"
        isSubmitting={
          createDataPermission.isPending
        }
        onSubmit={handleCreate}
      />

      {createDataPermission.isError && (
        <div className="data-permission-form-error">
          Unable to create data
          permission.
        </div>
      )}
    </div>
  );
}

export default CreateDataPermission;
