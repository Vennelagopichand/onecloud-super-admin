import {
  useNavigate,
  useParams,
} from "react-router-dom";

import UserForm from "../../components/users/UserForm";

import { useUser } from "../../hooks/useUser";

import { useUpdateUser } from "../../hooks/useUpdateUser";

function EditUser() {
  const { id } =
    useParams();

  const userId =
    Number(id);

  const navigate =
    useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(userId);

  const updateUser =
    useUpdateUser();

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading user...
      </div>
    );
  }

  if (
    isError ||
    !user
  ) {
    return (
      <div className="user-detail-error">
        User not found.
      </div>
    );
  }

  return (
    <div className="user-edit-page">
      <button
        type="button"
        className="user-back-button"
        onClick={() =>
          navigate(
            `/users/${userId}`
          )
        }
      >
        ← Back to User
      </button>

      <div className="user-create-header">
        <h1>
          Edit User
        </h1>

        <p>
          Update user information,
          role and status.
        </p>
      </div>

      <UserForm
        initialData={user}
        submitText="Update User"
        isSubmitting={
          updateUser.isPending
        }
        onSubmit={(data) => {
          updateUser.mutate(
            {
              id: userId,
              data,
            },
            {
              onSuccess: () => {
                navigate(
                  `/users/${userId}`
                );
              },
            }
          );
        }}
      />
    </div>
  );
}

export default EditUser;
