"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  RefreshCw,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import Link from "next/link";

type LoginMethod = "email" | "phone";

export default function LoginPage() {
  const [method, setMethod] = useState<LoginMethod>("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);
  const [error, setError] = useState("");

  const captchaQuestion = useMemo(() => {
    const questions = [
      { question: "7 + 5", answer: "12" },
      { question: "9 - 4", answer: "5" },
      { question: "6 + 8", answer: "14" },
      { question: "15 - 7", answer: "8" },
      { question: "4 × 3", answer: "12" },
    ];

    return questions[captchaKey % questions.length];
  }, [captchaKey]);

  const refreshCaptcha = () => {
    setCaptcha("");
    setCaptchaKey((prev) => prev + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError(
        method === "email"
          ? "Please enter your email address."
          : "Please enter your phone number."
      );
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (captcha.trim() !== captchaQuestion.answer) {
      setError("Incorrect CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }

    try {
      setLoading(true);

      // Replace this with your actual API call.
      //
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     identifier,
      //     password,
      //     method,
      //     rememberMe,
      //   }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Invalid credentials");
      // }
      //
      // const data = await response.json();
      // router.push("/dashboard");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log({
        identifier,
        password,
        method,
        rememberMe,
      });
    } catch (err) {
      setError("Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT — BRANDING */}
        <section className="relative hidden overflow-hidden lg:flex">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_35%)]" />

          <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
                <Ticket className="h-5 w-5" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                evento
              </span>
            </Link>

            {/* Hero */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Your events. Your community.
              </div>

              <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight xl:text-6xl">
                Everything your
                <br />
                <span className="text-violet-400">community</span> needs.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Discover events, join communities, manage registrations,
                and stay connected with everything happening around you.
              </p>

              {/* Feature cards */}
              <div className="mt-10 grid grid-cols-2 gap-3">
                <Feature
                  icon={<Ticket className="h-4 w-4" />}
                  title="Event tickets"
                  description="One place for every ticket."
                />

                <Feature
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Secure access"
                  description="Your account stays protected."
                />
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Evento. Built for communities.
            </p>
          </div>
        </section>

        {/* RIGHT — LOGIN */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                  <Ticket className="h-5 w-5" />
                </div>

                <span className="text-xl font-bold">
                  evento
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Sign in to continue to your Evento account.
              </p>
            </div>

            {/* Login method */}
            <div className="mb-6 grid grid-cols-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-1">
              <button
                type="button"
                onClick={() => {
                  setMethod("email");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-medium transition ${
                  method === "email"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Email
              </button>

              <button
                type="button"
                onClick={() => {
                  setMethod("phone");
                  setIdentifier("");
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-medium transition ${
                  method === "phone"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email / Phone */}
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  {method === "email" ? "Email address" : "Phone number"}
                </label>

                <div className="relative">
                  {method === "email" ? (
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                  ) : (
                    <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                  )}

                  <input
                    id="identifier"
                    type={method === "email" ? "email" : "tel"}
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      method === "email"
                        ? "you@example.com"
                        : "+91 98765 43210"
                    }
                    autoComplete={
                      method === "email"
                        ? "email"
                        : "tel"
                    }
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-violet-400 hover:text-violet-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-11 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-zinc-300"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* CAPTCHA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">
                  Security check
                </label>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                  <div className="flex items-center gap-3">

                    {/* CAPTCHA question */}
                    <div
                      className="flex h-11 min-w-[100px] select-none items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 px-4 font-mono text-lg font-semibold tracking-widest text-zinc-200"
                      aria-label="CAPTCHA question"
                    >
                      {captchaQuestion.question}
                    </div>

                    <span className="text-zinc-600">=</span>

                    <input
                      type="text"
                      inputMode="numeric"
                      value={captcha}
                      onChange={(e) =>
                        setCaptcha(
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="?"
                      className="h-11 min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-center text-sm outline-none focus:border-violet-500"
                    />

                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200"
                      aria-label="Refresh CAPTCHA"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-600">
                    <ShieldCheck className="h-3 w-3" />
                    Verify that you're human
                  </div>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-violet-600"
                />

                <span className="text-sm text-zinc-500">
                  Remember me
                </span>
              </label>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/10 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Register */}
            <p className="mt-7 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-violet-400 hover:text-violet-300"
              >
                Create account
              </Link>
            </p>

            {/* Terms */}
            <p className="mt-8 text-center text-[11px] leading-5 text-zinc-600">
              By continuing, you agree to Evento's{" "}
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-zinc-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-zinc-300"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-sm">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <p className="text-sm font-medium text-zinc-200">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-zinc-600">
        {description}
      </p>
    </div>
  );
}