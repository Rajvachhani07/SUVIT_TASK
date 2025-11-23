// src/pages/OrderHistory.jsx
import { useEffect, useState } from "react";
import API from "../service/api";

const USER_ID = "RajVachhani";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");

  const handleCancel = async (orderId) => {
    setActionError("");

    try {
      await API.post(`/orders/${orderId}/cancel`);

      // update local state to reflect cancelled order
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "CANCELLED" } : o
        )
      );
    } catch (err) {
      console.error(err);
      setActionError(
        err?.response?.data?.error || "Failed to cancel order."
      );
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/orders/user/${USER_ID}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
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

  return (
    <div>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">
        My Orders
      </h1>
      <p className="mb-5 text-sm text-slate-400">
        All orders placed by this Raj Vachhani.
      </p>

      {actionError && (
        <div className="mb-4 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {actionError}
        </div>
      )}

      {orders.length === 0 ? (
        <p className="text-sm text-slate-400">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {orders.map((o) => (
            <div
              key={o._id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2"
            >
              <div className="mb-1 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-50">
                  {o.productId?.name || "Product"}
                </h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    o.status === "PLACED"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {o.status}
                </span>
              </div>

              <div className="mt-1 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Qty</span>
                  <span className="text-slate-200">{o.qty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Unit price</span>
                  <span className="text-slate-200">
                    ₹{o.productId?.price}
                  </span>
                </div>
              </div>

              <p className="mt-1 text-[10px] text-slate-500">
                {new Date(o.orderTime).toLocaleString()}
              </p>

              {o.status === "PLACED" && (
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => handleCancel(o._id)}
                    className="rounded-full border border-red-500/70 px-3 py-1 text-[11px] font-medium text-red-300 hover:bg-red-500/10 transition"
                  >
                    Cancel order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
