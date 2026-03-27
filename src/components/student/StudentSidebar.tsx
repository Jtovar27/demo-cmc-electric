"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { getInitials } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

interface StudentSidebarProps {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: string;
  };
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
  { icon: BookOpen, label: "My Courses", href: "/student/cursos" },
  { icon: User, label: "Profile", href: "/student/perfil" },
];

export function StudentSidebar({ user }: StudentSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0A0A0A] border-r border-[#1A1A1A] flex flex-col z-30 hidden lg:flex">
        {/* Logo */}
        <div className="p-5 border-b border-[#1A1A1A]">
          <Logo href="/student" size="sm" />
        </div>

        {/* Portal label */}
        <div className="px-5 py-3 border-b border-[#1A1A1A]">
          <span className="text-[9px] font-mono tracking-[0.25em] text-[#FFD700] uppercase">
            Student Portal
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/student"
                  ? pathname === "/student"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-[#FFD700]/10 border-l-2 border-[#FFD700] text-[#FFD700]"
                      : "border-l-2 border-transparent text-[#A0A0A0] hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[#1A1A1A]">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-sm font-mono tracking-wide text-[#606060] hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4 flex-shrink-0" />
              Main Site
            </Link>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-[#1A1A1A]">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-mono font-bold text-[#FFD700]">
                {getInitials(user.name || user.email)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono text-white truncate">
                {user.name || "Student"}
              </p>
              <p className="text-[10px] font-mono text-[#606060] truncate">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono tracking-wide text-[#606060] hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#0A0A0A] border-b border-[#1A1A1A] h-14 flex items-center justify-between px-4">
        <Logo href="/student" size="sm" />
        <div className="flex items-center gap-2 text-xs font-mono text-[#606060]">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center h-8 w-8 transition-colors",
                  isActive ? "text-[#FFD700]" : "text-[#606060] hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            );
          })}
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center justify-center h-8 w-8 text-[#606060] hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
