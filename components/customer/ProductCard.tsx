"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useEffect, useState } from "react";
type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
  const checkWishlist = async () => {
    const res = await fetch(`/api/wishlist?productId=${id}`)

    const data = await res.json();

    setLiked(data.liked);
  };

  checkWishlist();

}, [id]);

async function addToCart() {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  productId: id,
})
  });

  if (res.ok) {
   window.dispatchEvent(new Event("cartUpdated"));
  } else {
    const data = await res.json();
    alert(data.message);
  }
}
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative">

  <Image
    src={image}
    alt={name}
    width={300}
    height={250}
    className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
  />

  <button
  onClick={async () => {

  if (liked) {

    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  productId: id,
})
    });

    setLiked(false);
window.dispatchEvent(new Event("wishlistUpdated"));

  } else {

    await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  productId: id,
})
    });

    setLiked(true);
window.dispatchEvent(new Event("wishlistUpdated"));

  }

}}
  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:scale-110 transition"
>
  <Heart
    size={24}
    className={
      liked
        ? "text-red-500 fill-red-500"
        : "text-red-500"
    }
  />
</button>

</div>
      <div className="p-4">

        <h2 className="text-lg font-semibold text-slate-800">
          {name}
        </h2>
        <div className="flex items-center mt-2 mb-2">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      size={16}
      className="fill-amber-400 text-amber-400"
    />
  ))}

  <span className="ml-2 text-sm text-slate-500">
    (4.9)
  </span>
</div>

        <p className="text-2xl font-bold text-amber-600">
          ₹ {price}
        </p>

        <div className="mt-4 space-y-3">

  <button
    onClick={addToCart}
    className="w-full rounded-lg bg-amber-500 py-2.5 font-semibold text-white transition hover:bg-amber-600"
  >
    Add to Cart
  </button>

  <Link
    href={`/product/${id}`}
    className="block w-full rounded-lg border border-gray-300 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-100"
  >
    View Details
  </Link>

</div>

      </div>
    </div>
  );
}