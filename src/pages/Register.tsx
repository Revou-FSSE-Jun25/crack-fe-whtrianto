import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { ShieldIcon, StarIcon, TargetIcon, MobileIcon } from "../components/Icons";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);
    try {
      await api.post("/users/register", { name, email, password });
      toast.success("Registrasi berhasil! Silakan login untuk melanjutkan.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registrasi gagal! Email mungkin sudah terdaftar.");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { icon: TargetIcon, text: "Akses ke semua paket penerbangan", gradient: "from-blue-500 to-cyan-500" },
    { icon: StarIcon, text: "Diskon khusus member", gradient: "from-amber-500 to-yellow-500" },
    { icon: MobileIcon, text: "Kelola booking dengan mudah", gradient: "from-purple-500 to-pink-500" },
    { icon: ShieldIcon, text: "Notifikasi harga terbaik", gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white">Buat Akun Baru</h2>
        <p className="text-white/80">Bergabung dengan ribuan pelanggan yang mempercayai RevoBooking</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <h3 className="mb-6 text-xl font-bold text-white">Keuntungan Member</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, idx) => {
              const IconComponent = benefit.icon;
              return (
                <li key={idx} className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} text-white shadow-lg`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className="pt-2 text-white/90">{benefit.text}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <StarIcon className="h-5 w-5 fill-amber-400 text-amber-400" />
              <p className="font-semibold text-white">Bonus Member Baru</p>
            </div>
            <p className="text-sm text-white/90">
              Dapatkan diskon 10% untuk booking pertama Anda!
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap Anda"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/50 transition-all focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">Alamat Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/50 transition-all focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 pr-12 text-white placeholder:text-white/50 transition-all focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-white/60 transition-colors hover:text-white/90 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">Konfirmasi Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 pr-12 text-white placeholder:text-white/50 transition-all focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-white/60 transition-colors hover:text-white/90 focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 text-blue-600 focus:ring-2 focus:ring-blue-500" />
              <span>
                Saya menyetujui{" "}
                <a href="#" className="font-medium text-blue-400 transition hover:text-blue-300">
                  Syarat & Ketentuan
                </a>{" "}
                dan{" "}
                <a href="#" className="font-medium text-blue-400 transition hover:text-blue-300">
                  Kebijakan Privasi
                </a>
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mendaftar...
                </span>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
            <div className="text-center text-sm text-white/70">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-semibold text-blue-400 transition hover:text-blue-300">
                Masuk di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
