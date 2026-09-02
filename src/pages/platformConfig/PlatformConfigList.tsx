import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PlatformConfigFilters from "../../components/platformConfig/PlatformConfigFilters";
import PlatformConfigTable from "../../components/platformConfig/PlatformConfigTable";

import { usePlatformConfigs } from "../../hooks/platformConfig/usePlatformConfigs";
import { useTogglePlatformConfigStatus } from "../../hooks/platformConfig/useTogglePlatformConfigStatus";

function PlatformConfigList() {
  const {
    data: configs = [],
    isLoading,
    isError,
  } = usePlatformConfigs();

  const toggleStatus =
    useTogglePlatformConfigStatus();

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All");

  const [environment, setEnvironment] =
    useState("Any");

  const [status, setStatus] =
    useState("All");

  const filteredConfigs = useMemo(() => {
    const text =
      search.toLowerCase().trim();

    return configs.filter((config) => {
      const matchesSearch =
        config.configName
          .toLowerCase()
          .includes(text) ||
        config.configCode
          .toLowerCase()
          .includes(text) ||
        config.configValue
          .toLowerCase()
          .includes(text);

      const matchesCategory =
        category === "All" ||
        config.category === category;

      const matchesEnvironment =
        environment === "Any" ||
        config.environment === environment;

      const matchesStatus =
        status === "All" ||
        config.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesEnvironment &&
        matchesStatus
      );
    });
  }, [
    configs,
    search,
    category,
    environment,
    status,
  ]);

  const activeCount = configs.filter(
    (config) =>
      config.status === "Active"
  ).length;

  const inactiveCount = configs.filter(
    (config) =>
      config.status === "Inactive"
  ).length;

  const productionCount = configs.filter(
    (config) =>
      config.environment ===
      "Production"
  ).length;

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading configurations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="config-empty">
        <h3>
          Unable to load configurations
        </h3>

        <p>Please try again.</p>
      </div>
    );
  }

  return (
    <div className="config-page">
      <div className="config-page-header">
        <div>
          <h1>Platform Configuration</h1>

          <p>
            Manage global platform settings,
            environments and system
            configuration.
          </p>
        </div>

        <Link
          to="/platform-config/create"
          className="config-create-button"
        >
          + Add Configuration
        </Link>
      </div>

      <div className="config-summary">
        <div>
          <span>
            Total Configurations
          </span>

          <strong>
            {configs.length}
          </strong>
        </div>

        <div>
          <span>Active</span>

          <strong className="config-count-active">
            {activeCount}
          </strong>
        </div>

        <div>
          <span>Inactive</span>

          <strong className="config-count-inactive">
            {inactiveCount}
          </strong>
        </div>

        <div>
          <span>
            Production Settings
          </span>

          <strong className="config-count-production">
            {productionCount}
          </strong>
        </div>
      </div>

      <PlatformConfigFilters
        search={search}
        category={category}
        environment={environment}
        status={status}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onEnvironmentChange={setEnvironment}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch("");
          setCategory("All");
          setEnvironment("Any");
          setStatus("All");
        }}
      />

      <div className="config-results">
        {filteredConfigs.length} results
      </div>

      <PlatformConfigTable
        configs={filteredConfigs}
        isUpdating={
          toggleStatus.isPending
        }
        onToggleStatus={(id) =>
          toggleStatus.mutate(id)
        }
      />
    </div>
  );
}

export default PlatformConfigList;
