"use client";

import { useState } from "react";

export default function CartItem({
  item,
}: {
  item: any;
}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  async function updateQuantity(
    action: "increase" | "decrease"
  ) {
    if (loading) return;

    if (action === "decrease" && quantity <= 1) {
      return;
    }

    // Update UI immediately
    const previousQuantity = quantity;

    setQuantity((current: number) =>
      action === "increase"
        ? current + 1
        : current - 1
    );

    setLoading(true);

    try {
      const res = await fetch(
        `/api/cart/${item.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();

        // Restore if API failed
        setQuantity(previousQuantity);

        alert(
          data.message ||
            "Unable to update cart"
        );

        return;
      }

      // Update Navbar cart badge
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Tell CartPage to update its summary
      window.dispatchEvent(
        new Event("cartChanged")
      );
    } catch (error) {
      console.error(
        "QUANTITY UPDATE ERROR:",
        error
      );

      // Restore if request failed
      setQuantity(previousQuantity);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function removeItem() {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/cart/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res.json();

        alert(
          data.message ||
            "Unable to remove item"
        );

        return;
      }

      // Tell CartPage to remove/update item
      window.dispatchEvent(
        new Event("cartChanged")
      );

      // Update Navbar
      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const total =
    Number(item.product.price) * quantity;

  return (
    <div className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-md">

      {/* Product Image */}

      <img
        src={item.product.image}
        alt={item.product.name}
        className="h-28 w-28 rounded-lg border object-cover"
      />

      {/* Product Details */}

      <div className="flex-1">

        <h2 className="text-xl font-semibold text-black">
          {item.product.name}
        </h2>

        <p className="mt-2 text-lg font-bold text-amber-500">
          ₹ {item.product.price}
        </p>

        {/* Quantity */}

        <div className="mt-4 flex items-center gap-3">

          <button
            onClick={() =>
              updateQuantity("decrease")
            }
            disabled={
              loading || quantity <= 1
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-xl font-bold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>

          <span className="min-w-8 text-center text-lg font-semibold text-black">
            {quantity}
          </span>

          <button
            onClick={() =>
              updateQuantity("increase")
            }
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-xl font-bold text-black transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>

        </div>

        {/* Remove */}

        <button
          onClick={removeItem}
          disabled={loading}
          className="mt-4 text-sm font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
        >
          Remove
        </button>

      </div>

      {/* Item Total */}

      <div className="text-right">

        <p className="text-sm text-slate-500">
          Total
        </p>

        <p className="text-xl font-bold text-amber-500">
          ₹ {total}
        </p>

      </div>

    </div>
  );
}