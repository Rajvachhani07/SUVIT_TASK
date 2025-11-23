// src/components/Layout.jsx
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/">
            <div className="text-xl font-semibold tracking-wide bg-linear-to-r from-sky-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
              MultiVendor Hub
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800 transition"
            >
              Products
            </Link>
            <Link
              to="/orders"
              className="rounded-full px-3 py-1 text-slate-200 hover:bg-slate-800 transition"
            >
              My Orders
            </Link>
            <Link
              to="/vendors" // change vendor id as needed
              className="rounded-full bg-slate-800/70 px-3 py-1 text-slate-100 hover:bg-slate-700 transition"
            >
              Vendor Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  );
}
