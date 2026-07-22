"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/customer/Navbar";
import {
  CreditCard,
  Smartphone,
  Landmark,
  Truck,
} from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
 const [checkoutData, setCheckoutData] = useState<any>(null);

useEffect(() => {
  const data = localStorage.getItem("checkoutData");

  if (data) {
    setCheckoutData(JSON.parse(data));
  }
}, []);

const handlePlaceOrder = async () => {
  if (!checkoutData) return;

  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...checkoutData,
      paymentMethod: "COD",
      productId: 1, // Temporary
      userId: 1, // Temporary
    }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Order Placed Successfully!");
    router.push("/success");
  } else {
    alert(data.message);
  }
};
  return (
    <>
      <Navbar showSearch={false} showCart={false} />

      <div className="mx-auto max-w-4xl px-6 py-10">

        <h1 className="text-4xl font-bold text-amber-500">
          Payment Method
        </h1>

        <p className="mt-2 text-slate-300">
          Select your preferred payment option.
        </p>

        <div className="mt-10 rounded-2xl bg-neutral-200 p-8 shadow-lg">
          
          <div className="rounded-xl border p-5 opacity-90">

 <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 opacity-120 transition hover:border-sky-400">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-4">

      <Smartphone className="text-sky-500" size={28} />

      <div>
        <h3 className="font-semibold text-slate-900">
          UPI
        </h3>

        <p className="text-sm text-slate-500">
          GPay • PhonePe • Paytm
        </p>
      </div>

    </div>

    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
      Coming Soon
    </span>

  </div>

</div>

<div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 opacity-120 transition hover:border-sky-400">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-4">

      <CreditCard className="text-sky-500" size={28} />

      <div>
        <h3 className="font-semibold text-slate-900">
          Debit / Credit Card
        </h3>

        <p className="text-sm text-slate-500">
          Visa • MasterCard • RuPay
        </p>
      </div>

    </div>

    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
      Coming Soon
    </span>

  </div>

</div>

<div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 opacity-120 transition hover:border-sky-400">

  <div className="flex items-center justify-between">

    <div className="flex items-center gap-4">

      <Landmark className="text-sky-500" size={28} />

      <div>
        <h3 className="font-semibold text-slate-900">
          Net Banking
        </h3>

        <p className="text-sm text-slate-500">
          SBI • HDFC • ICICI • Axis
        </p>
      </div>

    </div>

    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
      Coming Soon
    </span>

  </div>

</div>

<div className="mt-5 rounded-xl border-2 border-amber-500 bg-amber-50 p-5 shadow-sm transition hover:shadow-md">

  <label className="flex cursor-pointer items-center justify-between">

    <div className="flex items-center gap-4">

      <Truck className="text-amber-500" size={28} />

      <div>

        <h3 className="font-semibold text-slate-900">
          Cash on Delivery
        </h3>

        <p className="text-sm text-slate-600">
          Pay only after your order is delivered.
        </p>

      </div>

    </div>

    <input
      type="radio"
      name="payment"
      defaultChecked
      className="h-5 w-5 accent-amber-500"
    />

  </label>

</div>


<button
  onClick={handlePlaceOrder}
  className="mt-8 w-full rounded-xl bg-amber-500 py-3 text-lg font-semibold text-white transition hover:bg-amber-600"
>
  Place Order
</button>
</div>

        </div>

      </div>
    </>
  );
}