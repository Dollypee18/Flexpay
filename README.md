# FlexPay — Freelancer Invoice & Payment Platform

A full-stack fintech web application built to demonstrate production-level frontend engineering skills.

🔗 **Live Demo:** (https://flexpay-hazel.vercel.app/)

---

## Test Credentials

| Role       | Email            | Password    |
| ---------- | ---------------- | ----------- |
| Freelancer | ada@example.com  | password123 |
| Admin      | admin@flexpay.io | admin123    |

---

## Features

- **Authentication** — Login, signup, persistent sessions, route protection
- **Onboarding** — Multi-step KYC flow with progress tracking
- **Dashboard** — Wallet balance, invoice stats, recent transactions
- **Invoices** — Create, filter, search, and mark as paid
- **Transactions** — Paginated history with status filters and search
- **Admin Panel** — KYC approvals, user management, invoice overview
- **Optimistic UI** — Instant updates with automatic rollback on failure
- **Skeleton Loaders** — Production-style loading states
- **Collapsible Sidebar** — Clean, space-efficient navigation

---

## Tech Stack

| Layer         | Technology                   |
| ------------- | ---------------------------- |
| Framework     | Next.js 16 (App Router)      |
| Language      | TypeScript                   |
| Styling       | Tailwind CSS + Inline Styles |
| State         | Zustand                      |
| Data Fetching | React Query                  |
| HTTP          | Axios                        |
| Auth          | localStorage + Route Guards  |
| Deployment    | Vercel                       |

---

## Architecture

src/
├── app/ # Next.js App Router pages
│ ├── (auth)/ # Login, Signup
│ ├── (dashboard)/ # Dashboard, Invoices, Transactions, Onboarding
│ ├── (admin)/ # Admin panel
│ └── api/ # Mock API routes
├── components/
│ ├── ui/ # Reusable: Button, Input, Badge, Modal, Table...
│ ├── layout/ # DashboardLayout, AuthLayout, RouteGuard
│ ├── dashboard/ # StatsCard, RecentActivity
│ ├── invoices/ # InvoiceForm, InvoiceActions
│ ├── onboarding/ # StepPersonal, StepBusiness, StepIdentity, StepReview
│ └── admin/ # UserTable, KycActions
├── hooks/ # useAuth, useInvoices, useTransactions, useSearch
├── services/ # authService, invoiceService, paymentService...
├── store/ # Zustand: authStore, invoiceStore, walletStore...
├── lib/ # axios, queryClient, mockData, format utils
└── types/ # Global TypeScript interfaces

---

## Key Engineering Decisions

- **Route groups** `(auth)`, `(dashboard)`, `(admin)` — logical separation without affecting URLs
- **Optimistic UI** — UI updates instantly, rolls back on failure
- **Service layer** — all API logic isolated from components
- **Derived state** — filters computed from single source of truth, no duplicate arrays
- **Zustand** over Redux — simpler, less boilerplate, same power for this scale

---

## Local Development

```bash
git clone https://github.com/Dollypee18
cd flexpay
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
