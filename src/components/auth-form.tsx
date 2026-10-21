"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "login" | "signup";
  googleEnabled: boolean;
};

export function AuthForm({ mode, googleEnabled }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username"));
    const password = String(formData.get("password"));

    try {
      const result =
        mode === "login"
          ? await authClient.signIn.username({
              username,
              password,
              callbackURL: "/dashboard",
            })
          : await authClient.signUp.email({
              name: String(formData.get("name")),
              email: String(formData.get("email")),
              username,
              password,
              callbackURL: "/dashboard",
            });

      if (result.error) {
        setError(result.error.message ?? "Authentication failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to reach the authentication service. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setPending(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      if (result.error) {
        setError(result.error.message ?? "Google sign-in failed.");
        setPending(false);
      }
    } catch {
      setError("Unable to start Google sign-in. Please try again.");
      setPending(false);
    }
  }

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <label>
              Name
              <input autoComplete="name" name="name" required />
            </label>
            <label>
              Email
              <input
                autoComplete="email"
                name="email"
                required
                type="email"
              />
            </label>
          </>
        )}
        <label>
          Username
          <input
            autoComplete="username"
            name="username"
            required
          />
        </label>
        <label>
          Password
          <input
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={8}
            name="password"
            required
            type="password"
          />
        </label>
        {error && (
          <p aria-live="polite" className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-full" disabled={pending} type="submit">
          {pending
            ? "Please wait..."
            : mode === "login"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>
      {googleEnabled && mode === "login" && (
        <>
          <div className="separator">
            <span>or</span>
          </div>
          <button
            className="button button-secondary button-full"
            disabled={pending}
            onClick={handleGoogleSignIn}
            type="button"
          >
            Continue with Google
          </button>
        </>
      )}
    </div>
  );
}
