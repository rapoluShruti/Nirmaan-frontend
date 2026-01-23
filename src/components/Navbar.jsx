
// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { HardHat, Menu, X } from "lucide-react";
// import API from "../api/axiosConfig";

// /* ======================
//    DEMO ROLE CONFIG
// ====================== */
// const ROLE_CONFIG = {
//   MANAGER: {
//     label: "Manager",
//     email: "manager@gmail.com",
//     password: "manager",
//     route: "/quick-view",
//     links: [
//       { to: "/quick-view", label: "Overview" },
//       { to: "/create", label: "Projects" },
//       { to: "/view", label: "Layout" },
//       { to: "/task", label: "Tasks" },
//       { to: "/invoice", label: "Materials" },
//       { to: "/iternary-new", label: "Today" },
//     ],
//   },
//   SITE_ENGINEER: {
//     label: "Site Engineer",
//     email: "siteengineer@nirmaan.com",
//     password: "siteengineer",
//     route: "/task",
//     links: [
//       { to: "/task", label: "Tasks" },
//       { to: "/quick-view", label: "Overview" },
//       { to: "/view", label: "Layout" },
//       { to: "/invoice", label: "Materials" },
//       { to: "/iternary-new", label: "Today" },
//     ],
//   },
//   SUPERVISOR: {
//     label: "Supervisor",
//     email: "supervisor@construction.com",
//     password: "supervisor",
//     route: "/step4",
//     links: [
//       { to: "/iop", label: "Today’s Work" },
//       { to: "/step4", label: "Tasks" },
//       { to: "/attendance", label: "Attendance" },
//       { to: "/invoice", label: "Material" },
//     ],
//   },
// };

// export default function Navbar() {
//   const navigate = useNavigate();

//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const [currentRole, setCurrentRole] = useState(storedUser?.role || "MANAGER");
//   const [loading, setLoading] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const activeRole = ROLE_CONFIG[currentRole];

//   const handleRoleChange = async (e) => {
//     const roleKey = e.target.value;
//     setCurrentRole(roleKey);

//     const role = ROLE_CONFIG[roleKey];
//     if (!role) return;

//     setLoading(true);
//     try {
//       const { data } = await API.post("/auth/login", {
//         email: role.email,
//         password: role.password,
//       });

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setMobileMenuOpen(false);
//       navigate(role.route);
//     } catch (err) {
//       alert(err.response?.data?.message || "Role switch failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!storedUser) {
//       handleRoleChange({ target: { value: currentRole } });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleNavClick = () => setMobileMenuOpen(false);

//   return (
//     <header className="w-full bg-white border-b border-zinc-200">
//       {/* TOP BAR */}
//       <nav className="h-14 px-4 sm:px-6 flex items-center justify-between md:grid md:grid-cols-3">
//         {/* LEFT: LOGO */}
//         <div className="flex items-center gap-2 font-extrabold text-black min-w-0">
//           <HardHat className="text-orange-500 shrink-0" size={22} />
//           <span className="tracking-wide truncate">NIRMAAN</span>
//         </div>

//         {/* CENTER: LINKS (DESKTOP ONLY) */}
//         <div className="hidden md:flex items-center justify-center gap-3 lg:gap-6">
//           {activeRole?.links.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               className={({ isActive }) =>
//                 `
//                 text-sm font-semibold px-3 py-1.5 rounded-md transition
//                 ${
//                   isActive
//                     ? "text-orange-600 bg-orange-50"
//                     : "text-zinc-600 hover:text-black hover:bg-zinc-100"
//                 }
//               `
//               }
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </div>

//         {/* RIGHT: ROLE SWITCH + MOBILE MENU */}
//         <div className="flex items-center gap-2 justify-end md:justify-end">
//           {/* Role Switch (responsive size) */}
//           <select
//             value={currentRole}
//             onChange={handleRoleChange}
//             disabled={loading}
//             className="
//               rounded-md border border-zinc-300 bg-white
//               px-2 sm:px-3 py-1.5 text-sm font-semibold
//               w-[120px] sm:w-[160px]
//               focus:outline-none focus:border-orange-500
//             "
//           >
//             {Object.entries(ROLE_CONFIG).map(([key, role]) => (
//               <option key={key} value={key}>
//                 {role.label}
//               </option>
//             ))}
//           </select>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMobileMenuOpen((prev) => !prev)}
//             className="
//               md:hidden inline-flex items-center justify-center
//               rounded-md border border-zinc-300
//               w-10 h-10 shrink-0
//               hover:bg-zinc-100 transition
//             "
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
//           </button>
//         </div>
//       </nav>

//       {/* MOBILE MENU */}
//       {mobileMenuOpen && (
//         <div className="md:hidden px-4 pb-4">
//           <div className="mt-2 rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
//             <div className="flex flex-col">
//               {activeRole?.links.map((link) => (
//                 <NavLink
//                   key={link.to}
//                   to={link.to}
//                   onClick={handleNavClick}
//                   className={({ isActive }) =>
//                     `
//                     px-4 py-3 text-sm font-semibold transition border-b border-zinc-100 last:border-b-0
//                     ${
//                       isActive
//                         ? "text-orange-600 bg-orange-50"
//                         : "text-zinc-700 hover:bg-zinc-100"
//                     }
//                   `
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HardHat, Menu, X, LogOut } from "lucide-react";
import API from "../api/axiosConfig";

/* ======================
   DEMO ROLE CONFIG
====================== */
const ROLE_CONFIG = {
  MANAGER: {
    label: "Manager",
    email: "manager@gmail.com",
    password: "manager",
    route: "/quick-view",
    links: [
      { to: "/quick-view", label: "Overview" },
      { to: "/create", label: "Projects" },
      { to: "/view", label: "Layout" },
      { to: "/task", label: "Tasks" },
      { to: "/invoice", label: "Materials" },
      { to: "/iternary-new", label: "Today" },
    ],
  },
  SITE_ENGINEER: {
    label: "Site Engineer",
    email: "siteengineer@nirmaan.com",
    password: "siteengineer",
    route: "/task",
    links: [
      { to: "/task", label: "Tasks" },
      { to: "/quick-view", label: "Overview" },
      { to: "/view", label: "Layout" },
      { to: "/invoice", label: "Materials" },
      { to: "/iternary-new", label: "Today" },
    ],
  },
  SUPERVISOR: {
    label: "Supervisor",
    email: "supervisor@construction.com",
    password: "supervisor",
    route: "/step4",
    links: [
      { to: "/iop", label: "Today’s Work" },
      { to: "/step4", label: "Tasks" },
      { to: "/attendance", label: "Attendance" },
      { to: "/invoice", label: "Material" },
    ],
  },
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const [currentRole, setCurrentRole] = useState(user?.role || "");
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeRole = ROLE_CONFIG[currentRole];

  /* ======================
     HIDE NAVBAR ON AUTH PAGES
  ====================== */
  if (!user || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  /* ======================
     ROLE SWITCH (DEMO LOGIN)
  ====================== */
  const handleRoleChange = async (e) => {
    const roleKey = e.target.value;
    const role = ROLE_CONFIG[roleKey];
    if (!role) return;

    setCurrentRole(roleKey);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", {
        email: role.email,
        password: role.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMobileMenuOpen(false);
      navigate(role.route, { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Role switch failed");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     LOGOUT (NO LOOP, NO BACK)
  ====================== */
  const handleLogout = () => {
    localStorage.clear();
    setMobileMenuOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white border-b border-zinc-200">
      {/* TOP BAR */}
      <nav className="h-14 px-4 sm:px-6 flex items-center justify-between md:grid md:grid-cols-3">
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-2 font-extrabold text-black">
          <HardHat className="text-orange-500" size={22} />
          <span className="tracking-wide">NIRMAAN</span>
        </div>

        {/* CENTER: LINKS (DESKTOP) */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {activeRole?.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? "text-orange-600 bg-orange-50"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: ROLE SWITCH + LOGOUT + MOBILE */}
        <div className="flex items-center gap-2 justify-end">
          <select
            value={currentRole}
            onChange={handleRoleChange}
            disabled={loading}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-semibold focus:border-orange-500"
          >
            {Object.entries(ROLE_CONFIG).map(([key, role]) => (
              <option key={key} value={key}>
                {role.label}
              </option>
            ))}
          </select>

          {/* LOGOUT (DESKTOP) */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-md border border-zinc-300 hover:bg-red-50 hover:text-red-600 transition"
          >
            <LogOut size={16} />
            Logout
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden w-10 h-10 rounded-md border border-zinc-300 hover:bg-zinc-100"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="mt-2 rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            {activeRole?.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* LOGOUT (MOBILE) */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
