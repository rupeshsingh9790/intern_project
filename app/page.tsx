"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/customer/Navbar";
import ProductCard from "@/components/customer/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const res = await fetch("/api/products");

    const data = await res.json();

    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-8">

        <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-white to-amber-100 px-10 py-16">

  <div className="max-w-2xl">

    <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
      Discover Amazing
      <span className="block text-amber-500">
        Products
      </span>
    </h1>

    <p className="mt-5 text-lg text-slate-600">
      Shop the latest collections with premium quality,
      affordable prices and fast delivery.
    </p>

    <button
      className="mt-8 rounded-xl bg-amber-500 px-8 py-3 text-white font-semibold shadow-lg transition hover:bg-amber-600 hover:scale-105"
    >
      Shop Now
    </button>

  </div>

</section>

        <div className="mb-8">

  <h2 className="text-4xl font-extrabold tracking-black text-0range">
  Featured
  <span className="ml-2 text-orange-500">
    Collection
  </span>
</h2>

{/* <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-sky-500"></div> */}

<p className="mt-4 text-base-white font-medium text-slate-500 color-red">
  Handpicked products, crafted for your lifestyle.
</p>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}

        </div>

      </main>
    </>
  );
}