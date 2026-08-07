
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-wide"
            >
              <span className="text-amber-500">VASTRA</span>
              <span className="text-sky-500">STORE</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Discover quality products at affordable prices.
              Shop your favorite collections with a simple,
              secure and convenient shopping experience.
            </p>

            <div className="flex gap-3">
  <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 hover:bg-amber-500">
    <FontAwesomeIcon icon={faFacebookF} />
  </a>

  <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 hover:bg-amber-500">
    <FontAwesomeIcon icon={faInstagram} />
  </a>

  <a className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 hover:bg-amber-500">
    <FontAwesomeIcon icon={faXTwitter} />
  </a>
</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-amber-400">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  className="transition hover:text-amber-400"
                >
                  My Orders
                </Link>
              </li>

              <li>
                <Link
                  href="/wishlist"
                  className="transition hover:text-amber-400"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className="transition hover:text-amber-400"
                >
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className="transition hover:text-amber-400"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Customer Service
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="#" className="transition hover:text-amber-400">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-amber-400">
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-amber-400">
                  Return Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-amber-400">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="transition hover:text-amber-400">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm">

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-amber-500" size={19} />

                <span>Your City, Your Country</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="shrink-0 text-amber-500" size={18} />

                <span>+00 123 456 789</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="shrink-0 text-amber-500" size={18} />

                <span>support@vastrastore.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} VASTRA STORE. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="#" className="transition hover:text-slate-300">
              Privacy
            </Link>

            <Link href="#" className="transition hover:text-slate-300">
              Terms
            </Link>

            <Link href="#" className="transition hover:text-slate-300">
              Contact
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

