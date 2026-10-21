import Link from "next/link";
import { requireAdmin } from "@/lib/auth-guard";

export default async function AdminPage() {
  const session = await requireAdmin();

  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Project starter
        </Link>
        <nav aria-label="Admin navigation" className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <section className="content-panel">
        <p className="eyebrow">ADMIN AREA</p>
        <h1>Admin tools</h1>
        <p className="muted">
          This page is only rendered for accounts with the admin role. Signed in
          as {session.user.name}.
        </p>
      </section>
    </main>
  );
}

