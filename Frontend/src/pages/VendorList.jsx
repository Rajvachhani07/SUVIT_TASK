import { useEffect, useState } from "react";
import API from "../service/api";
import { Link } from "react-router-dom";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/vendors")
      .then((res) => setVendors(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">Vendor Dashboard</h1>
      <p className="mb-5 text-sm text-slate-400">Select a vendor to view stats.</p>

      {loading && <div className="text-slate-400">Loading vendors...</div>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {vendors.map((v) => (
          <Link
            to={`/vendor/${v._id}`}
            key={v._id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800 transition"
          >
            <div className="text-lg font-semibold text-sky-400">{v.name}</div>
            <p className="text-xs text-slate-400 mt-2">Click to view stats</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
