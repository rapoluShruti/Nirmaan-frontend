import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { HardHat, Mail, Lock, ArrowUpRight, ShieldCheck, Building2, CheckCircle2 } from "lucide-react";
import { loginUser } from "../api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!data?.token || !data?.user) {
        throw new Error("The server returned an incomplete login response. Please try again.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const roleRoutes = {
        MANAGER: "/quick-view",
        SITE_ENGINEER: "/task",
        SUPERVISOR: "/iop",
      };
      const destination = roleRoutes[data.user.role] || "/";
      const requestedPath = location.state?.from?.pathname;
      navigate(requestedPath && requestedPath !== "/login" ? requestedPath : destination, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to sign in. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nirmaan-auth">
      <aside className="nirmaan-auth-aside">
        <div className="nirmaan-auth-brand">
          <span className="nirmaan-brand-mark"><HardHat size={23} /></span>
          <span>NIRMAAN<span className="nirmaan-brand-period">.</span></span>
        </div>
        <div className="nirmaan-auth-copy">
          <span className="nirmaan-eyebrow"><span /> BUILT FOR THE FIELD</span>
          <h1>Build with<br />clarity.</h1>
          <p>One calm, connected workspace for your projects, people, materials and progress on site.</p>
          <div className="nirmaan-auth-proof">
            <div className="nirmaan-proof-icon"><CheckCircle2 size={18} /></div>
            <div><strong>Every site. One source of truth.</strong><span>Plans, updates and decisions in sync.</span></div>
          </div>
        </div>
        <div className="nirmaan-auth-aside-foot"><span>PROJECTS · PEOPLE · PROGRESS</span><span>01 / WORKSPACE</span></div>
        <div className="nirmaan-auth-orbit nirmaan-orbit-one" />
        <div className="nirmaan-auth-orbit nirmaan-orbit-two" />
      </aside>

      <div className="nirmaan-auth-main">
        <div className="nirmaan-auth-topline"><span>Already part of a team?</span><Link to="/register">Create an account <ArrowUpRight size={15} /></Link></div>
        <section className="nirmaan-auth-panel">
          <div className="nirmaan-form-kicker"><span className="nirmaan-form-kicker-icon"><Building2 size={17} /></span> YOUR WORKSPACE</div>
          <h2>Welcome back</h2>
          <p className="nirmaan-form-subtitle">Sign in to pick up where your team left off.</p>
          <form onSubmit={handleSubmit} className="nirmaan-auth-form">
            <label htmlFor="login-email">Work email</label>
            <div className="nirmaan-input-wrap"><Mail size={18} /><input id="login-email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} autoComplete="username" required /></div>
            <div className="nirmaan-password-label"><label htmlFor="login-password">Password</label><span>Secure access</span></div>
            <div className="nirmaan-input-wrap"><Lock size={18} /><input id="login-password" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} autoComplete="current-password" required /></div>
            {error && <p className="nirmaan-auth-error" role="alert">{error}</p>}
            <button type="submit" disabled={loading} className="nirmaan-submit">{loading ? "Signing in…" : "Sign in to Nirmaan"} <ArrowUpRight size={17} /></button>
          </form>
          <div className="nirmaan-secure-note"><ShieldCheck size={16} /><span>Your workspace is protected with secure sign-in.</span></div>
        </section>
        <footer className="nirmaan-auth-footer">© NIRMAAN <span>·</span> Construction operations, thoughtfully connected.</footer>
      </div>
    </div>
  );
}
