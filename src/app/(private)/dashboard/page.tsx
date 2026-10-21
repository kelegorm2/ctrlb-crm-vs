import Link from "next/link";
import { SignOutButton } from "@/components/sign-out-button";
import { requireUser } from "@/lib/auth-guard";

export default async function DashboardPage() {
  const session = await requireUser();

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Project starter
        </Link>
        <SignOutButton />
      </header>
      <section className="content-panel">
        <p className="eyebrow">PRIVATE AREA</p>
        <h1>Welcome, {session.user.name}</h1>
        <p className="muted">
          You are signed in as{" "}
          <strong>{session.user.username ?? session.user.email}</strong> with
          the <strong>{session.user.role}</strong> role.
        </p>
        {session.user.role === "admin" ? (
          <Link className="button" href="/admin">
            Open admin area
          </Link>
        ) : (
          <p className="role-note">
            Admin-only tools are available to accounts with the admin role.
          </p>
        )}
      </section>
    </main>
  );
}
