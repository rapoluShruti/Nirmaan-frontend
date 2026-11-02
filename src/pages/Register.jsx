import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { HardHat, ArrowUpRight, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "", orgType: "BUILDER", gst: "", address: "", phone: "",
    name: "", email: "", password: "", role: "MANAGER",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await registerUser({
        companyName: form.companyName.trim(),
        orgType: form.orgType,
        gst: form.gst.trim().toUpperCase(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });
      navigate("/login", { replace: true, state: { registered: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nirmaan-register">
      <header className="nirmaan-register-header">
        <Link to="/" className="nirmaan-register-brand"><span className="nirmaan-brand-mark"><HardHat size={21} /></span><strong>NIRMAAN<span className="nirmaan-brand-period">.</span></strong></Link>
        <span>Already have a workspace? <Link to="/login">Sign in <ArrowUpRight size={14} /></Link></span>
      </header>
      <div className="nirmaan-register-layout">
        <aside className="nirmaan-register-aside">
          <span className="nirmaan-eyebrow"><span /> GET YOUR TEAM ON SITE</span>
          <h1>Good work<br />starts <em>connected.</em></h1>
          <p>Bring your projects, field teams and daily operations into one dependable workspace.</p>
          <div className="nirmaan-register-benefits">
            <div><CheckCircle2 size={18} /><span><strong>One shared workspace</strong><small>Keep the whole project team aligned.</small></span></div>
            <div><CheckCircle2 size={18} /><span><strong>Clear site operations</strong><small>Keep updates, tasks and materials together.</small></span></div>
            <div><CheckCircle2 size={18} /><span><strong>Built around your team</strong><small>Role-based access for your people.</small></span></div>
          </div>
        </aside>
        <section className="nirmaan-register-card">
          <div className="nirmaan-form-kicker"><span className="nirmaan-form-kicker-icon"><Building2 size={17} /></span> NEW WORKSPACE</div>
          <h2>Set up your organization</h2>
          <p className="nirmaan-form-subtitle">Start with your organization and admin details.</p>
          <form onSubmit={handleSubmit} className="nirmaan-register-form">
            <div className="nirmaan-form-section-title"><span>01</span> Organization details</div>
            <div className="nirmaan-form-grid">
              <div className="nirmaan-field nirmaan-field-full"><label htmlFor="reg-company">Company / firm name</label><input id="reg-company" name="companyName" placeholder="e.g. Shree Infra Projects" value={form.companyName} onChange={handleChange} required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-type">Organization type</label><select id="reg-type" name="orgType" value={form.orgType} onChange={handleChange}><option value="INDIVIDUAL">Individual / Contractor</option><option value="BUILDER">Builder</option><option value="DEVELOPER">Developer</option></select></div>
              <div className="nirmaan-field"><label htmlFor="reg-gst">GST number <span>Optional</span></label><input id="reg-gst" name="gst" placeholder="Enter GSTIN (optional)" value={form.gst} onChange={handleChange} /></div>
              <div className="nirmaan-field nirmaan-field-full"><label htmlFor="reg-address">Registered address</label><textarea id="reg-address" name="address" placeholder="Street, city, state and PIN code" value={form.address} onChange={handleChange} rows={2} required /></div>
              <div className="nirmaan-field nirmaan-field-full"><label htmlFor="reg-phone">Primary contact number</label><input id="reg-phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required /></div>
            </div>
            <div className="nirmaan-form-section-title nirmaan-credentials-title"><span>02</span> Admin account</div>
            <div className="nirmaan-form-grid">
              <div className="nirmaan-field"><label htmlFor="reg-name">Admin name</label><input id="reg-name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-email">Work email</label><input id="reg-email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} autoComplete="email" required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-password">Password</label><input id="reg-password" type="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={handleChange} autoComplete="new-password" minLength={8} required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-role">Your role</label><select id="reg-role" name="role" value={form.role} onChange={handleChange}><option value="MANAGER">Manager</option><option value="SITE_ENGINEER">Site Engineer</option><option value="SUPERVISOR">Supervisor</option></select></div>
            </div>
            {error && <p className="nirmaan-auth-error" role="alert">{error}</p>}
            <button type="submit" disabled={loading} className="nirmaan-submit">{loading ? "Creating workspace…" : "Create organization"} <ArrowUpRight size={17} /></button>
          </form>
          <div className="nirmaan-secure-note"><ShieldCheck size={16} /><span>Your organization details are stored with your admin account.</span></div>
        </section>
      </div>
      <footer className="nirmaan-register-footer">© NIRMAAN <span>·</span> Construction operations, thoughtfully connected.</footer>
    </div>
  );
}
