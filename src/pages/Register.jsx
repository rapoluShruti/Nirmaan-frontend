// import { useState } from "react";
// import { registerUser } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "MANAGER",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(form);
//       alert("Registration successful!");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="p-6 bg-white rounded shadow-md w-96"
//       >
//         <h1 className="text-xl font-bold mb-4">Register</h1>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full mb-2 p-2 border rounded"
//         />
//         <select
//           name="role"
//           value={form.role}
//           onChange={handleChange}
//           className="w-full mb-2 p-2 border rounded"
//         >
//           <option value="MANAGER">Manager</option>
//           <option value="SITE_ENGINEER">Site Engineer</option>
//           <option value="SUPERVISOR">Supervisor</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full p-2 bg-blue-500 text-white rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK GST LOOKUP ---------------- */
const mockGSTLookup = (gst) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        companyName: "Shree Infra Projects Pvt Ltd",
        address: "Andheri East, Mumbai, Maharashtra – 400069",
        status: "Active",
      });
    }, 1500);
  });

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    orgType: "BUILDER",
    gst: "",
    address: "",
    phone: "",
    name: "",
    email: "",
    password: "",
    role: "MANAGER",
  });

  const [gstLoading, setGstLoading] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ---------------- GST AUTO FETCH ---------------- */
  const handleGSTBlur = async () => {
    if (form.gst.length < 10) return;

    setGstLoading(true);
    setGstVerified(false);

    try {
      const data = await mockGSTLookup(form.gst);
      setForm((f) => ({
        ...f,
        companyName: data.companyName,
        address: data.address,
      }));
      setGstVerified(true);
    } catch {
      setGstVerified(false);
    } finally {
      setGstLoading(false);
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚨 Only auth-related data is sent
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    };

    try {
      await registerUser(payload);
      alert("Organization registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 space-y-6"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            Organization Registration
          </h1>
          <p className="text-sm text-gray-500">
            Used for compliance, invoicing & ownership
          </p>
        </div>

        {/* ORG DETAILS */}
        <div className="space-y-3">
          <input
            name="companyName"
            placeholder="Company / Firm Name"
            value={form.companyName}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />

          <select
            name="orgType"
            value={form.orgType}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          >
            <option value="INDIVIDUAL">Individual / Contractor</option>
            <option value="BUILDER">Builder</option>
            <option value="DEVELOPER">Developer</option>
          </select>

          {/* GST FIELD */}
          <div className="relative">
            <input
              name="gst"
              placeholder="GST Number (Optional)"
              value={form.gst}
              onChange={handleChange}
              onBlur={handleGSTBlur}
              className="w-full p-3 border rounded-xl pr-10"
            />

            {gstLoading && (
              <span className="absolute right-3 top-3 text-sm text-orange-500">
                Verifying…
              </span>
            )}

            {gstVerified && !gstLoading && (
              <span className="absolute right-3 top-3 text-green-600 font-bold">
                ✓
              </span>
            )}
          </div>

          <textarea
            name="address"
            placeholder="Registered Address"
            value={form.address}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 border rounded-xl resize-none"
            required
          />

          <input
            name="phone"
            placeholder="Primary Contact Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
            required
          />
        </div>

        {/* DIVIDER */}
        <div className="border-t pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Login Credentials
          </p>

          <div className="space-y-3">
            <input
              name="name"
              placeholder="Admin Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email ID"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value="MANAGER">Manager</option>
              <option value="SITE_ENGINEER">Site Engineer</option>
              <option value="SUPERVISOR">Supervisor</option>
            </select>
          </div>
        </div>

        {/* NOTE */}
        <p className="text-xs text-gray-500">
          GST verification uses government-authorized APIs (mocked for demo).
          Details can be updated later.
        </p>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
        >
          Register Organization
        </button>
      </form>
    </div>
  );
}
