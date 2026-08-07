"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  productId: product.id,
})
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="mx-auto max-w-7xl px-8 py-10">

    <div className="grid gap-10 md:grid-cols-2">

      {/* Left Side */}
      <div>
        <img
  src={product.image}
  alt={product.name}
  className="h-[500px] w-full rounded-2xl border object-contain bg-white p-6 shadow-lg"
/>
      </div>

      {/* Right Side */}
      <div>
        <h1 className="text-4xl font-bold text-amber-500">
  {product.name}
</h1>
<div className="mt-3 flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      size={18}
      className="fill-amber-400 text-amber-400"
    />
  ))}

  <span className="ml-2 text-sm text-slate-500">
    4.9 (120 Reviews)
  </span>
</div>

<p className="mt-5 text-wt-600 leading-7">
  {product.description}
</p>

<h2 className="mt-6 text-4xl font-bold text-amber-500">
  ₹ {product.price}
</h2>
<p className="mt-3 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
  ✓ In Stock
</p>
<div className="mt-8 flex gap-4">

 <button
  onClick={handleAddToCart}
  disabled={loading}
  className="flex-1 rounded-xl border-2 border-amber-500 py-3 font-semibold text-amber-500 transition hover:bg-amber-500 hover:text-white disabled:opacity-50"
>
  {loading ? "Adding..." : "Add to Cart"}
</button>

  <Link href="/checkout" className="flex-1">
  <button className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white hover:bg-amber-600 transition">
    Buy Now
  </button>
</Link>

</div>
      </div>

    </div>

  </div>
);
}