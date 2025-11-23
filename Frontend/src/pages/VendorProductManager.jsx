// src/pages/VendorProductManager.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

export default function VendorProductManager() {
  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stockQty: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("selectedVendorId");
    const name = localStorage.getItem("selectedVendorName");
    if (!id) {
      navigate("/select-vendor");
      return;
    }
    setVendorId(id);
    setVendorName(name || "");

    const loadProducts = async () => {
      try {
        const res = await API.get(`/products?vendorId=${id}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.price || !form.stockQty) {
      setError("Name, price, and stockQty are required.");
      return;
    }

    try {
      const res = await API.post("/products", {
        vendorId,
        name: form.name,
        price: Number(form.price),
        stockQty: Number(form.stockQty),
        description: form.description,
      });

      setProducts((prev) => [...prev, res.data]);
      setSuccess("Product added successfully.");
      setForm({ name: "", price: "", stockQty: "", description: "" });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to add product.");
    }
  };

  if (!vendorId) {
    return null; // redirect happening in useEffect
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">
        {vendorName ? `Products - ${vendorName}` : "Vendor Products"}
      </h1>
      <p className="mb-5 text-sm text-slate-400">
        Manage products for this vendor: view and add inventory.
      </p>

      {/* Form */}
      <form
        onSubmit={handleAddProduct}
        className="mb-6 grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Product Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. Premium Cricket Bat"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 999"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Stock Quantity
          </label>
          <input
            name="stockQty"
            type="number"
            value={form.stockQty}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="e.g. 10"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Short description..."
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          {error && (
            <div className="rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
              {success}
            </div>
          )}
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Add Product
          </button>
        </div>
      </form>

      {/* Product list */}
      <h2 className="mb-3 text-lg font-semibold">Existing Products</h2>
      {loading ? (
        <div className="text-sm text-slate-400">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-sm text-slate-400">
          No products yet. Add your first product above.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-slate-50">
                  {p.name}
                </h3>
                <span className="text-xs text-sky-400">₹{p.price}</span>
              </div>
              <p className="text-xs text-slate-400 mb-1">
                Stock: {p.stockQty}
              </p>
              {p.description && (
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {p.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
