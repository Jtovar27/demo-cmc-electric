import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/student");

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <AdminSidebar user={session.user} />
      <main className="flex-1 overflow-x-hidden lg:ml-64">{children}</main>
    </div>
  );
}
