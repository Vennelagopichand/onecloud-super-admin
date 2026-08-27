import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import TenantStats from "../../components/tenants/TenantStats";
import Toast from "../../components/common/Toast";

import { useTenant } from "../../hooks/useTenant";
import { useTenantStats } from "../../hooks/useTenantStats";
import { useActivateTenant } from "../../hooks/useActivateTenant";
import { useDeactivateTenant } from "../../hooks/useDeactivateTenant";

function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const tenantId = Number(id);

  const {
    data: tenant,
    isLoading,
    isError,
    error,
  } = useTenant(tenantId);

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useTenantStats(tenantId);

  const activateTenant = useActivateTenant();
  const deactivateTenant = useDeactivateTenant();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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

  if (!id || Number.isNaN(tenantId)) {
    return (
      <div className="error-state">
        Invalid tenant ID.

        <button
          className="back-to-tenants-button"
          onClick={() => navigate("/tenants")}
        >
          Back to Tenants
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading tenant details...
      </div>
    );
  }

  if (isError || !tenant) {
    return (
      <div className="error-state">
        {error instanceof Error
          ? error.message
          : "Unable to load tenant."}

        <button
          className="back-to-tenants-button"
          onClick={() => navigate("/tenants")}
        >
          Back to Tenants
        </button>
      </div>
    );
  }

  // ACTIVATE TENANT
  const handleActivate = () => {
    activateTenant.mutate(tenant.id, {
      onSuccess: (updatedTenant) => {
        showToast(
          `${updatedTenant.tenantName} activated successfully`
        );
      },

      onError: (error) => {
        showToast(
          error instanceof Error
            ? error.message
            : "Activation failed",
          "error"
        );
      },
    });
  };

  // DEACTIVATE TENANT
  const handleDeactivate = () => {
    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${tenant.tenantName}?`
    );

    if (!confirmed) {
      return;
    }

    deactivateTenant.mutate(tenant.id, {
      onSuccess: (updatedTenant) => {
        showToast(
          `${updatedTenant.tenantName} deactivated successfully`
        );
      },

      onError: (error) => {
        showToast(
          error instanceof Error
            ? error.message
            : "Deactivation failed",
          "error"
        );
      },
    });
  };

  return (
    <div className="tenant-details-page">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      {/* Back Button */}
      <div className="tenant-details-top">
        <button
          className="back-button"
          onClick={() => navigate("/tenants")}
        >
          ← Back to Tenants
        </button>

        {/* Tenant Main Header */}
        <div className="details-heading-row">
          <div className="details-heading">
            <div className="details-logo">
              {tenant.tenantName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <div className="tenant-title-row">
                <h1>{tenant.tenantName}</h1>

                <span
                  className={
                    tenant.status === "Active"
                      ? "status active-status"
                      : "status inactive-status"
                  }
                >
                  <span className="status-dot" />

                  {tenant.status}
                </span>
              </div>

              <p>
                Tenant Code:{" "}
                <strong>
                  {tenant.tenantCode}
                </strong>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="details-top-actions">
            <Link
              to={`/tenants/${tenant.id}/edit`}
              className="secondary-button"
            >
              Edit Tenant
            </Link>

            {tenant.status === "Active" ? (
              <button
                type="button"
                className="danger-button"
                onClick={handleDeactivate}
                disabled={deactivateTenant.isPending}
              >
                {deactivateTenant.isPending
                  ? "Deactivating..."
                  : "Deactivate Tenant"}
              </button>
            ) : (
              <button
                type="button"
                className="success-button"
                onClick={handleActivate}
                disabled={activateTenant.isPending}
              >
                {activateTenant.isPending
                  ? "Activating..."
                  : "Activate Tenant"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="tenant-details-layout">
        {/* Tenant Information */}
        <div className="tenant-information-card">
          <div className="details-card-header">
            <div>
              <h2>Tenant Information</h2>

              <p>
                Basic tenant and administrator information.
              </p>
            </div>
          </div>

          <div className="tenant-info-grid">
            <div className="info-item">
              <span>Admin</span>
              <strong>
                {tenant.adminName}
              </strong>
            </div>

            <div className="info-item">
              <span>Email</span>
              <strong>
                {tenant.adminEmail}
              </strong>
            </div>

            <div className="info-item">
              <span>Phone</span>
              <strong>
                {tenant.phone || "-"}
              </strong>
            </div>

            <div className="info-item">
              <span>Created</span>
              <strong>
                {tenant.createdAt}
              </strong>
            </div>

            <div className="info-item">
              <span>Subscription</span>

              <strong>
                <span
                  className={`plan-badge plan-${tenant.subscription.toLowerCase()}`}
                >
                  {tenant.subscription}
                </span>
              </strong>
            </div>

            <div className="info-item">
              <span>Country</span>
              <strong>
                {tenant.country}
              </strong>
            </div>

            <div className="info-item">
              <span>Time Zone</span>
              <strong>
                {tenant.timeZone}
              </strong>
            </div>

            <div className="info-item">
              <span>Status</span>

              <strong>
                <span
                  className={
                    tenant.status === "Active"
                      ? "status active-status"
                      : "status inactive-status"
                  }
                >
                  <span className="status-dot" />
                  {tenant.status}
                </span>
              </strong>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="tenant-side-card">
          <div className="details-card-header">
            <div>
              <h2>Account Overview</h2>

              <p>
                Tenant account summary.
              </p>
            </div>
          </div>

          <div className="overview-list">
            <div>
              <span>Tenant ID</span>

              <strong>
                #{tenant.id}
              </strong>
            </div>

            <div>
              <span>Tenant Code</span>

              <strong>
                {tenant.tenantCode}
              </strong>
            </div>

            <div>
              <span>Plan</span>

              <strong>
                {tenant.subscription}
              </strong>
            </div>

            <div>
              <span>Account</span>

              <strong
                className={
                  tenant.status === "Active"
                    ? "summary-active"
                    : "summary-inactive"
                }
              >
                {tenant.status}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="tenant-statistics-section">
        <div className="section-heading">
          <div>
            <h2>Statistics</h2>

            <p>
              Tenant usage and organization statistics.
            </p>
          </div>
        </div>

        {statsLoading ? (
          <div className="loading-state">
            Loading tenant statistics...
          </div>
        ) : statsError ? (
          <div className="error-state">
            Unable to load tenant statistics.
          </div>
        ) : stats ? (
          <TenantStats stats={stats} />
        ) : (
          <div className="error-state">
            Statistics not available.
          </div>
        )}
      </div>

      {/* Storage */}
      <div className="tenant-storage-card">
        <div className="storage-heading">
          <div>
            <h3>Storage Usage</h3>

            <p>
              Current tenant storage utilization.
            </p>
          </div>

          <strong>
            {tenant.storage}%
          </strong>
        </div>

        <div className="details-storage-track">
          <div
            className="details-storage-value"
            style={{
              width: `${tenant.storage}%`,
            }}
          />
        </div>

        <div className="storage-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

export default TenantDetails;
