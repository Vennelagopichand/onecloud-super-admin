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

/* FEATURE MANAGEMENT */
import FeatureList from "../pages/features/FeatureList";
import CreateFeature from "../pages/features/CreateFeature";
import FeatureDetails from "../pages/features/FeatureDetails";
import EditFeature from "../pages/features/EditFeature";

/* SUBSCRIPTION & LICENSE */
import SubscriptionList from "../pages/subscriptions/SubscriptionList";
import CreateSubscription from "../pages/subscriptions/CreateSubscription";
import SubscriptionDetails from "../pages/subscriptions/SubscriptionDetails";
import EditSubscription from "../pages/subscriptions/EditSubscription";

/* PLATFORM CONFIGURATION */
import PlatformConfigList from "../pages/platformConfig/PlatformConfigList";
import CreatePlatformConfig from "../pages/platformConfig/CreatePlatformConfig";
import PlatformConfigDetails from "../pages/platformConfig/PlatformConfigDetails";
import EditPlatformConfig from "../pages/platformConfig/EditPlatformConfig";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* DASHBOARD */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* TENANTS */}
        <Route
          path="/tenants"
          element={<TenantList />}
        />

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

        {/* ORGANIZATIONS */}
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

        {/* USERS */}
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

        {/* ROLES */}
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

        {/* PERMISSIONS */}
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

        {/* DATA PERMISSIONS */}
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

        {/* FEATURE MANAGEMENT */}
        <Route
          path="/features"
          element={<FeatureList />}
        />

        <Route
          path="/features/create"
          element={<CreateFeature />}
        />

        <Route
          path="/features/:id"
          element={<FeatureDetails />}
        />

        <Route
          path="/features/:id/edit"
          element={<EditFeature />}
        />

        {/* SUBSCRIPTION & LICENSE */}
        <Route
          path="/subscriptions"
          element={<SubscriptionList />}
        />

        <Route
          path="/subscriptions/create"
          element={<CreateSubscription />}
        />

        <Route
          path="/subscriptions/:id"
          element={<SubscriptionDetails />}
        />

        <Route
          path="/subscriptions/:id/edit"
          element={<EditSubscription />}
        />

        {/* PLATFORM CONFIGURATION */}
        <Route
          path="/platform-config"
          element={<PlatformConfigList />}
        />

        <Route
          path="/platform-config/create"
          element={<CreatePlatformConfig />}
        />

        <Route
          path="/platform-config/:id"
          element={<PlatformConfigDetails />}
        />

        <Route
          path="/platform-config/:id/edit"
          element={<EditPlatformConfig />}
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
