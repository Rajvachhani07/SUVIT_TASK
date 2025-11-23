// src/pages/RoleSelect.jsx
import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleVendor = () => {
    navigate("/select-vendor");
  };

  const handleUser = () => {
    // optional: could go to a user-select page
    // for now, straight to products (user = RajVachhani)
    navigate("/start");
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold mb-2">Welcome to MultiVendor Hub</h1>
      <p className="text-sm text-slate-400 mb-6">
        Choose how you want to continue.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={handleUser}
          className="rounded-2xl border border-sky-500/60 bg-slate-900 px-6 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-500/10 transition"
        >
          Continue as User
        </button>

        <button
          onClick={handleVendor}
          className="rounded-2xl border border-emerald-500/60 bg-slate-900 px-6 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10 transition"
        >
          Continue as Vendor
        </button>
      </div>
    </div>
  );
}
