"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-slate-200">

      <h1 className="text-center text-4xl font-bold text-slate-900">
        Welcome Back
      </h1>

      <p className="mt-3 text-center text-slate-500">
        Login to continue shopping
      </p>

      <div className="mt-8 space-y-5">

        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
        />

        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="h-12 w-full rounded-xl bg-amber-500 text-white hover:bg-amber-600"
        >
          {loading ? "Logging In..." : "Login"}
        </Button>

      </div>

    </div>
  );
}