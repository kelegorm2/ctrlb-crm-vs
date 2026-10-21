import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">
          Project starter
        </Link>
        <nav aria-label="Main navigation" className="nav-links">
          <Link href="/login">Sign in</Link>
          <Link className="button button-small" href="/signup">
            Create account
          </Link>
        </nav>
      </header>

      <section className="hero">
        <p className="eyebrow">NEXT.JS · BETTER AUTH · PRISMA</p>
        <h1>A solid starting point for your next project.</h1>
        <p className="hero-copy">
          Build your public experience, then add authenticated features with
          user and admin access already in place.
        </p>
        <div className="button-row">
          <Link className="button" href="/signup">
            Get started
          </Link>
          <Link className="button button-secondary" href="/dashboard">
            Open dashboard
          </Link>
        </div>
      </section>

      <section aria-label="Starter features" className="feature-grid">
        <article className="feature-card">
          <span className="feature-number">01</span>
          <h2>Public by default</h2>
          <p>
            A clean public landing page ready for your product, content, and
            future routes.
          </p>
        </article>
        <article className="feature-card">
          <span className="feature-number">02</span>
          <h2>Authentication included</h2>
          <p>
            Username and password sign-in, with optional Google sign-in when
            credentials are configured.
          </p>
        </article>
        <article className="feature-card">
          <span className="feature-number">03</span>
          <h2>Roles that scale</h2>
          <p>
            User pages and an admin-only area are protected on the server, not
            just hidden in the interface.
          </p>
        </article>
      </section>
    </main>
  );
}

