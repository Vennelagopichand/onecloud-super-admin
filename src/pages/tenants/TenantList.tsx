import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import TenantFilters from "../../components/tenants/TenantFilters";
import TenantTable from "../../components/tenants/TenantTable";
import Pagination from "../../components/common/Pagination";
import Toast from "../../components/common/Toast";

import { useTenants } from "../../hooks/useTenants";
import { useActivateTenant } from "../../hooks/useActivateTenant";
import { useDeactivateTenant } from "../../hooks/useDeactivateTenant";

type SortField =
  | "tenantName"
  | "tenantCode"
  | "users"
  | "createdAt";

type SortDirection = "asc" | "desc";

function TenantList() {
  const {
    data: tenants = [],
    isLoading,
    isError,
  } = useTenants();

  const activateTenant = useActivateTenant();
  const deactivateTenant = useDeactivateTenant();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");

  // Default sorting by Tenant Code
  const [sortField, setSortField] =
    useState<SortField>("tenantCode");

  const [sortDirection, setSortDirection] =
    useState<SortDirection>("asc");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const itemsPerPage = 5;

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({
      message,
      type,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const filteredTenants = useMemo(() => {
    const result = tenants.filter((tenant) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        tenant.tenantName
          .toLowerCase()
          .includes(searchValue) ||
        tenant.tenantCode
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "All" ||
        tenant.status === status;

      const matchesPlan =
        plan === "All" ||
        tenant.subscription === plan;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPlan
      );
    });

    return [...result].sort((a, b) => {
      let comparison = 0;

      // Sort users numerically
      if (sortField === "users") {
        comparison = a.users - b.users;
      }

      // Sort tenant code by numeric value
      else if (sortField === "tenantCode") {
        const codeA = Number(
          a.tenantCode.replace(/\D/g, "")
        );

        const codeB = Number(
          b.tenantCode.replace(/\D/g, "")
        );

        comparison = codeA - codeB;
      }

      // Other fields use normal text sorting
      else {
        comparison = String(
          a[sortField]
        ).localeCompare(
          String(b[sortField])
        );
      }

      return sortDirection === "asc"
        ? comparison
        : -comparison;
    });
  }, [
    tenants,
    search,
    status,
    plan,
    sortField,
    sortDirection,
  ]);

  const totalPages =
    Math.ceil(
      filteredTenants.length /
        itemsPerPage
    ) || 1;

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const paginatedTenants =
    filteredTenants.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handlePlanChange = (
    value: string
  ) => {
    setPlan(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setStatus("All");
    setPlan("All");

    setSortField("tenantCode");
    setSortDirection("asc");

    setCurrentPage(1);
  };

  const handleSort = (
    field: SortField
  ) => {
    if (sortField === field) {
      setSortDirection((previous) =>
        previous === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const handleActivate = (
    id: number
  ) => {
    activateTenant.mutate(id, {
      onSuccess: (tenant) => {
        showToast(
          `${tenant.tenantName} activated successfully`
        );
      },

      onError: (error) => {
        showToast(
          error instanceof Error
            ? error.message
            : "Unable to activate tenant",
          "error"
        );
      },
    });
  };

  const handleDeactivate = (
    id: number
  ) => {
    const tenant =
      tenants.find(
        (item) =>
          item.id === id
      );

    const confirmed =
      window.confirm(
        `Are you sure you want to deactivate ${
          tenant?.tenantName ??
          "this tenant"
        }?`
      );

    if (!confirmed) {
      return;
    }

    deactivateTenant.mutate(id, {
      onSuccess: (tenant) => {
        showToast(
          `${tenant.tenantName} deactivated successfully`
        );
      },

      onError: (error) => {
        showToast(
          error instanceof Error
            ? error.message
            : "Unable to deactivate tenant",
          "error"
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading tenants...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-state">
        Unable to load tenants.
      </div>
    );
  }

  return (
    <div className="tenant-management-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      {/* PAGE HEADER */}
      <div className="page-header page-header-flex">
        <div>
          <h1>
            Tenant Management
          </h1>

          <p>
            View, search, filter and manage
            all platform tenants.
          </p>
        </div>

        <Link
          to="/tenants/create"
          className="primary-button"
        >
          + Create Tenant
        </Link>
      </div>

      {/* SUMMARY */}
      <div className="tenant-summary">
        <div>
          <span>
            Total Tenants
          </span>

          <strong>
            {tenants.length}
          </strong>
        </div>

        <div>
          <span>
            Active
          </span>

          <strong className="summary-active">
            {
              tenants.filter(
                (tenant) =>
                  tenant.status ===
                  "Active"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>
            Inactive
          </span>

          <strong className="summary-inactive">
            {
              tenants.filter(
                (tenant) =>
                  tenant.status ===
                  "Inactive"
              ).length
            }
          </strong>
        </div>
      </div>

      {/* TENANT CARD */}
      <div className="tenant-card">
        <div className="tenant-card-top">
          <div>
            <h2>
              All Tenants
            </h2>

            <p>
              Manage tenant accounts
              and subscriptions.
            </p>
          </div>

          <span className="result-count">
            {filteredTenants.length} results
          </span>
        </div>

        {/* FILTERS */}
        <TenantFilters
          search={search}
          status={status}
          plan={plan}
          onSearchChange={
            handleSearchChange
          }
          onStatusChange={
            handleStatusChange
          }
          onPlanChange={
            handlePlanChange
          }
          onReset={
            handleReset
          }
        />

        {/* TABLE */}
        <TenantTable
          tenants={
            paginatedTenants
          }
          sortField={
            sortField
          }
          sortDirection={
            sortDirection
          }
          onSort={
            handleSort
          }
          onActivate={
            handleActivate
          }
          onDeactivate={
            handleDeactivate
          }
        />

        {/* FOOTER */}
        <div className="table-footer">
          <p>
            Showing{" "}
            {filteredTenants.length === 0
              ? 0
              : startIndex + 1}
            {" - "}
            {Math.min(
              startIndex +
                itemsPerPage,
              filteredTenants.length
            )}{" "}
            of{" "}
            {filteredTenants.length}
          </p>

          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />
        </div>
      </div>
    </div>
  );
}

export default TenantList;
