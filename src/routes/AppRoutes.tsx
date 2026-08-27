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

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />

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
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;
