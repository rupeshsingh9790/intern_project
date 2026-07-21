import Link from "next/link";
import { Search } from "lucide-react";
import { ShoppingCart, User, UserPlus } from "lucide-react";
import Image from "next/image";

  export default function Navbar({
  showSearch = true,
  showCart = true,
}: {
  showSearch?: boolean;
  showCart?: boolean;
}) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <Link
  href="/"
  className="text-3xl font-extrabold tracking-wide"
>
  <span className="text-amber-500">VASTRA</span>
  <span className="text-sky-500">STORE</span>
</Link>

        {/* Search */}
        {showSearch && (
        <div className="relative flex-1 max-w-xl mx-10">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-500 bg-white py-3 pl-10 pr-4 text-black placeholder:text-slate-400 caret-sky-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
          />
        </div>
        )}

        {/* Right Menu */}
       <div className="flex items-center gap-4">

  <Link
    href="/login"
    className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 transition"
  >
    <User size={18} />
    Login
  </Link>

  <Link
    href="/signup"
    className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 transition"
  >
    <UserPlus size={18} />
    Sign Up
  </Link>

{showCart && (
  <Link
    href="/cart"
    className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-white font-medium hover:bg-amber-600 transition"
  >
    <ShoppingCart size={20} />
    Cart (0)
  </Link>
)}

</div>

      </div>

    </nav>
  );
}