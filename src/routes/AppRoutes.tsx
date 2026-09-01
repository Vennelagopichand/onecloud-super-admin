import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/Dashboard";

/* TENANT MANAGEMENT */
import TenantList from "../pages/tenants/TenantList";
import CreateTenant from "../pages/tenants/CreateTenant";
import TenantDetails from "../pages/tenants/TenantDetails";
import EditTenant from "../pages/tenants/EditTenant";

/* ORGANIZATION MANAGEMENT */
import OrganizationList from "../pages/organizations/OrganizationList";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import OrganizationDetails from "../pages/organizations/OrganizationDetails";
import EditOrganization from "../pages/organizations/EditOrganization";

/* USER MANAGEMENT */
import UserList from "../pages/users/UserList";
import CreateUser from "../pages/users/CreateUser";
import UserDetails from "../pages/users/UserDetails";
import EditUser from "../pages/users/EditUser";

/* ROLE MANAGEMENT */
import RoleList from "../pages/roles/RoleList";
import CreateRole from "../pages/roles/CreateRole";
import RoleDetails from "../pages/roles/RoleDetails";
import EditRole from "../pages/roles/EditRole";

/* PERMISSION MANAGEMENT */
import PermissionList from "../pages/permissions/PermissionList";
import CreatePermission from "../pages/permissions/CreatePermission";
import PermissionDetails from "../pages/permissions/PermissionDetails";
import EditPermission from "../pages/permissions/EditPermission";

/* DATA PERMISSIONS */
import DataPermissionList from "../pages/dataPermissions/DataPermissionList";
import CreateDataPermission from "../pages/dataPermissions/CreateDataPermission";
import DataPermissionDetails from "../pages/dataPermissions/DataPermissionDetails";
import EditDataPermission from "../pages/dataPermissions/EditDataPermission";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Tenant Management */}
        <Route path="/tenants" element={<TenantList />} />
        <Route
          path="/tenants/create"
          element={<CreateTenant />}
        />
        <Route
          path="/tenants/:id"
          element={<TenantDetails />}
        />
        <Route
          path="/tenants/:id/edit"
          element={<EditTenant />}
        />

        {/* Organization Management */}
        <Route
          path="/organizations"
          element={<OrganizationList />}
        />
        <Route
          path="/organizations/create"
          element={<CreateOrganization />}
        />
        <Route
          path="/organizations/:id"
          element={<OrganizationDetails />}
        />
        <Route
          path="/organizations/:id/edit"
          element={<EditOrganization />}
        />

        {/* User Management */}
        <Route
          path="/users"
          element={<UserList />}
        />
        <Route
          path="/users/create"
          element={<CreateUser />}
        />
        <Route
          path="/users/:id"
          element={<UserDetails />}
        />
        <Route
          path="/users/:id/edit"
          element={<EditUser />}
        />

        {/* Role Management */}
        <Route
          path="/roles"
          element={<RoleList />}
        />
        <Route
          path="/roles/create"
          element={<CreateRole />}
        />
        <Route
          path="/roles/:id"
          element={<RoleDetails />}
        />
        <Route
          path="/roles/:id/edit"
          element={<EditRole />}
        />

        {/* Permission Management */}
        <Route
          path="/permissions"
          element={<PermissionList />}
        />
        <Route
          path="/permissions/create"
          element={<CreatePermission />}
        />
        <Route
          path="/permissions/:id"
          element={<PermissionDetails />}
        />
        <Route
          path="/permissions/:id/edit"
          element={<EditPermission />}
        />

        {/* Data Permissions */}
        <Route
          path="/data-permissions"
          element={<DataPermissionList />}
        />
        <Route
          path="/data-permissions/create"
          element={<CreateDataPermission />}
        />
        <Route
          path="/data-permissions/:id"
          element={<DataPermissionDetails />}
        />
        <Route
          path="/data-permissions/:id/edit"
          element={<EditDataPermission />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
