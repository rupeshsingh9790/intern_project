"use client";

import Link from "next/link";
import { useState } from "react";

export default function WishlistItem({
  item,
}: {
  item: any;
}) {
  const [removed, setRemoved] = useState(false);
  const [moving, setMoving] = useState(false);

  async function removeWishlist() {
    try {
      const res = await fetch(`/api/wishlist/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      // Remove immediately from UI
      setRemoved(true);

      // Update navbar wishlist count immediately
      window.dispatchEvent(
        new Event("wishlistUpdated")
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  async function moveToCart() {
    try {
      setMoving(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.product.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Unable to move to cart");
        setMoving(false);
        return;
      }

      // Remove wishlist item immediately
      const wishlistRes = await fetch(
        `/api/wishlist/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (!wishlistRes.ok) {
        alert("Product added to cart, but wishlist removal failed");
        setMoving(false);
        return;
      }

      // Immediately remove this card
      setRemoved(true);

      // Immediately update navbar counts
      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      setMoving(false);
    } catch (error) {
      console.error(error);
      setMoving(false);
      alert("Something went wrong");
    }
  }

  // Don't render the card after removing it
  if (removed) {
    return null;
  }

  return (
    <div className="flex items-center gap-6 rounded-xl bg-white p-5 shadow-md">

      {/* Product Image */}

      <Link href={`/products/${item.product.id}`}>
        <img
          src={item.product.image}
          alt={item.product.name}
          className="h-32 w-32 cursor-pointer rounded-lg border object-cover transition hover:scale-105"
        />
      </Link>

      {/* Product Details */}

      <div className="flex-1">

        <Link href={`/products/${item.product.id}`}>
          <h2 className="cursor-pointer text-2xl font-semibold text-black transition hover:text-amber-500">
            {item.product.name}
          </h2>
        </Link>

        <p className="mt-3 text-xl font-bold text-amber-500">
          ₹ {item.product.price}
        </p>

        <div className="mt-6 flex gap-4">

          {/* Move to Cart */}

          <button
            onClick={moveToCart}
            disabled={moving}
            className="rounded-lg bg-amber-500 px-5 py-2 text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {moving
              ? "Moving..."
              : "Move to Cart"}
          </button>

          {/* Remove */}

          <button
            onClick={removeWishlist}
            className="rounded-lg border border-red-500 px-5 py-2 text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Remove
          </button>

        </div>

      </div>

    </div>
  );
}