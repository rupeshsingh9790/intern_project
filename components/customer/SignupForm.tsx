"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
setSuccess("");

    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
  setLoading(false);
  setError(data.message);
  return;
}

setSuccess("Account created successfully!");

setTimeout(() => {
  router.push("/login");
}, 1200);
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border">

      <h1 className="mb-2 text-center text-4xl font-bold text-slate-900">
        Create Account
      </h1>

      <p className="mb-8 text-center text-slate-500">
        Join Vastra Store today
      </p>

      {error && (
  <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm font-medium text-red-600">
    {error}
  </div>
)}

{success && (
  <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm font-medium text-green-600">
    {success}
  </div>
)}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          required
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3 text-black outline-none focus:border-amber-500"
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3 text-black outline-none focus:border-amber-500"
        />

        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="w-full rounded-xl border px-4 py-3 text-black outline-none focus:border-amber-500"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500">
  Already have an account?{" "}
  <span
    onClick={() => router.push("/login")}
    className="cursor-pointer font-semibold text-amber-500 hover:underline"
  >
    Login
  </span>
</p>

      </form>
    </div>
  );
}