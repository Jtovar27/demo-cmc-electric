"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/student";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Try: student@example.com / student123");
        setLoading(false);
        return;
      }

      // Redirect based on role - check who logged in
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 grid-overlay opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FFD700]/5 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Logo href="/" size="lg" />

          <div className="flex flex-col gap-6">
            <div className="h-px w-12 bg-[#FFD700]" />
            <h2 className="text-5xl font-mono font-bold text-white tracking-tight leading-tight">
              Student<br />
              <span className="text-gradient">Portal</span>
            </h2>
            <p className="text-[#606060] font-sans leading-relaxed max-w-sm">
              Access your courses, watch lessons, track progress, and download study materials from your private portal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "4+", label: "Active Courses" },
              { value: "24/7", label: "Always Available" },
              { value: "HD", label: "Video Quality" },
              { value: "EN/ES", label: "Bilingual" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#141414] border border-[#1A1A1A] p-4">
                <div className="text-2xl font-mono font-bold text-[#FFD700]">{stat.value}</div>
                <div className="text-xs font-mono tracking-widest uppercase text-[#606060] mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Logo href="/" />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-2">
              Sign In
            </h1>
            <p className="text-sm text-[#606060] font-sans">
              Access your student portal or admin dashboard
            </p>
          </div>

          {/* Demo credentials notice */}
          <div className="bg-[#FFD700]/5 border border-[#FFD700]/20 p-4 mb-6">
            <p className="text-xs font-mono text-[#FFD700] mb-2 font-bold">DEMO CREDENTIALS</p>
            <div className="flex flex-col gap-1 text-xs font-mono text-[#A0A0A0]">
              <p>Student: student@example.com / student123</p>
              <p>Admin: admin@cmcelectric.com / admin123</p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/20 p-4 mb-6">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400 font-mono">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <Input
                label="Email"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Mail className="absolute right-3 top-8 h-4 w-4 text-[#404040]" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-[#404040] hover:text-[#A0A0A0] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={<Lock className="h-4 w-4" />}
              className="w-full mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#1A1A1A] flex flex-col gap-4">
            <p className="text-xs text-center font-mono text-[#606060]">
              Don&apos;t have an account?{" "}
              <Link href="/es/contacto" className="text-[#FFD700] hover:underline">
                Contact us to enroll
              </Link>
            </p>
            <Link href="/" className="text-center text-xs font-mono text-[#404040] hover:text-[#606060] transition-colors">
              Back to main site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <LoginForm />
    </Suspense>
  );
}
