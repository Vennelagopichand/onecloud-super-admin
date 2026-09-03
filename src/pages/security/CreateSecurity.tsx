import { useNavigate } from "react-router-dom";

import SecurityForm from "../../components/security/SecurityForm";

import { useCreateSecurityPolicy } from "../../hooks/security/useCreateSecurityPolicy";

import type { SecurityFormData } from "../../components/security/SecurityForm";

function CreateSecurity() {
  const navigate = useNavigate();
  const createPolicy = useCreateSecurityPolicy();

  function handleSubmit(data: SecurityFormData) {
    createPolicy.mutate(data, {
      onSuccess: (policy) => {
        navigate(`/security/${policy.id}`);
      },
    });
  }

  return (
    <div className="security-page">
      <div className="security-page-header">
        <div>
          <h1>Create Security Policy</h1>
          <p>
            Add a new platform security policy.
          </p>
        </div>
      </div>

      <SecurityForm
        submitText="Create Policy"
        onSubmit={handleSubmit}
        isSubmitting={createPolicy.isPending}
      />
    </div>
  );
}

export default CreateSecurity;
