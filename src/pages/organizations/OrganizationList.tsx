import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import OrganizationFilters from "../../components/organizations/OrganizationFilters";
import OrganizationTable from "../../components/organizations/OrganizationTable";

import { useOrganizations } from "../../hooks/useOrganizations";

import { useToggleOrganizationStatus } from "../../hooks/useToggleOrganizationStatus";

function OrganizationList() {
  const {
    data: organizations = [],
    isLoading,
  } = useOrganizations();

  const toggleStatus =
    useToggleOrganizationStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const filteredOrganizations =
    useMemo(() => {
      const searchText =
        search.toLowerCase().trim();

      return organizations.filter(
        (organization) => {
          const matchesSearch =
            organization.organizationName
              .toLowerCase()
              .includes(searchText) ||
            organization.organizationCode
              .toLowerCase()
              .includes(searchText) ||
            organization.tenantName
              .toLowerCase()
              .includes(searchText);

          const matchesStatus =
            status === "All" ||
            organization.status ===
              status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      organizations,
      search,
      status,
    ]);

  const activeOrganizations =
    organizations.filter(
      (organization) =>
        organization.status ===
        "Active"
    ).length;

  const inactiveOrganizations =
    organizations.filter(
      (organization) =>
        organization.status ===
        "Inactive"
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading organizations...
      </div>
    );
  }

  return (
    <div className="organization-page">
      {/* PAGE HEADER */}
      <div className="organization-page-header">
        <div>
          <h1>
            Organization Management
          </h1>

          <p>
            Manage organizations across
            all platform tenants.
          </p>
        </div>

        <Link
          to="/organizations/create"
          className="organization-create-button"
        >
          + Create Organization
        </Link>
      </div>

      {/* SUMMARY CARDS */}
      <div className="organization-summary">
        <div className="organization-summary-card">
          <span>
            Total Organizations
          </span>

          <strong>
            {organizations.length}
          </strong>
        </div>

        <div className="organization-summary-card">
          <span>
            Active Organizations
          </span>

          <strong className="organization-active-count">
            {activeOrganizations}
          </strong>
        </div>

        <div className="organization-summary-card">
          <span>
            Inactive Organizations
          </span>

          <strong className="organization-inactive-count">
            {inactiveOrganizations}
          </strong>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <OrganizationFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch("");
          setStatus("All");
        }}
      />

      {/* TABLE */}
      <OrganizationTable
        organizations={
          filteredOrganizations
        }
        onToggleStatus={(id) =>
          toggleStatus.mutate(id)
        }
      />
    </div>
  );
}

export default OrganizationList;