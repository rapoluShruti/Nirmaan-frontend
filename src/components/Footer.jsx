// import React from 'react';
// import { HardHat, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
//           {/* Brand Column */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               <div className="bg-orange-500 p-1.5 rounded-lg">
//                 <HardHat size={20} className="text-white" />
//               </div>
//               <span className="text-xl font-black tracking-tighter text-orange-600">NIRMAAN</span>
//             </div>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               Building the future with precision and innovation. Your trusted partner in modern construction management.
//             </p>
//             <div className="flex gap-4">
//               <Facebook size={18} className="text-gray-400 hover:text-orange-500 cursor-pointer transition" />
//               <Twitter size={18} className="text-gray-400 hover:text-orange-500 cursor-pointer transition" />
//               <Instagram size={18} className="text-gray-400 hover:text-orange-500 cursor-pointer transition" />
//               <Linkedin size={18} className="text-gray-400 hover:text-orange-500 cursor-pointer transition" />
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
//             <ul className="space-y-4 text-sm text-gray-500">
//               <li><a href="#" className="hover:text-orange-500 transition">About Company</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">Our Projects</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">Services</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">Latest News</a></li>
//             </ul>
//           </div>

//           {/* Services */}
//           <div>
//             <h4 className="font-bold text-gray-900 mb-6">Services</h4>
//             <ul className="space-y-4 text-sm text-gray-500">
//               <li><a href="#" className="hover:text-orange-500 transition">Architecture Design</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">Site Planning</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">General Contracting</a></li>
//               <li><a href="#" className="hover:text-orange-500 transition">Interior Design</a></li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
//             <ul className="space-y-4 text-sm text-gray-500">
//               <li className="flex items-center gap-3">
//                 <Mail size={16} className="text-orange-500" />
//                 info@nirmaan.com
//               </li>
//               <li className="flex items-center gap-3">
//                 <Phone size={16} className="text-orange-500" />
//                 +91 98765 43210
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="mt-1">
//                   <MapPin size={16} className="text-orange-500" />
//                 </div>
//                 <span>123 Construction Hub, <br />Digital City, India</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
//           <p>© 2026 NIRMAAN. All rights reserved.</p>
//           <div className="flex gap-8">
//             <a href="#" className="hover:text-gray-600 transition">Privacy Policy</a>
//             <a href="#" className="hover:text-gray-600 transition">Terms of Service</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-orange-200 via-orange-400 to-orange-700">
        <div className="mx-auto max-w-7xl px-6 py-14 text-zinc-900">

          {/* Top Section */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                {/* SVG Logo */}
                <svg
                  width="140"
                  height="32"
                  viewBox="0 0 300 64"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M32 2L56 16V48L32 62L8 48V16L32 2Z" fill="#111" />
                  <path d="M32 8L50 18V46L32 56L14 46V18L32 8Z" fill="white" />
                  <path
                    d="M24 42V22L40 42V22"
                    stroke="#111"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <text
                    x="72"
                    y="44"
                    fontSize="28"
                    fontWeight="700"
                    fontFamily="Arial, Helvetica, sans-serif"
                    fill="#111"
                    letterSpacing="2"
                  >
                    NIRMAAN
                  </text>
                </svg>
              </div>

              <p className="mt-4 text-sm text-zinc-800 max-w-xs">
                NIRMAAN is a smart construction management platform designed to
                streamline tasks, materials, and workforce operations on-site.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:underline">Dashboard</Link></li>
                <li><Link to="/see" className="hover:underline">Projects</Link></li>
                <li><Link to="/materials" className="hover:underline">Materials</Link></li>
                <li><Link to="/attendance" className="hover:underline">Attendance</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail size={16} /> support@nirmaan.app
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} /> +91 9XXXXXXXXX
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} /> India
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="my-8 border-t border-black/20" />

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-zinc-900">
              © {new Date().getFullYear()} NIRMAAN. All rights reserved.
            </p>
            <p className="text-zinc-900 font-medium">
              Built for modern construction 🚧
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
