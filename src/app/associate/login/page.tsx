"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { signInAction, signUpAction, signInWithGoogleAction } from "@/lib/actions/auth";

export default function AssociateLoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLogin, setIsLogin] = useState(true); // Always true for associate

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const result = await signInAction({ 
          email: formData.email, 
          password: formData.password,
          expectedRole: "ASSOCIATE"
        });

        if (result.success) {
          router.push("/associate");
          router.refresh();
        } else {
          setError(result.error || "Something went wrong");
        }
      } catch {
        // signIn may throw NEXT_REDIRECT which is expected
        router.push("/associate");
        router.refresh();
      }
    });
  };

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      // Not allowed for associates in this demo
      setError("Google sign-in is disabled for associates");
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 pt-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-primary/8 blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-xl font-bold text-foreground">SVH</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Nutrition Club
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="glass-strong glow-green rounded-3xl p-8 shadow-premium-lg">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Associate Login
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to access your associate dashboard
          </p>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Signup hidden for associates */}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  disabled={isPending}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-12 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-emerald-500/25 hover:shadow-xl disabled:opacity-60"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-all hover:bg-muted disabled:opacity-50"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Guest access */}
          <Link
            href="/"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
          >
            Continue as Guest
          </Link>

          {/* Demo credentials hint */}
          <div className="mt-4 rounded-xl bg-primary/5 border border-primary/10 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">Demo Credentials</p>
            <div className="space-y-0.5 text-xs text-muted-foreground">
              <p>👤 <span className="font-mono font-medium text-foreground">demo@svh.com</span> / <span className="font-mono font-medium text-foreground">demo123</span></p>
              <p>🔑 <span className="font-mono font-medium text-foreground">admin@svh.com</span> / <span className="font-mono font-medium text-foreground">demo123</span></p>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
