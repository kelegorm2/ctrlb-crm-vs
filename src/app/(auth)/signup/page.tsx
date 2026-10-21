import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="auth-shell">
      <Link className="wordmark" href="/">
        Project starter
      </Link>
      <section className="auth-card">
        <p className="eyebrow">CREATE YOUR ACCOUNT</p>
        <h1>Get started</h1>
        <p className="muted">Your new account starts with the user role.</p>
        <AuthForm mode="signup" googleEnabled={false} />
        <p className="auth-footer">
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

