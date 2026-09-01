import { useNavigate } from "react-router-dom";

import UserForm from "../../components/users/UserForm";

import { useCreateUser } from "../../hooks/useCreateUser";

function CreateUser() {
  const navigate =
    useNavigate();

  const createUser =
    useCreateUser();

  return (
    <div className="user-create-page">
      <button
        type="button"
        className="user-back-button"
        onClick={() =>
          navigate("/users")
        }
      >
        ← Back to Users
      </button>

      <div className="user-create-header">
        <h1>
          Create User
        </h1>

        <p>
          Add a new user to the
          platform.
        </p>
      </div>

      <UserForm
        submitText="Create User"
        isSubmitting={
          createUser.isPending
        }
        onSubmit={(data) => {
          createUser.mutate(
            data,
            {
              onSuccess: () => {
                navigate(
                  "/users"
                );
              },
            }
          );
        }}
      />
    </div>
  );
}

export default CreateUser;
