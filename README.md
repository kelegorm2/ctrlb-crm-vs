# Next.js + Better Auth + Prisma starter

A reusable starter for projects that need a public site, username/password
authentication, role-protected pages, and a MySQL database in development.

## Requirements

- Node.js 24.21.0
- pnpm 12.11.2
- Docker with Docker Compose

The template pins Next.js 16.4.0 and Better Auth 1.7.7. It uses the latest
stable Prisma 7 release supported by Better Auth's Prisma adapter.

## Get started

1. Install dependencies:

   ```powershell
   pnpm install
   ```

2. Create your local environment file and set a unique Better Auth secret:

   ```powershell
   Copy-Item .env.example .env
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

   Put the generated value in `BETTER_AUTH_SECRET` in `.env`. The MySQL values
   in `.env.example` are local development defaults; change them together if
   you customize the database credentials.

3. Start MySQL:

   ```powershell
   docker compose up -d
   ```

   MySQL stores its files under `db/mysql/`, which is excluded from Git.
   The compose setup also creates a separate `app_shadow` database for Prisma
   development migrations. `SHADOW_DATABASE_URL` uses the local MySQL root
   account only for that migration task; the app itself connects as `app`.

4. Apply the initial migration and generate the Prisma Client:

   ```powershell
   pnpm prisma migrate dev
   ```

5. Start the app:

   ```powershell
   pnpm dev
   ```

Visit `http://localhost:3000`. The public home page is ready to customize.

## Included areas

- `/` - public landing page
- `/login` - sign in with username and password
- `/signup` - create an account with username, email, name, and password
- `/dashboard` - requires a signed-in user
- `/admin` - requires the `admin` role

New users receive the `user` role. After the account to promote has signed up,
run:

```powershell
pnpm user:promote-admin -- user@example.com
```

The script updates only an existing account and reports an error if the email
does not match a user.

## Optional Google sign-in

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env` to enable Google
sign-in. Configure the OAuth application's redirect URL as
`http://localhost:3000/api/auth/callback/google`, then restart the dev server.
Leave both variables empty to keep Google sign-in disabled.

## Useful commands

```powershell
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm prisma migrate dev
pnpm prisma generate
pnpm docker:down
```

`docker:down` stops MySQL but preserves its files under `db/mysql/`. To remove
the local development database and its data, use `docker compose down -v` and
remove `db/mysql/` yourself.

## Adapting the template

- Update the app name, branding, and public page in `src/app/page.tsx`.
- Add authenticated pages under `src/app/(private)/`.
- Define additional role values and authorization rules in
  `src/lib/auth.ts` and the server-side guards in `src/lib/auth-guard.ts`.
- Update the Prisma schema in `prisma/schema.prisma`, then create a migration
  with `pnpm prisma migrate dev --name <change>`.
- Keep `.env` and `db/` local; neither should be committed.
- In production, use a dedicated migration strategy and do not reuse the local
  MySQL root credentials or development shadow database.
