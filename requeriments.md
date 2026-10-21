# Template to start a project using Next.js, Better Auth, and Prisma

This template uses the following versions:

- Node 24.21.0
- PNPM 12.11.2
- Next.js 16.4.0
- Better Auth 1.7.7
- Prisma ORM 7.10.0 (latest stable version compatible with Better Auth)
- MySQL 8.4 (Docker Compose for local development)

Assume Node.js and pnpm are already installed.

This template has the following features:

- A public area ready for development
- A private area with role-based access (user and admin initially, with room to add more roles)
- Username and password authentication by default, with optional Google authentication
- Local MySQL data persisted in a `db/` folder excluded from Git
