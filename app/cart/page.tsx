"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/customer/Navbar";
import CartItem from "@/components/CartItem";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  async function fetchCart() {
    try {
      const res = await fetch("/api/cart", {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 401) {
          setLoggedIn(false);
        }

        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setCart(data);
      }
    } catch (error) {
      console.error("CART ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();

    // Update cart when quantity changes
    const handleCartChanged = () => {
      fetchCart();
    };

    window.addEventListener(
      "cartChanged",
      handleCartChanged
    );

    return () => {
      window.removeEventListener(
        "cartChanged",
        handleCartChanged
      );
    };
  }, []);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.product.price) *
        Number(item.quantity),
    0
  );

  if (!loggedIn) {
    return (
      <>
        <Navbar
          showSearch={true}
          showCart={false}
        />

        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Please login first.
          </h1>

          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600"
          >
            Login
          </Link>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar
          showSearch={true}
          showCart={false}
        />

        <div className="py-20 text-center text-slate-500">
          Loading cart...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar
        showSearch={true}
        showCart={true}
      />

      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="mb-8 text-4xl font-bold text-amber-500">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="py-20 text-center">

            <p className="text-lg text-neutral-500">
              Your cart is empty.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <div className="grid gap-8 text-neutral-900 lg:grid-cols-3">

            {/* LEFT */}

            <div className="space-y-6 lg:col-span-2">

              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

            {/* RIGHT */}

            <div>

              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-md">

                <h1 className="mb-8 text-2xl font-bold text-neutral-900">
                  Order Summary
                </h1>

                {/* Subtotal */}

                <div className="mb-3 flex justify-between text-gray-800">
                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹ {subtotal}
                  </span>
                </div>

                {/* Delivery */}

                <div className="mb-3 flex justify-between text-gray-800">
                  <span>
                    Delivery
                  </span>

                  <span className="text-green-600">
                    FREE
                  </span>
                </div>

                <hr className="my-4" />

                {/* Total */}

                <div className="flex justify-between text-xl font-bold text-gray-800">

                  <span>
                    Total
                  </span>

                  <span className="text-amber-500">
                    ₹ {subtotal}
                  </span>

                </div>

                <Link href="/checkout">
                  <button className="mt-8 w-full rounded-lg bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600">
                    Proceed to Checkout
                  </button>
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}