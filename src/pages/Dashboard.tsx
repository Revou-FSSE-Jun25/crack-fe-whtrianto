import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../AuthContext";
import { formatRupiah } from "../utils/formatRupiah";

type Booking = { id: number; date: string; status: string; service: { name: string; price: number } };

type StatusInfo = {
  label: string;
  badgeClass: string;
  message?: string;
  messageClass?: string;
  icon?: string;
};

const STATUS_DETAILS: Record<string, StatusInfo> = {
  confirmed: {
    label: "Terkonfirmasi",
    badgeClass: "border-green-500/40 bg-green-500/15 text-green-200",
    message: "✓ Tiket Anda telah dikonfirmasi! Silakan cek email untuk detail lengkap dan boarding pass.",
    messageClass: "border-green-500/40 bg-green-500/10 text-green-100",
    icon: "✓",
  },
  pending: {
    label: "Menunggu",
    badgeClass: "border-yellow-500/40 bg-yellow-500/15 text-yellow-200",
    message: "⏳ Pemesanan Anda sedang dalam proses konfirmasi. Tim kami akan menghubungi Anda segera.",
    messageClass: "border-yellow-500/40 bg-yellow-500/10 text-yellow-100",
    icon: "⏳",
  },
  completed: {
    label: "Selesai",
    badgeClass: "border-blue-500/40 bg-blue-500/15 text-blue-200",
    message: "🎉 Terima kasih telah mempercayai layanan kami. Semoga perjalanan Anda menyenangkan!",
    messageClass: "border-blue-500/40 bg-blue-500/10 text-blue-100",
    icon: "🎉",
  },
  cancelled: {
    label: "Dibatalkan",
    badgeClass: "border-red-500/40 bg-red-500/15 text-red-200",
    message: "✖️ Pemesanan ini telah dibatalkan. Hubungi kami jika Anda membutuhkan bantuan lebih lanjut.",
    messageClass: "border-red-500/40 bg-red-500/10 text-red-100",
    icon: "✖️",
  },
};

const DEFAULT_STATUS: StatusInfo = {
  label: "Status Tidak Dikenal",
  badgeClass: "border-white/20 bg-white/10 text-white/80",
  messageClass: "border-white/20 bg-white/5 text-white/70",
  icon: "•",
};

const formatBookingDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });



const getStatusInfo = (status: string) => STATUS_DETAILS[status.toLowerCase()] || { ...DEFAULT_STATUS, label: status };

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/me")
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const totalSpent = useMemo(
    () =>
      bookings
        .filter((b) => b.status.toLowerCase() !== "cancelled")
        .reduce((sum, b) => sum + (b.service?.price || 0), 0),
    [bookings]
  );

  const confirmedBookings = useMemo(
    () =>
      bookings.filter(
        (b) => b.status.toLowerCase() === "confirmed"
      ).length,
    [bookings]
  );

  return (
    <div className="space-y-8 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md border border-white/20">
            <span>👋</span>
            <span>Selamat Datang Kembali</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">Saya</span>
          </h1>
          <p className="max-w-2xl text-lg text-blue-100/90 leading-relaxed">
            Kelola semua perjalanan Anda dalam satu tempat. Cek status penerbangan, riwayat pemesanan, dan temukan petualangan berikutnya.
          </p>
          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:scale-105 active:scale-95"
            >
              <span>✈️</span>
              <span>Pesan Tiket Baru</span>
              <span className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
          <div className="relative">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-xl text-emerald-300">
              🎫
            </div>
            <div className="mb-1 text-sm font-medium text-emerald-200/80">Total Pemesanan</div>
            <div className="text-3xl font-bold text-white">{bookings.length}</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-300/60">
              <span>↗</span>
              <span>Sepanjang waktu</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 p-6 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
          <div className="relative">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-xl text-blue-300">
              ✅
            </div>
            <div className="mb-1 text-sm font-medium text-blue-200/80">Tiket Terkonfirmasi</div>
            <div className="text-3xl font-bold text-white">{confirmedBookings}</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-300/60">
              <span>•</span>
              <span>Siap digunakan</span>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/20 to-orange-500/10 p-6 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/20 blur-2xl group-hover:bg-amber-500/30 transition-all"></div>
          <div className="relative">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 text-xl text-amber-300">
              💳
            </div>
            <div className="mb-1 text-sm font-medium text-amber-200/80">Total Pengeluaran</div>
            <div className="text-3xl font-bold text-white tracking-tight">{formatRupiah(totalSpent)}</div>
            <div className="mt-2 flex items-center gap-1 text-xs text-amber-300/60">
              <span>+</span>
              <span>Investasi perjalanan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Riwayat Perjalanan</h2>
            <p className="text-sm text-slate-400 mt-1">Daftar semua perjalanan Anda yang terdahulu dan mendatang</p>
          </div>

          <div className="flex gap-2">
            <Link
              to="/#services"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 hover:border-white/20"
            >
              📦 Lihat Paket
            </Link>
          </div>
        </div>

        {loading && (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center animate-pulse">
            <div className="h-12 w-12 rounded-full bg-white/10 mb-4"></div>
            <div className="h-4 w-32 rounded bg-white/10 mb-2"></div>
            <div className="h-3 w-24 rounded bg-white/5"></div>
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-4xl shadow-lg shadow-blue-500/10">
              🛫
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">Belum Ada Perjalanan</h3>
            <p className="mb-8 max-w-sm text-slate-400">
              Dunia menanti Anda. Mulai petualangan pertama Anda dengan memesan tiket sekarang.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-blue-600/25"
            >
              Mulai Petualangan
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);

              return (
                <div
                  key={booking.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 backdrop-blur-md transition-all hover:border-white/20 hover:shadow-xl hover:shadow-blue-500/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

                  <div className="relative flex flex-col gap-6 rounded-xl bg-slate-900/40 p-5 sm:flex-row sm:items-center sm:p-6">
                    {/* Icon Box */}
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/5 shadow-inner">
                      <span className="text-3xl">✈️</span>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          #{String(booking.id).padStart(5, "0")}
                        </span>
                        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium border ${statusInfo.badgeClass}`}>
                          {statusInfo.icon && <span className="opacity-75">{statusInfo.icon}</span>}
                          {statusInfo.label}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                          {booking.service?.name || "Layanan Tidak Tersedia"}
                        </h3>
                        {booking.service?.price && (
                          <div className="mt-1 text-sm font-medium text-amber-400/90">
                            {formatRupiah(booking.service.price)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">🗓</span>
                          <span>{formatBookingDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">👤</span>
                          <span>{user?.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-col gap-3 sm:items-end sm:border-l sm:border-white/10 sm:pl-6 sm:py-2">
                      {statusInfo.message && (
                        <div className="hidden lg:block max-w-xs text-right text-xs text-slate-400 italic">
                          "{statusInfo.message}"
                        </div>
                      )}
                      <Link
                        to="/booking"
                        className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:scale-105 active:scale-95 border border-white/10"
                      >
                        Detail
                        <span className="text-slate-400 transition-transform group-hover/btn:translate-x-0.5">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
