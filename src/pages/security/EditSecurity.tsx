import { useNavigate, useParams } from "react-router-dom";

import SecurityForm from "../../components/security/SecurityForm";

import { useSecurityPolicy } from "../../hooks/security/useSecurityPolicy";
import { useUpdateSecurityPolicy } from "../../hooks/security/useUpdateSecurityPolicy";

import type { SecurityFormData } from "../../components/security/SecurityForm";

function EditSecurity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const policyId = Number(id);

  const {
    data: policy,
    isLoading,
    isError,
  } = useSecurityPolicy(policyId);

  const updatePolicy =
    useUpdateSecurityPolicy();

  function handleSubmit(data: SecurityFormData) {
    updatePolicy.mutate(
      {
        id: policyId,
        data,
      },
      {
        onSuccess: () => {
          navigate(`/security/${policyId}`);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="security-page">
        <div className="loading-state">
          Loading security policy...
        </div>
      </div>
    );
  }

  if (isError || !policy) {
    return (
      <div className="security-page">
        <div className="error-state">
          Security policy not found.
        </div>
      </div>
    );
  }

  return (
    <div className="security-page">
      <div className="security-page-header">
        <div>
          <h1>Edit Security Policy</h1>
          <p>
            Update {policy.policyName}.
          </p>
        </div>
      </div>

      <SecurityForm
        initialData={policy}
        submitText="Update Policy"
        onSubmit={handleSubmit}
        isSubmitting={updatePolicy.isPending}
      />
    </div>
  );
}

export default EditSecurity;
