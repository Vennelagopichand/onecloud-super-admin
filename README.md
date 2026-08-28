# Super Admin Portal

A responsive **Super Admin Dashboard & Tenant Management System** built using React, TypeScript, Vite, and TanStack Query.

## Features

### Global Dashboard
- Total Tenants
- Active Tenants
- Inactive Tenants
- Total Users
- Active Licenses
- Platform Health
- Tenant Growth Analytics
- Active vs Inactive Tenant Analytics
- Recent Activities

### Tenant Management
- View tenant list
- Search by tenant name/code
- Filter by status
- Filter by subscription plan
- Sort tenants
- Pagination
- Create tenant
- View tenant details
- Edit tenant
- Activate tenant
- Deactivate tenant

## TanStack Query

TanStack Query is used for tenant state management, caching, mutations, and query invalidation.

Main hooks include:

- `useTenants()`
- `useTenant(id)`
- `useCreateTenant()`
- `useUpdateTenant()`
- `useActivateTenant()`
- `useDeactivateTenant()`

Tenant data is currently read from a local array instead of an external API server.

## Technologies

- React
- TypeScript
- Vite
- TanStack Query
- React Router
- CSS
- Netlify

