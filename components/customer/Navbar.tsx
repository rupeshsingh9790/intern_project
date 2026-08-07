"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({
  showSearch = true,
  showCart = true,
}: {
  showSearch?: boolean;
  showCart?: boolean;
}) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // -----------------------------
  // Logout
  // -----------------------------

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      setAccountOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  // -----------------------------
  // Cart Count
  // -----------------------------

  const fetchCartCount = async () => {
    try {
      const res = await fetch("/api/cart/count");

      if (!res.ok) return;

      const data = await res.json();

      setCartCount(data.count ?? 0);
    } catch (error) {
      console.error("Cart count error:", error);
    }
  };

  // -----------------------------
  // Wishlist Count
  // -----------------------------

  const fetchWishlistCount = async () => {
    try {
      const res = await fetch("/api/wishlist/count");

      if (!res.ok) return;

      const data = await res.json();

      setWishlistCount(data.count ?? 0);
    } catch (error) {
      console.error("Wishlist count error:", error);
    }
  };

  // -----------------------------
  // Load User
  // -----------------------------

  async function loadUser() {
    try {
      const userRes = await fetch("/api/auth/me");

      if (userRes.ok) {
        const userData = await userRes.json();

        setUser(userData);

        await Promise.all([
          fetchCartCount(),
          fetchWishlistCount(),
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // Load Categories
  // -----------------------------

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");

      if (!res.ok) return;

      const data = await res.json();

      setCategories(data.categories ?? []);
    } catch (error) {
      console.error("Category loading error:", error);
    }
  }

  // -----------------------------
  // Initial Load
  // -----------------------------

  useEffect(() => {
    loadUser();
    fetchCategories();

    const handleCartUpdate = () => {
      fetchCartCount();
    };

    const handleWishlistUpdate = () => {
      fetchWishlistCount();
    };

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdate
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );

      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdate
      );
    };
  }, []);

  // -----------------------------
  // Category Selection
  // -----------------------------

  function handleCategoryChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const categoryId = e.target.value;

    setSelectedCategory(categoryId);

    if (categoryId) {
      router.push(`/?category=${categoryId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide"
        >
          <span className="text-amber-500">
            VASTRA
          </span>

          <span className="text-sky-500">
            STORE
          </span>
        </Link>

        {/* SEARCH + CATEGORY */}

        {showSearch && (
          <div className="relative mx-10 flex max-w-2xl flex-1">

            {/* CATEGORY */}

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-amber-500"
            >
              <option value="">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {/* SEARCH */}

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-r-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition placeholder:text-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
              />
            </div>

          </div>
        )}

        {/* RIGHT MENU */}

        <div className="flex items-center gap-3">

          {/* LOGIN / SIGNUP */}

          {!loading && !user ? (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                <User size={18} />
                Login
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          ) : (
            !loading &&
            user && (
              <span className="hidden font-semibold text-slate-700 lg:block">
                Hello, {user.name}
              </span>
            )
          )}

          {/* WISHLIST */}

          {!loading && user && (
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-red-50 hover:text-red-500"
            >
              <Heart size={22} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          )}

          {/* CART */}

          {showCart && (
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-amber-50 hover:text-amber-600"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* ACCOUNT */}

          {user && (
            <div className="relative">

              <button
                onClick={() =>
                  setAccountOpen(!accountOpen)
                }
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-slate-700 transition hover:bg-slate-100"
              >
                <User size={20} />

                <span className="hidden sm:block">
                  {user.name}
                </span>

                <ChevronDown size={16} />
              </button>

              {accountOpen && (
                <div className="absolute right-0 z-50 mt-3 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                  <Link
                    href="/orders"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                    className="block rounded-lg px-4 py-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    My Orders
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                    className="block rounded-lg px-4 py-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    Wishlist
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() =>
                      setAccountOpen(false)
                    }
                    className="block rounded-lg px-4 py-2 text-slate-700 transition hover:bg-slate-100"
                  >
                    Profile
                  </Link>

                  <hr className="my-2 border-slate-200" />

                  <button
                    onClick={logout}
                    className="block w-full rounded-lg px-4 py-2 text-left text-red-500 transition hover:bg-red-50"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

