# Super Admin Portal

A responsive **Super Admin Dashboard & Tenant Management** application built using React, TypeScript, and TanStack Query.

## Features

* Global Dashboard
* KPI Cards
* Platform Health
* Analytics
* Recent Activities
* Tenant List
* Search & Filters
* Sorting & Pagination
* Create Tenant
* View Tenant
* Edit Tenant
* Activate / Deactivate Tenant
* Form Validation
* Loading & Error States
* TanStack Query Caching
* Query Invalidation
* Responsive UI

## Tech Stack

* React
* TypeScript
* Vite
* TanStack Query
* React Router
* CSS

## Data

Tenant data is stored in a **local TypeScript array**. No backend/API server is required.

TanStack Query is used for:

* `useTenants()`
* `useTenant(id)`
* `useTenantStats(id)`
* `useCreateTenant()`
* `useUpdateTenant()`
* `useActivateTenant()`
* `useDeactivateTenant()`

## Run Project

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```


