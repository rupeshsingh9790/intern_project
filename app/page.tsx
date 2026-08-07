"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/customer/Navbar";
import ProductCard from "@/components/customer/ProductCard";
import Footer from "@/components/customer/Footer";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const searchParams = useSearchParams();

  async function getProducts() {
    try {
      const categoryId = searchParams.get("category");

      let url = "/api/products";

      if (categoryId) {
        url += `?category=${categoryId}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        console.error("Failed to fetch products");
        return;
      }

      const data = (await res.json()) as {
  products?: any[];
};

setProducts(data.products ?? []);
    } catch (error) {
      console.error("Products loading error:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-8">

        {/* HERO */}
        <section className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-white to-amber-100 px-10 py-16">
          <div className="max-w-2xl">

            <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
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
              className="mt-8 rounded-xl bg-amber-500 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-amber-600"
            >
              Shop Now
            </button>

          </div>
        </section>

        {/* PRODUCTS HEADING */}
        <div className="mb-8">

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Featured
            <span className="ml-2 text-orange-500">
              Collection
            </span>
          </h2>

          <p className="mt-4 font-medium text-slate-500">
            Handpicked products, crafted for your lifestyle.
          </p>

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

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

          <Footer />
    </>
  );
}

