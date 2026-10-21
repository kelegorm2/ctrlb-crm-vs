"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setError("");
    setPending(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message ?? "Sign out failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="sign-out">
      {error && (
        <p aria-live="polite" className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-secondary button-small"
        disabled={pending}
        onClick={handleSignOut}
        type="button"
      >
        {pending ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}

