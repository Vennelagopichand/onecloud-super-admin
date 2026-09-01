import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import DataPermissionFilters from "../../components/dataPermissions/DataPermissionFilters";
import DataPermissionTable from "../../components/dataPermissions/DataPermissionTable";

import { useDataPermissions } from "../../hooks/dataPermissions/useDataPermissions";
import { useToggleDataPermissionStatus } from "../../hooks/dataPermissions/useToggleDataPermissionStatus";

function DataPermissionList() {
  const {
    data: dataPermissions = [],
    isLoading,
    isError,
  } = useDataPermissions();

  const toggleStatus =
    useToggleDataPermissionStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [role, setRole] =
    useState("All");

  const [scope, setScope] =
    useState("All");

  const [
    accessLevel,
    setAccessLevel,
  ] = useState("All");

  const filteredDataPermissions =
    useMemo(() => {
      const searchText =
        search
          .toLowerCase()
          .trim();

      return dataPermissions.filter(
        (permission) => {
          const matchesSearch =
            permission.permissionName
              .toLowerCase()
              .includes(searchText) ||
            permission.permissionCode
              .toLowerCase()
              .includes(searchText) ||
            permission.description
              .toLowerCase()
              .includes(searchText) ||
            permission.roleName
              .toLowerCase()
              .includes(searchText) ||
            permission.tenantName
              .toLowerCase()
              .includes(searchText) ||
            permission.organizationName
              .toLowerCase()
              .includes(searchText);

          const matchesStatus =
            status === "All" ||
            permission.status === status;

          const matchesRole =
            role === "All" ||
            permission.roleName === role;

          const matchesScope =
            scope === "All" ||
            permission.scope === scope;

          const matchesAccess =
            accessLevel === "All" ||
            permission.accessLevel ===
              accessLevel;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesRole &&
            matchesScope &&
            matchesAccess
          );
        }
      );
    }, [
      dataPermissions,
      search,
      status,
      role,
      scope,
      accessLevel,
    ]);

  const activeCount =
    dataPermissions.filter(
      (permission) =>
        permission.status === "Active"
    ).length;

  const inactiveCount =
    dataPermissions.filter(
      (permission) =>
        permission.status === "Inactive"
    ).length;

  const fullAccessCount =
    dataPermissions.filter(
      (permission) =>
        permission.accessLevel ===
        "Full Access"
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading data permissions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="data-permission-empty">
        <h3>
          Unable to load data permissions
        </h3>

        <p>
          Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="data-permission-page">
      <div className="data-permission-page-header">
        <div>
          <h1>Data Permissions</h1>

          <p>
            Control data access by role,
            scope, tenant and organization.
          </p>
        </div>

        <Link
          to="/data-permissions/create"
          className="data-permission-create-button"
        >
          + Create Data Permission
        </Link>
      </div>

      {/* Summary Cards */}

      <div className="data-permission-summary">
        <div className="data-permission-summary-card">
          <span>
            Total Permissions
          </span>

          <strong>
            {dataPermissions.length}
          </strong>
        </div>

        <div className="data-permission-summary-card">
          <span>
            Active Permissions
          </span>

          <strong className="data-permission-active-count">
            {activeCount}
          </strong>
        </div>

        <div className="data-permission-summary-card">
          <span>
            Inactive Permissions
          </span>

          <strong className="data-permission-inactive-count">
            {inactiveCount}
          </strong>
        </div>

        <div className="data-permission-summary-card">
          <span>
            Full Access
          </span>

          <strong className="data-permission-full-count">
            {fullAccessCount}
          </strong>
        </div>
      </div>

      {/* Filters */}

      <DataPermissionFilters
        search={search}
        status={status}
        role={role}
        scope={scope}
        accessLevel={accessLevel}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRoleChange={setRole}
        onScopeChange={setScope}
        onAccessLevelChange={
          setAccessLevel
        }
        onReset={() => {
          setSearch("");
          setStatus("All");
          setRole("All");
          setScope("All");
          setAccessLevel("All");
        }}
      />

      <div className="data-permission-results-row">
        <span>
          {filteredDataPermissions.length}{" "}
          results
        </span>
      </div>

      <DataPermissionTable
        dataPermissions={
          filteredDataPermissions
        }
        isUpdating={
          toggleStatus.isPending
        }
        onToggleStatus={(id) =>
          toggleStatus.mutate(id)
        }
      />
    </div>
  );
}

export default DataPermissionList;
