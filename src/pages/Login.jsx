import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HardHat, Mail, Lock } from "lucide-react";
import API from "../api/axiosConfig";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ======================
     REDIRECT ONLY IF ALREADY LOGGED IN
     TEMPORARILY DISABLED FOR TESTING
  ====================== */
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) return;

  //   if (user.role === "MANAGER") {
  //     navigate("/quick-view", { replace: true });
  //   } else if (user.role === "SITE_ENGINEER") {
  //     navigate("/task", { replace: true });
  //   } else if (user.role === "SUPERVISOR") {
  //     navigate("/iop", { replace: true });
  //   }
  // }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;

      if (role === "MANAGER") {
        navigate("/quick-view", { replace: true });
      } else if (role === "SITE_ENGINEER") {
        navigate("/task", { replace: true });
      } else if (role === "SUPERVISOR") {
        navigate("/iop", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 border-b border-zinc-200 px-8 py-8 bg-gradient-to-b from-white to-orange-50/50">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-500/20">
            <HardHat size={28} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            NIRMAAN
          </h1>
          <p className="text-sm text-zinc-500">
            Construction Management System
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-zinc-300 pl-10 pr-3 py-3 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                size={18}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-zinc-300 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="border-t border-zinc-200 px-8 py-4 text-center">
          <p className="text-xs text-zinc-500">
            Authorized personnel only. All actions are logged.
          </p>
        </div>
      </div>
    </div>
  );
}
