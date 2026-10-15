import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { HardHat, ArrowUpRight, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

/* Demo GST lookup retained from the existing registration flow. */
const mockGSTLookup = (gst) =>
  new Promise((resolve) => {
    setTimeout(() => resolve({
      companyName: "Shree Infra Projects Pvt Ltd",
      address: "Andheri East, Mumbai, Maharashtra – 400069",
      status: "Active",
    }), 1500);
  });

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "", orgType: "BUILDER", gst: "", address: "", phone: "",
    name: "", email: "", password: "", role: "MANAGER",
  });
  const [gstLoading, setGstLoading] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGSTBlur = async () => {
    if (form.gst.length < 10) return;
    setGstLoading(true);
    setGstVerified(false);
    try {
      const data = await mockGSTLookup(form.gst);
      setForm((f) => ({ ...f, companyName: data.companyName, address: data.address }));
      setGstVerified(true);
    } catch {
      setGstVerified(false);
    } finally {
      setGstLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, email: form.email, password: form.password, role: form.role };
    try {
      await registerUser(payload);
      alert("Organization registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
              <div className="nirmaan-field"><label htmlFor="reg-gst">GST number <span>Optional</span></label><div className="nirmaan-gst-wrap"><input id="reg-gst" name="gst" placeholder="Enter GSTIN" value={form.gst} onChange={handleChange} onBlur={handleGSTBlur} />{gstLoading && <small>Checking…</small>}{gstVerified && !gstLoading && <CheckCircle2 size={17} />}</div></div>
              <div className="nirmaan-field nirmaan-field-full"><label htmlFor="reg-address">Registered address</label><textarea id="reg-address" name="address" placeholder="Street, city, state and PIN code" value={form.address} onChange={handleChange} rows={2} required /></div>
              <div className="nirmaan-field nirmaan-field-full"><label htmlFor="reg-phone">Primary contact number</label><input id="reg-phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required /></div>
            </div>
            <div className="nirmaan-form-section-title nirmaan-credentials-title"><span>02</span> Admin account</div>
            <div className="nirmaan-form-grid">
              <div className="nirmaan-field"><label htmlFor="reg-name">Admin name</label><input id="reg-name" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-email">Work email</label><input id="reg-email" type="email" name="email" placeholder="you@company.com" value={form.email} onChange={handleChange} autoComplete="email" required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-password">Password</label><input id="reg-password" type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} autoComplete="new-password" required /></div>
              <div className="nirmaan-field"><label htmlFor="reg-role">Your role</label><select id="reg-role" name="role" value={form.role} onChange={handleChange}><option value="MANAGER">Manager</option><option value="SITE_ENGINEER">Site Engineer</option><option value="SUPERVISOR">Supervisor</option></select></div>
            </div>
            <button type="submit" className="nirmaan-submit">Create organization <ArrowUpRight size={17} /></button>
          </form>
          <div className="nirmaan-secure-note"><ShieldCheck size={16} /><span>Registration details are used to configure your workspace. GST lookup is currently a demo.</span></div>
        </section>
      </div>
      <footer className="nirmaan-register-footer">© NIRMAAN <span>·</span> Construction operations, thoughtfully connected.</footer>
    </div>
  );
}
