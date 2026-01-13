import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../AuthContext";

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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

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

  const upcomingBookings = useMemo(
    () =>
      bookings.filter(
        (b) => new Date(b.date) >= new Date() && b.status.toLowerCase() !== "cancelled"
      ).length,
    [bookings]
  );

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard Saya</h1>
        <p className="text-white/80">Selamat datang kembali, {user?.name || "Pengguna"}!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-white/70">Total Pemesanan</div>
          <div className="text-3xl font-bold text-white">{bookings.length}</div>
          <div className="mt-2 text-xs text-white/60">Semua waktu</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-white/70">Pemesanan Mendatang</div>
          <div className="text-3xl font-bold text-white">{upcomingBookings}</div>
          <div className="mt-2 text-xs text-white/60">Akan datang</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="mb-2 text-sm font-medium text-white/70">Total Pengeluaran</div>
          <div className="text-3xl font-bold text-white">{formatCurrency(totalSpent)}</div>
          <div className="mt-2 text-xs text-white/60">Sejak bergabung</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          ✈️ Pesan Tiket Baru
        </Link>
        <Link
          to="/#services"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          📦 Lihat Paket Lainnya
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Riwayat Pemesanan</h2>
          {bookings.length > 0 && (
            <span className="text-sm text-white/60">{bookings.length} pemesanan ditemukan</span>
          )}
        </div>

        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/80">
            Memuat data pemesanan...
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-12 text-center shadow-inner">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/15 text-3xl">
              ✈️
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">Belum Ada Pemesanan</h3>
            <p className="mb-6 text-white/70">Mulai pesan tiket pertama Anda sekarang!</p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              Cari Tiket Sekarang
            </Link>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {bookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);

              return (
                <div
                  key={booking.id}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-6 shadow-sm transition duration-200 hover:border-white/20 hover:shadow-xl"
                >
                  <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-2xl text-sky-200">
                        ✈️
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/40">
                          <span className="rounded bg-white/10 px-2 py-1 font-semibold text-white/70">
                            #{String(booking.id).padStart(5, "0")}
                          </span>
                          <span className="rounded bg-white/5 px-2 py-1 text-white/50">
                            {booking.service?.name ? "Paket" : "Layanan"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {booking.service?.name || "Layanan"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                          <span className="inline-flex items-center gap-2">
                            <span className="text-white/50">🗓</span>
                            {formatBookingDate(booking.date)}
                          </span>
                          {booking.service?.price ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="text-white/50">💳</span>
                              {formatCurrency(booking.service.price)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center sm:gap-4 lg:flex-col lg:items-end lg:text-right">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold capitalize ${statusInfo.badgeClass}`}
                      >
                        {statusInfo.icon && <span>{statusInfo.icon}</span>}
                        {statusInfo.label}
                      </span>
                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
                      >
                        Detail Pesanan
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                  {statusInfo.message ? (
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm leading-relaxed lg:mt-auto ${statusInfo.messageClass}`}
                    >
                      {statusInfo.message}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
