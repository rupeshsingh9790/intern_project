"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/customer/Navbar";
import {
  CreditCard,
  Smartphone,
  Landmark,
  Truck,
} from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();

  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPaymentData() {
      try {
        // Get checkout information
        const checkout = localStorage.getItem("checkoutData");

        if (checkout) {
          setCheckoutData(JSON.parse(checkout));
        }

        // Get cart of the currently logged-in user
        const cartResponse = await fetch("/api/cart", {
          cache: "no-store",
        });

        const cartData = await cartResponse.json();

        if (cartResponse.ok) {
          setCart(cartData);
        } else {
          console.error(cartData.message);
        }
      } catch (error) {
        console.error("PAYMENT PAGE ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPaymentData();
  }, []);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!checkoutData) {
      alert("Checkout information is missing.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...checkoutData,
        paymentMethod: "COD",

        // Temporary because your current order API
        // appears to expect one product.
        productId: cart[0].product.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Order Placed Successfully!");
      router.push("/success");
      router.refresh();
    } else {
      alert(data.message || "Unable to place order.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar showSearch={false} showCart={false} />

        <main className="flex min-h-[70vh] items-center justify-center bg-slate-50">
          <p className="text-slate-600">
            Loading payment details...
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar showSearch={false} showCart={false} />

      <div className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="text-4xl font-bold text-amber-500">
          Payment Method
        </h1>

        <p className="mt-2 text-slate-600">
          Select your preferred payment option.
        </p>

        <div className="mt-10 rounded-2xl bg-neutral-200 p-8 shadow-lg">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* PAYMENT METHODS */}

            <div className="rounded-xl border bg-white p-5 lg:col-span-2">

              {/* UPI */}

              <div className="mt-0 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <Smartphone
                      className="text-sky-500"
                      size={28}
                    />

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

              {/* CARD */}

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <CreditCard
                      className="text-sky-500"
                      size={28}
                    />

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

              {/* NET BANKING */}

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-sky-400">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <Landmark
                      className="text-sky-500"
                      size={28}
                    />

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

              {/* COD */}

              <div className="mt-5 rounded-xl border-2 border-amber-500 bg-amber-50 p-5 shadow-sm">

                <label className="flex cursor-pointer items-center justify-between">

                  <div className="flex items-center gap-4">

                    <Truck
                      className="text-amber-500"
                      size={28}
                    />

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
                disabled={cart.length === 0}
                className="mt-8 w-full rounded-xl bg-amber-500 py-3 text-lg font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place Order
              </button>

            </div>

            {/* ORDER SUMMARY */}

            <div className="h-fit rounded-xl bg-white p-6 shadow-md">

              <h2 className="mb-6 text-2xl font-bold text-black">
                Order Summary
              </h2>

              <div className="space-y-5">

                {cart.map((item: any) => (

                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4"
                  >

                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-lg border object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-black">
                        {item.product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="mt-1 font-bold text-amber-500">
                        ₹{" "}
                        {Number(item.product.price) *
                          item.quantity}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className="mt-2 flex justify-between text-green-600">
                <span>Delivery</span>
                <span>FREE</span>
              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-2xl font-bold">

                <span className="text-slate-900">
                  Total
                </span>

                <span className="text-amber-500">
                  ₹ {subtotal}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}