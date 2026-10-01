import { redirect } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { adminAuthConfigured, hasAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin sign in | CampusLync",
  robots: { index: false, follow: false },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasAdminSession()) redirect("/admin");
  const error = (await searchParams).error;
  return (
    <section className="admin-login-page container">
      <div className="admin-login-card">
        <span className="admin-login-icon">
          <LockKeyhole size={27} />
        </span>
        <p className="eyebrow">CampusLync administration</p>
        <h1>Sign in securely.</h1>
        <p>
          Access website operations, content status and integration readiness.
        </p>
        {!adminAuthConfigured ? (
          <div className="admin-alert" role="alert">
            Admin access is disabled. Configure the three required admin
            environment variables before signing in.
          </div>
        ) : error === "invalid" ? (
          <div className="admin-alert admin-alert-error" role="alert">
            The username or password was not accepted.
          </div>
        ) : null}
        <form
          method="post"
          action="/api/admin/login"
          className="admin-login-form"
        >
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            disabled={!adminAuthConfigured}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={!adminAuthConfigured}
          />
          <button
            className="button"
            type="submit"
            disabled={!adminAuthConfigured}
          >
            Sign in <ShieldCheck size={17} />
          </button>
        </form>
        <small>
          Sessions expire after eight hours and use an HTTP-only signed cookie.
        </small>
      </div>
    </section>
  );
}
