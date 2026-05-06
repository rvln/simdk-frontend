import React, { Suspense } from "react";
import LoginForm from "./LoginForm";

/**
 * Login Page — Server Component shell.
 *
 * LoginForm uses useSearchParams() which REQUIRES a <Suspense> boundary
 * per Next.js App Router static rendering rules.
 */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-surface-container-low" />
          <div className="h-10 w-72 rounded bg-surface-container-low" />
          <div className="h-4 w-full max-w-md rounded bg-surface-container-low" />
          <div className="space-y-4 mt-8">
            <div className="h-12 w-full rounded bg-surface-container-low" />
            <div className="h-12 w-full rounded bg-surface-container-low" />
            <div className="h-14 w-full rounded-xl bg-surface-container-low" />
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
