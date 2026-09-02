import type { Feature } from "../types/feature";

export const features: Feature[] = [
  {
    id: 1,
    featureCode: "FEA001",
    featureName: "Advanced Analytics",
    category: "Analytics",
    plan: "Enterprise",
    description:
      "Provides advanced analytics, insights and reporting capabilities.",
    enabledTenants: 8,
    status: "Enabled",
    createdAt: "01 Aug 2026",
  },
  {
    id: 2,
    featureCode: "FEA002",
    featureName: "AI Assistant",
    category: "AI",
    plan: "Enterprise",
    description:
      "Provides AI-assisted automation and intelligent recommendations.",
    enabledTenants: 5,
    status: "Enabled",
    createdAt: "03 Aug 2026",
  },
  {
    id: 3,
    featureCode: "FEA003",
    featureName: "Single Sign-On",
    category: "Security",
    plan: "Pro",
    description:
      "Allows secure authentication using enterprise identity providers.",
    enabledTenants: 10,
    status: "Enabled",
    createdAt: "05 Aug 2026",
  },
  {
    id: 4,
    featureCode: "FEA004",
    featureName: "API Integrations",
    category: "Integration",
    plan: "Pro",
    description:
      "Enables integration with external services and enterprise APIs.",
    enabledTenants: 9,
    status: "Enabled",
    createdAt: "08 Aug 2026",
  },
  {
    id: 5,
    featureCode: "FEA005",
    featureName: "Email Notifications",
    category: "Communication",
    plan: "All Plans",
    description:
      "Sends system alerts and workflow notifications through email.",
    enabledTenants: 12,
    status: "Enabled",
    createdAt: "10 Aug 2026",
  },
  {
    id: 6,
    featureCode: "FEA006",
    featureName: "Audit Trail",
    category: "Security",
    plan: "Enterprise",
    description:
      "Tracks administrative and user activity across the platform.",
    enabledTenants: 7,
    status: "Enabled",
    createdAt: "12 Aug 2026",
  },
  {
    id: 7,
    featureCode: "FEA007",
    featureName: "Custom Branding",
    category: "Core",
    plan: "Enterprise",
    description:
      "Allows tenants to customize logos, colors and portal branding.",
    enabledTenants: 4,
    status: "Disabled",
    createdAt: "15 Aug 2026",
  },
  {
    id: 8,
    featureCode: "FEA008",
    featureName: "Real-Time Alerts",
    category: "Communication",
    plan: "Pro",
    description:
      "Provides real-time in-app alerts for important platform events.",
    enabledTenants: 6,
    status: "Enabled",
    createdAt: "18 Aug 2026",
  },
];
