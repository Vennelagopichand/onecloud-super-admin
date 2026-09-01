import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import RoleFilters from "../../components/roles/RoleFilters";
import RoleTable from "../../components/roles/RoleTable";

import { useRoles } from "../../hooks/useRoles";
import { useToggleRoleStatus } from "../../hooks/useToggleRoleStatus";

function RoleList() {
  const {
    data: roles = [],
    isLoading,
  } = useRoles();

  const toggleRoleStatus =
    useToggleRoleStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [scope, setScope] =
    useState("All");

  const filteredRoles =
    useMemo(() => {
      const searchText =
        search
          .toLowerCase()
          .trim();

      return roles.filter(
        (role) => {
          const matchesSearch =
            role.roleName
              .toLowerCase()
              .includes(searchText) ||
            role.roleCode
              .toLowerCase()
              .includes(searchText) ||
            role.description
              .toLowerCase()
              .includes(searchText);

          const matchesStatus =
            status === "All" ||
            role.status === status;

          const matchesScope =
            scope === "All" ||
            role.scope === scope;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesScope
          );
        }
      );
    }, [
      roles,
      search,
      status,
      scope,
    ]);

  const activeRoles =
    roles.filter(
      (role) =>
        role.status === "Active"
    ).length;

  const inactiveRoles =
    roles.filter(
      (role) =>
        role.status === "Inactive"
    ).length;

  const platformRoles =
    roles.filter(
      (role) =>
        role.scope === "Platform"
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading roles...
      </div>
    );
  }

  return (
    <div className="role-page">
      <div className="role-page-header">
        <div>
          <h1>
            Role Management
          </h1>

          <p>
            Manage system roles,
            access scope and
            permissions.
          </p>
        </div>

        <Link
          to="/roles/create"
          className="role-create-button"
        >
          + Create Role
        </Link>
      </div>

      <div className="role-summary">
        <div className="role-summary-card">
          <span>
            Total Roles
          </span>

          <strong>
            {roles.length}
          </strong>
        </div>

        <div className="role-summary-card">
          <span>
            Active Roles
          </span>

          <strong className="role-active-count">
            {activeRoles}
          </strong>
        </div>

        <div className="role-summary-card">
          <span>
            Inactive Roles
          </span>

          <strong className="role-inactive-count">
            {inactiveRoles}
          </strong>
        </div>

        <div className="role-summary-card">
          <span>
            Platform Roles
          </span>

          <strong className="role-platform-count">
            {platformRoles}
          </strong>
        </div>
      </div>

      <RoleFilters
        search={search}
        status={status}
        scope={scope}
        onSearchChange={
          setSearch
        }
        onStatusChange={
          setStatus
        }
        onScopeChange={
          setScope
        }
        onReset={() => {
          setSearch("");
          setStatus("All");
          setScope("All");
        }}
      />

      <div className="role-results-row">
        <span>
          {filteredRoles.length}{" "}
          results
        </span>
      </div>

      <RoleTable
        roles={filteredRoles}
        onToggleStatus={(id) =>
          toggleRoleStatus.mutate(
            id
          )
        }
      />
    </div>
  );
}

export default RoleList;
