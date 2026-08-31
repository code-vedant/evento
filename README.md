# College Club & Event Management Platform

A **multi-tenant college club and event management platform** where each college club gets its own customizable subdomain and website experience while sharing a common platform, backend, and infrastructure.

The goal is to give every club a sense of **ownership and uniqueness** without requiring clubs to build or maintain their own websites.

## Concept

Each club will have its own subdomain:

```text
yourplatform.com
│
├── robotics.yourplatform.com
├── coding.yourplatform.com
├── ieee.yourplatform.com
└── photography.yourplatform.com
```

Although each subdomain represents a different club, all clubs will use the same underlying application and infrastructure.

Clubs will eventually be able to customize their branding, homepage layout, events, team information, and other website sections.

## Planned Features

* Multi-tenant club architecture
* Unique subdomain for each club
* Club-specific branding and UI
* Event creation and management
* Student event registration
* Club member management
* Role-based access control
* Customizable club websites
* Centralized platform administration

## Tech Stack

* **Next.js** — Frontend and application framework
* **TypeScript** — Type-safe development
* **Supabase** — PostgreSQL database, authentication, storage and Row Level Security
* **Tailwind CSS** — Styling
* **shadcn/ui** — UI components

## Architecture

The platform will use a shared multi-tenant architecture.

```text
                    Main Platform
                          │
                   Tenant Resolution
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       Robotics         Coding           IEEE
        Club             Club            Club
          │               │               │
          └───────────────┼───────────────┘
                          │
                     Shared Backend
                          │
                       Supabase
                          │
                    PostgreSQL + Auth
```

Each club will have its own tenant identity and data while using the same application.

## Project Status

**Status: Early Development**

The project is currently in the initial planning and architecture stage. The first development milestones will focus on the database structure, authentication, tenant management, and subdomain-based routing.

## Development Roadmap

```text
1. Project & Next.js setup
        ↓
2. Supabase database design
        ↓
3. Authentication & roles
        ↓
4. Multi-tenant architecture
        ↓
5. Subdomain routing
        ↓
6. Event management
        ↓
7. Event registration
        ↓
8. Club customization
        ↓
9. Website builder
        ↓
10. Production deployment
```

## Vision

The long-term goal is to provide colleges with a single platform where every club can have a **unique digital presence** while the college and platform administrators can manage everything centrally.

> **One platform. Multiple clubs. Each club has its own identity.**
