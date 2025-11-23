// src/pages/PlaceOrder.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../service/api";

const USER_ID = "RajVachhani"; // replace with real user later

export default function PlaceOrder() {
  const { productId } = useParams();
  const navigate      = useNavigate();

  const [product, setProduct]     = useState(null);
  const [qty, setQty]             = useState(1);
  const [loading, setLoading]     = useState(true);
  const [placing, setPlacing]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  const handleSubmit = async () => {
    if (!product) return;

    setError("");
    setSuccess("");

    if (qty < 1) {
      setError("Quantity must be at least 1.");
      return;
    }

    if (qty > product.stockQty) {
      setError(`Only ${product.stockQty} left in stock.`);
      return;
    }

    try {
      setPlacing(true);
      await API.post("/orders", {
        productId: product._id,
        userId: USER_ID,
        qty: Number(qty),
      });
      setSuccess("Order placed successfully!");
      setTimeout(() => navigate("/orders"), 1000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <p className="mt-6 text-center text-sm text-red-400">
        Product not found.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">
        Place Order
      </h1>
      <p className="mb-5 text-sm text-slate-400">
        Confirm your quantity. Stock is validated on the server to prevent overselling.
      </p>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-50">
          {product.name}
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Vendor: {product.vendorId?.name || "Vendor"}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-300">Price</span>
          <span className="text-lg font-semibold text-sky-400">
            ₹{product.price}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
          <span>Available stock</span>
          <span>{product.stockQty}</span>
        </div>

        {/* Quantity */}
        <div className="mt-5">
          <label className="mb-1 block text-xs font-medium text-slate-300">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="mt-3 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-3 rounded-xl bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
            {success}
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={placing || product.stockQty <= 0}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {placing ? "Placing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
