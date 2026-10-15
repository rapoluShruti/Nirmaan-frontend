import { Link } from "react-router-dom";
import { HardHat, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Overview", to: "/quick-view" },
  { label: "Projects", to: "/create" },
  { label: "Tasks", to: "/task" },
  { label: "Materials", to: "/invoice" },
];

export default function Footer() {
  return (
    <footer className="nm-footer">
      <div className="nm-footer__inner">
        <div className="nm-footer__main">
          <Link to="/" className="nm-footer__brand" aria-label="NIRMAAN home">
            <span className="nm-footer__mark"><HardHat size={21} strokeWidth={2.2} /></span>
            <span>NIRMAAN<span className="nm-footer__period">.</span></span>
          </Link>
          <p className="nm-footer__description">
            One connected workspace for projects, people, materials and progress on site.
          </p>
          <span className="nm-footer__eyebrow">BUILT FOR THE FIELD</span>
        </div>

        <div className="nm-footer__links">
          <p className="nm-footer__label">WORKSPACE</p>
          {footerLinks.map((item) => (
            <Link key={item.to} to={item.to} className="nm-footer__link">
              {item.label}<ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          ))}
        </div>

        <div className="nm-footer__note">
          <span className="nm-footer__status" aria-hidden="true" />
          <div>
            <p className="nm-footer__note-title">Keep every site in sync.</p>
            <p className="nm-footer__note-copy">Plan clearly. Coordinate confidently. Build better.</p>
          </div>
        </div>
      </div>

      <div className="nm-footer__bottom">
        <span>© {new Date().getFullYear()} NIRMAAN</span>
        <span className="nm-footer__bottom-right">Construction management, made clearer.</span>
      </div>
    </footer>
  );
}
