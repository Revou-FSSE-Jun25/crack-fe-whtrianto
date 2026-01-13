import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight transition hover:opacity-90">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span className="revo-gradient">Revo</span>
          <span className="text-slate-800 dark:text-white">Booking</span>
        </Link>
        <nav className="flex items-center gap-2">
          {user?.role !== "admin" && (
            <>
              <Link to="/" className={linkClass("/")}>
                Beranda
              </Link>
              <Link to="/booking" className={linkClass("/booking")}>
                Booking
              </Link>
              {user && (
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
              )}
            </>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className={linkClass("/admin")}>
              Admin
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className={linkClass("/login")}>
                Masuk
              </Link>
              <Link
                to="/register"
                className="ml-2 inline-flex items-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Daftar
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-rose-500/40"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
