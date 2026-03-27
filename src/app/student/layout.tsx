import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { StudentSidebar } from "@/components/student/StudentSidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login?callbackUrl=/student");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <StudentSidebar user={session.user} />
      <main className="flex-1 overflow-x-hidden lg:ml-64">{children}</main>
    </div>
  );
}
