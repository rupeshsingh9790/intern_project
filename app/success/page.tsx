import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">

      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">

        <CircleCheckBig
          size={70}
          className="mx-auto text-green-500"
        />

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-slate-500">
          Thank you for shopping with MEEMSL.
          Your order has been received successfully.
        </p>

        <Link href="/">
          <button className="mt-8 w-full rounded-xl bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600">
            Continue Shopping
          </button>
        </Link>

      </div>

    </div>
  );
}