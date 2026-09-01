import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PermissionFilters from "../../components/permissions/PermissionFilters";
import PermissionTable from "../../components/permissions/PermissionTable";

import { usePermissions } from "../../hooks/permissions/usePermissions";
import { useTogglePermissionStatus } from "../../hooks/permissions/useTogglePermissionStatus";

function PermissionList() {
  const {
    data: permissions = [],
    isLoading,
  } = usePermissions();

  const togglePermissionStatus =
    useTogglePermissionStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [module, setModule] =
    useState("All");

  const [action, setAction] =
    useState("All");

  const filteredPermissions =
    useMemo(() => {
      const searchText =
        search
          .toLowerCase()
          .trim();

      return permissions.filter(
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
            permission.module
              .toLowerCase()
              .includes(searchText);

          const matchesStatus =
            status === "All" ||
            permission.status === status;

          const matchesModule =
            module === "All" ||
            permission.module === module;

          const matchesAction =
            action === "All" ||
            permission.action === action;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesModule &&
            matchesAction
          );
        }
      );
    }, [
      permissions,
      search,
      status,
      module,
      action,
    ]);

  const activePermissions =
    permissions.filter(
      (permission) =>
        permission.status === "Active"
    ).length;

  const inactivePermissions =
    permissions.filter(
      (permission) =>
        permission.status === "Inactive"
    ).length;

  const managePermissions =
    permissions.filter(
      (permission) =>
        permission.action === "Manage"
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading permissions...
      </div>
    );
  }

  return (
    <div className="permission-page">
      <div className="permission-page-header">
        <div>
          <h1>Permission Management</h1>

          <p>
            Manage platform permissions,
            modules and allowed actions.
          </p>
        </div>

        <Link
          to="/permissions/create"
          className="permission-create-button"
        >
          + Create Permission
        </Link>
      </div>

      <div className="permission-summary">
        <div className="permission-summary-card">
          <span>Total Permissions</span>

          <strong>
            {permissions.length}
          </strong>
        </div>

        <div className="permission-summary-card">
          <span>Active Permissions</span>

          <strong className="permission-active-count">
            {activePermissions}
          </strong>
        </div>

        <div className="permission-summary-card">
          <span>Inactive Permissions</span>

          <strong className="permission-inactive-count">
            {inactivePermissions}
          </strong>
        </div>

        <div className="permission-summary-card">
          <span>Manage Permissions</span>

          <strong className="permission-manage-count">
            {managePermissions}
          </strong>
        </div>
      </div>

      <PermissionFilters
        search={search}
        status={status}
        module={module}
        action={action}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onModuleChange={setModule}
        onActionChange={setAction}
        onReset={() => {
          setSearch("");
          setStatus("All");
          setModule("All");
          setAction("All");
        }}
      />

      <div className="permission-results-row">
        <span>
          {filteredPermissions.length} results
        </span>
      </div>

      <PermissionTable
        permissions={filteredPermissions}
        onToggleStatus={(id) =>
          togglePermissionStatus.mutate(id)
        }
      />
    </div>
  );
}

export default PermissionList;
