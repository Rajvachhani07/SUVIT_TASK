// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../service/api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="mt-6 text-center text-sm text-red-400">
        {error}
      </p>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Products
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Browse items from multiple vendors and place stock-safe orders.
        </p>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p className="text-sm text-slate-400">
          No products available.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.9)] transition hover:-translate-y-1 hover:border-sky-500/60 hover:bg-slate-900"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {p.vendorId?.name || "Vendor"}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                    p.stockQty > 0
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-red-500/10 text-red-300"
                  }`}
                >
                  {p.stockQty > 0
                    ? `In stock: ${p.stockQty}`
                    : "Out of stock"}
                </span>
              </div>

              <h2 className="mb-1 text-lg font-semibold text-slate-50">
                {p.name}
              </h2>

              {p.description && (
                <p className="mb-3 line-clamp-2 text-xs text-slate-400">
                  {p.description}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between pt-2">
                <div className="text-base font-semibold text-sky-400">
                  ₹{p.price}
                </div>

                <Link
                  to={`/order/${p._id}`}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                    p.stockQty > 0
                      ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
                      : "cursor-not-allowed bg-slate-700 text-slate-400"
                  }`}
                  onClick={(e) => {
                    if (p.stockQty <= 0) e.preventDefault();
                  }}
                >
                  <span>Order</span>
                  <span className="text-xs">➜</span>
                </Link>
              </div>

              <p className="mt-2 text-[10px] text-slate-500">
                Live stock with safe updates.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
