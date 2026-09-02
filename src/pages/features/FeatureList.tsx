import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import FeatureFilters from "../../components/features/FeatureFilters";
import FeatureTable from "../../components/features/FeatureTable";

import { useFeatures } from "../../hooks/features/useFeatures";
import { useToggleFeatureStatus } from "../../hooks/features/useToggleFeatureStatus";

function FeatureList() {
  const {
    data: features = [],
    isLoading,
    isError,
  } = useFeatures();

  const toggleFeature =
    useToggleFeatureStatus();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [category, setCategory] =
    useState("All");

  const [plan, setPlan] =
    useState("All");

  const filteredFeatures = useMemo(() => {
    const text =
      search.toLowerCase().trim();

    return features.filter((feature) => {
      const matchesSearch =
        feature.featureName
          .toLowerCase()
          .includes(text) ||
        feature.featureCode
          .toLowerCase()
          .includes(text) ||
        feature.description
          .toLowerCase()
          .includes(text);

      const matchesStatus =
        status === "All" ||
        feature.status === status;

      const matchesCategory =
        category === "All" ||
        feature.category === category;

      const matchesPlan =
        plan === "All" ||
        feature.plan === plan;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPlan
      );
    });
  }, [
    features,
    search,
    status,
    category,
    plan,
  ]);

  const enabledCount =
    features.filter(
      (feature) =>
        feature.status === "Enabled"
    ).length;

  const disabledCount =
    features.filter(
      (feature) =>
        feature.status === "Disabled"
    ).length;

  const enterpriseCount =
    features.filter(
      (feature) =>
        feature.plan === "Enterprise"
    ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading features...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="feature-empty">
        <h3>
          Unable to load features
        </h3>
        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className="feature-page">
      <div className="feature-page-header">
        <div>
          <h1>
            Feature Management
          </h1>

          <p>
            Manage platform features,
            plans and tenant availability.
          </p>
        </div>

        <Link
          to="/features/create"
          className="feature-create-button"
        >
          + Create Feature
        </Link>
      </div>

      <div className="feature-summary">
        <div>
          <span>Total Features</span>
          <strong>
            {features.length}
          </strong>
        </div>

        <div>
          <span>Enabled</span>
          <strong className="feature-count-enabled">
            {enabledCount}
          </strong>
        </div>

        <div>
          <span>Disabled</span>
          <strong className="feature-count-disabled">
            {disabledCount}
          </strong>
        </div>

        <div>
          <span>Enterprise</span>
          <strong className="feature-count-enterprise">
            {enterpriseCount}
          </strong>
        </div>
      </div>

      <FeatureFilters
        search={search}
        status={status}
        category={category}
        plan={plan}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onCategoryChange={setCategory}
        onPlanChange={setPlan}
        onReset={() => {
          setSearch("");
          setStatus("All");
          setCategory("All");
          setPlan("All");
        }}
      />

      <div className="feature-results">
        {filteredFeatures.length} results
      </div>

      <FeatureTable
        features={filteredFeatures}
        isUpdating={
          toggleFeature.isPending
        }
        onToggleStatus={(id) =>
          toggleFeature.mutate(id)
        }
      />
    </div>
  );
}

export default FeatureList;
