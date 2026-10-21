import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
  );

  return (
    <main className="auth-shell">
      <Link className="wordmark" href="/">
        Project starter
      </Link>
      <section className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in</h1>
        <p className="muted">Use your username and password to continue.</p>
        <AuthForm mode="login" googleEnabled={googleEnabled} />
        <p className="auth-footer">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}

