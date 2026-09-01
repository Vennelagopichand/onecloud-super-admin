import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import UserFilters from "../../components/users/UserFilters";
import UserTable from "../../components/users/UserTable";

import { useUsers } from "../../hooks/useUsers";
import { useToggleUserStatus } from "../../hooks/useToggleUserStatus";

function UserList() {
  const {
    data: users = [],
    isLoading,
  } = useUsers();

  const toggleUserStatus =
    useToggleUserStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [role, setRole] =
    useState("All");

  const filteredUsers =
    useMemo(() => {
      const text =
        search
          .toLowerCase()
          .trim();

      return users.filter(
        (user) => {
          const matchesSearch =
            user.fullName
              .toLowerCase()
              .includes(text) ||
            user.userId
              .toLowerCase()
              .includes(text) ||
            user.email
              .toLowerCase()
              .includes(text) ||
            user.tenantName
              .toLowerCase()
              .includes(text) ||
            user.organizationName
              .toLowerCase()
              .includes(text);

          const matchesStatus =
            status === "All" ||
            user.status === status;

          const matchesRole =
            role === "All" ||
            user.role === role;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesRole
          );
        }
      );
    }, [
      users,
      search,
      status,
      role,
    ]);

  const activeUsers =
    users.filter(
      (user) =>
        user.status === "Active"
    ).length;

  const inactiveUsers =
    users.filter(
      (user) =>
        user.status === "Inactive"
    ).length;

  const adminUsers =
    users.filter(
      (user) =>
        user.role.includes("Admin")
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading users...
      </div>
    );
  }

  return (
    <div className="user-page">
      {/* HEADER */}
      <div className="user-page-header">
        <div>
          <h1>
            User Management
          </h1>

          <p>
            Manage platform users,
            roles and access.
          </p>
        </div>

        <Link
          to="/users/create"
          className="user-create-button"
        >
          + Create User
        </Link>
      </div>

      {/* SUMMARY */}
      <div className="user-summary">
        <div className="user-summary-card">
          <span>
            Total Users
          </span>

          <strong>
            {users.length}
          </strong>
        </div>

        <div className="user-summary-card">
          <span>
            Active Users
          </span>

          <strong className="user-active-count">
            {activeUsers}
          </strong>
        </div>

        <div className="user-summary-card">
          <span>
            Inactive Users
          </span>

          <strong className="user-inactive-count">
            {inactiveUsers}
          </strong>
        </div>

        <div className="user-summary-card">
          <span>
            Admin Users
          </span>

          <strong className="user-admin-count">
            {adminUsers}
          </strong>
        </div>
      </div>

      {/* FILTERS */}
      <UserFilters
        search={search}
        status={status}
        role={role}
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
        onRoleChange={
          setRole
        }
        onReset={() => {
          setSearch("");
          setStatus("All");
          setRole("All");
        }}
      />

      {/* RESULT COUNT */}
      <div className="user-results-row">
        <span>
          {filteredUsers.length}{" "}
          results
        </span>
      </div>

      {/* TABLE */}
      <UserTable
        users={filteredUsers}
        onToggleStatus={(id) =>
          toggleUserStatus.mutate(
            id
          )
        }
      />
    </div>
  );
}

export default UserList;
