import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AdminLayout from "../components/layout/AdminLayout";

import Dashboard from "../pages/Dashboard";

import TenantList from "../pages/tenants/TenantList";
import CreateTenant from "../pages/tenants/CreateTenant";
import TenantDetails from "../pages/tenants/TenantDetails";
import EditTenant from "../pages/tenants/EditTenant";

import OrganizationList from "../pages/organizations/OrganizationList";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import OrganizationDetails from "../pages/organizations/OrganizationDetails";
import EditOrganization from "../pages/organizations/EditOrganization";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Tenant Management */}
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