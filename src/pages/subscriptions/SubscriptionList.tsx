import {
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

import SubscriptionFilters from "../../components/subscriptions/SubscriptionFilters";
import SubscriptionTable from "../../components/subscriptions/SubscriptionTable";

import { useSubscriptions } from "../../hooks/subscriptions/useSubscriptions";
import { useToggleSubscriptionStatus } from "../../hooks/subscriptions/useToggleSubscriptionStatus";

function SubscriptionList() {
  const {
    data: subscriptions = [],
    isLoading,
    isError,
  } = useSubscriptions();

  const toggleStatus =
    useToggleSubscriptionStatus();

  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("All");
  const [billing, setBilling] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredSubscriptions = useMemo(() => {
    const text = search.toLowerCase().trim();

    return subscriptions.filter((subscription) => {
      const matchesSearch =
        subscription.tenantName
          .toLowerCase()
          .includes(text) ||
        subscription.subscriptionCode
          .toLowerCase()
          .includes(text);

      const matchesPlan =
        plan === "All" ||
        subscription.plan === plan;

      const matchesBilling =
        billing === "All" ||
        subscription.billingCycle === billing;

      const matchesStatus =
        status === "All" ||
        subscription.status === status;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesBilling &&
        matchesStatus
      );
    });
  }, [
    subscriptions,
    search,
    plan,
    billing,
    status,
  ]);

  const activeCount = subscriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const suspendedCount = subscriptions.filter(
    (item) => item.status === "Suspended"
  ).length;

  const totalLicenses = subscriptions.reduce(
    (total, item) =>
      total + item.totalLicenses,
    0
  );

  const usedLicenses = subscriptions.reduce(
    (total, item) =>
      total + item.usedLicenses,
    0
  );

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading subscriptions...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="subscription-empty">
        <h3>
          Unable to load subscriptions
        </h3>
        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className="subscription-page">
      <div className="subscription-page-header">
        <div>
          <h1>
            Subscription & License
          </h1>

          <p>
            Manage tenant subscriptions,
            plans, billing and license usage.
          </p>
        </div>

        <Link
          to="/subscriptions/create"
          className="subscription-create-button"
        >
          + Create Subscription
        </Link>
      </div>

      <div className="subscription-summary">
        <div>
          <span>Total Subscriptions</span>
          <strong>
            {subscriptions.length}
          </strong>
        </div>

        <div>
          <span>Active</span>
          <strong className="subscription-count-active">
            {activeCount}
          </strong>
        </div>

        <div>
          <span>Suspended</span>
          <strong className="subscription-count-suspended">
            {suspendedCount}
          </strong>
        </div>

        <div>
          <span>License Usage</span>
          <strong className="subscription-count-license">
            {usedLicenses}/{totalLicenses}
          </strong>
        </div>
      </div>

      <SubscriptionFilters
        search={search}
        plan={plan}
        billing={billing}
        status={status}
        onSearchChange={setSearch}
        onPlanChange={setPlan}
        onBillingChange={setBilling}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch("");
          setPlan("All");
          setBilling("All");
          setStatus("All");
        }}
      />

      <div className="subscription-results">
        {filteredSubscriptions.length} results
      </div>

      <SubscriptionTable
        subscriptions={filteredSubscriptions}
        isUpdating={toggleStatus.isPending}
        onToggleStatus={(id) =>
          toggleStatus.mutate(id)
        }
      />
    </div>
  );
}

export default SubscriptionList;
