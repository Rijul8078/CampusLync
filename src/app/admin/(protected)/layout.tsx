import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { hasAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasAdminSession())) redirect("/admin/login");
  return (
    <section className="admin-shell container">
      <header className="admin-header">
        <Link href="/admin" className="admin-title">
          <LayoutDashboard size={21} /> CampusLync Admin
        </Link>
        <form method="post" action="/api/admin/logout">
          <button type="submit" className="admin-logout">
            <LogOut size={16} /> Sign out
          </button>
        </form>
      </header>
      {children}
    </section>
  );
}
