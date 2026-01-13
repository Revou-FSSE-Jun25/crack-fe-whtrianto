import { Link } from "react-router-dom";
import { PhoneIcon, MailIcon, ClockIcon, FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from "./Icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "Tentang Kami", to: "/#about" },
    { name: "Karir", to: "#" },
    { name: "Blog", to: "#" },
    { name: "Press Kit", to: "#" },
  ];

  const productLinks = [
    { name: "Cari Tiket", to: "/booking" },
    { name: "Paket Wisata", to: "/#services" },
    { name: "Hotel", to: "#" },
    { name: "Rental Mobil", to: "#" },
  ];

  const supportLinks = [
    { name: "Bantuan", to: "#" },
    { name: "FAQ", to: "#" },
    { name: "Kebijakan Privasi", to: "#" },
    { name: "Syarat & Ketentuan", to: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, url: "#" },
    { name: "Twitter", icon: TwitterIcon, url: "#" },
    { name: "Instagram", icon: InstagramIcon, url: "#" },
    { name: "LinkedIn", icon: LinkedInIcon, url: "#" },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-900/60 backdrop-blur-sm text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Company Info - Takes 4 columns on large screens */}
          <div className="lg:col-span-4">
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <Link to="/" className="text-2xl font-bold">
                <span className="revo-gradient">Revo</span>
                <span className="text-white">Booking</span>
              </Link>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/75">
              Platform booking penerbangan terpercaya untuk perjalanan impian Anda. Lebih dari 10 tahun melayani jutaan pelanggan dengan layanan terbaik.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white hover:scale-110"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections - Each takes 2 columns on large screens */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            {/* Company Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Perusahaan</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-white/70 transition hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Produk & Layanan</h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-white/70 transition hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Bantuan</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="text-sm text-white/70 transition hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Hubungi Kami</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-white/60">
                    <PhoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Telepon</div>
                    <a href="tel:+622112345678" className="text-sm text-white/90 transition hover:text-white">
                      +62 21 1234 5678
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-white/60">
                    <MailIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Email</div>
                    <a href="mailto:support@revobooking.com" className="text-sm text-white/90 transition hover:text-white break-all">
                      support@revobooking.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center text-white/60">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Jam Layanan</div>
                    <div className="text-sm text-white/90">24/7 Customer Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-white/60">
              © {currentYear} <span className="font-semibold text-white/80">RevoBooking</span>. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
              <Link to="#" className="transition hover:text-white">
                Kebijakan Privasi
              </Link>
              <Link to="#" className="transition hover:text-white">
                Syarat & Ketentuan
              </Link>
              <Link to="#" className="transition hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
