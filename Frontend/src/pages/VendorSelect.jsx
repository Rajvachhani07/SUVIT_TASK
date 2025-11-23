// src/pages/VendorSelect.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

export default function VendorSelect() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/vendors")
      .then((res) => setVendors(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectVendor = (vendor) => {
    // store vendor in localStorage or state
    localStorage.setItem("selectedVendorId", vendor._id);
    localStorage.setItem("selectedVendorName", vendor.name);
    navigate("/vendor/products");
  };

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
        Select Vendor
      </h1>
      <p className="mb-5 text-sm text-slate-400">
        Choose your vendor account to manage products.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {vendors.map((v) => (
          <button
            key={v._id}
            onClick={() => handleSelectVendor(v)}
            className="text-left rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-800 transition"
          >
            <div className="text-lg font-semibold text-sky-400">{v.name}</div>
            <p className="text-xs text-slate-400 mt-1">Click to manage products</p>
          </button>
        ))}
      </div>
    </div>
  );
}
