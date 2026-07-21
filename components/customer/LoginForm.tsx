"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-center text-4xl font-bold text-slate-900">
        Login
      </h2>

      <div className="space-y-4">

        <Input
  type="email"
  placeholder="Email"
  className="text-black placeholder:text-slate-400"
/>

<Input
  type="password"
  placeholder="Password"
  className="text-black placeholder:text-slate-400"
/>

        <Button className="w-full bg-amber-500 hover:bg-amber-600">
          Login
        </Button>

      </div>

    </div>
  );
}