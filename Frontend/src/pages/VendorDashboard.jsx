// src/pages/VendorDashboard.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../service/api";

export default function VendorDashboard() {
  const { vendorId } = useParams();

  const [stats, setStats]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ totalRevenue: 0, totalOrders: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/vendors/${vendorId}/dashboard`);
        setStats(res.data);

        const totalRevenue = res.data.reduce(
  (sum, s) => sum + (s.totalRevenue || 0),
  0
);
const totalOrders = res.data.reduce(
  (sum, s) => sum + (s.totalOrders || 0),
  0
);

setSummary({ totalRevenue, totalOrders });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [vendorId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-1 text-3xl font-semibold tracking-tight">
        Vendor Dashboard
      </h1>
      <p className="mb-5 text-sm text-slate-400">
        Overview of product performance for vendor <span className="font-mono text-slate-200">{vendorId}</span>.
      </p>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-emerald-200">
            Total Revenue
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            ₹{summary.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl border border-sky-500/40 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-sky-200">
            Total Orders
          </p>
          <p className="mt-2 text-2xl font-semibold text-sky-300">
            {summary.totalOrders}
          </p>
        </div>
      </div>

      {/* Per-product stats */}
      <h2 className="mb-3 text-lg font-semibold">
        Performance by Product
      </h2>

      {stats.length === 0 ? (
        <p className="text-sm text-slate-400">
          No sales data yet for this vendor.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((s) => (
            <div
              key={s._id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <p className="text-sm font-semibold text-slate-50">
                {s.productName}
              </p>

              <div className="mt-3 space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Orders</span>
                  <span>{s.orders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity sold</span>
                  <span>{s.totalQty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span>₹{s.totalRevenue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
