import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SecurityFilters from "../../components/security/SecurityFilters";
import SecurityTable from "../../components/security/SecurityTable";

import { useSecurityPolicies } from "../../hooks/security/useSecurityPolicies";
import { useToggleSecurityPolicyStatus } from "../../hooks/security/useToggleSecurityPolicyStatus";

function SecurityList() {
  const { data: policies = [], isLoading, isError } =
    useSecurityPolicies();

  const toggleStatus = useToggleSecurityPolicyStatus();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredPolicies = useMemo(() => {
    const text = search.trim().toLowerCase();

    return policies.filter((policy) => {
      const matchesSearch =
        !text ||
        policy.policyName.toLowerCase().includes(text) ||
        policy.policyCode.toLowerCase().includes(text) ||
        policy.policyValue.toLowerCase().includes(text);

      const matchesCategory =
        category === "All" ||
        policy.category === category;

      const matchesSeverity =
        severity === "All" ||
        policy.severity === severity;

      const matchesStatus =
        status === "All" ||
        policy.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [policies, search, category, severity, status]);

  const activeCount = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

  const criticalCount = policies.filter(
    (policy) => policy.severity === "Critical"
  ).length;

  const inactiveCount = policies.length - activeCount;

  function resetFilters() {
    setSearch("");
    setCategory("All");
    setSeverity("All");
    setStatus("All");
  }

  if (isLoading) {
    return (
      <div className="security-page">
        <div className="loading-state">
          Loading security policies...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="security-page">
        <div className="error-state">
          Unable to load security policies.
        </div>
      </div>
    );
  }

  return (
    <div className="security-page">
      <div className="security-page-header">
        <div>
          <h1>Security Management</h1>
          <p>
            Configure and manage platform security policies.
          </p>
        </div>

        <Link
          to="/security/create"
          className="primary-button"
        >
          + Add Security Policy
        </Link>
      </div>

      <div className="security-summary">
        <div className="security-summary-card">
          <span>Total Policies</span>
          <strong>{policies.length}</strong>
        </div>

        <div className="security-summary-card">
          <span>Active Policies</span>
          <strong className="security-summary-green">
            {activeCount}
          </strong>
        </div>

        <div className="security-summary-card">
          <span>Inactive Policies</span>
          <strong className="security-summary-red">
            {inactiveCount}
          </strong>
        </div>

        <div className="security-summary-card">
          <span>Critical Policies</span>
          <strong className="security-summary-orange">
            {criticalCount}
          </strong>
        </div>
      </div>

      <div className="security-content">
        <div className="security-content-header">
          <div>
            <h2>Security Policies</h2>
            <p>
              Manage authentication, access and compliance rules.
            </p>
          </div>

          <span className="security-result-count">
            {filteredPolicies.length} Results
          </span>
        </div>

        <SecurityFilters
          search={search}
          category={category}
          severity={severity}
          status={status}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSeverityChange={setSeverity}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />

        <SecurityTable
          policies={filteredPolicies}
          onToggleStatus={(id) =>
            toggleStatus.mutate(id)
          }
          isUpdating={toggleStatus.isPending}
        />
      </div>
    </div>
  );
}

export default SecurityList;
