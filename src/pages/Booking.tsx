import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../AuthContext";
import ServiceCard from "../components/ServiceCard";
import toast from "react-hot-toast";

type Service = { id: number; name: string; description?: string | null; price: number; flightDate?: string | null };

export default function Booking() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("price-asc");

  // Form booking state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [passengerName, setPassengerName] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => {
        setServices(res.data);
        setFilteredServices(res.data);
      })
      .catch(() => setError("Gagal memuat layanan. Pastikan backend berjalan."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...services];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    setFilteredServices(filtered);
  }, [searchQuery, sortBy, services]);

  const handleBookService = (service: Service) => {
    if (!user) {
      if (confirm("Anda perlu login terlebih dahulu. Ingin login sekarang?")) {
        navigate("/login");
      }
      return;
    }
    setSelectedService(service);
    setShowBookingForm(true);
    setPassengerName(user.name || "");
    setPassengerEmail(user.email || "");
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    try {
      const bookingDate = departureDate || new Date().toISOString();
      await api.post("/bookings", {
        serviceId: selectedService.id,
        date: bookingDate,
        passengerName,
        passengerEmail,
        passengerPhone,
        departureDate,
        returnDate: tripType === "round-trip" ? returnDate : null,
        passengers,
      });
      toast.success("Pemesanan tiket berhasil dibuat! Silakan cek dashboard Anda.");
      setShowBookingForm(false);
      setSelectedService(null);
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal membuat pemesanan. Silakan coba lagi.");
    }
  };

  const popularDestinations = [
    { name: "Jakarta", code: "CGK", image: "🏙️" },
    { name: "Bali", code: "DPS", image: "🏝️" },
    { name: "Singapore", code: "SIN", image: "🌆" },
    { name: "Tokyo", code: "NRT", image: "🗼" },
    { name: "Bangkok", code: "BKK", image: "🏛️" },
    { name: "Sydney", code: "SYD", image: "🌉" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-white">
      {/* Header Section */}
      <div className="space-y-2 sm:space-y-3 text-center px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">Cari & Pesan Tiket Penerbangan</h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-white/80 px-4">
          Temukan tiket terbaik untuk perjalanan Anda dengan harga kompetitif dan layanan terpercaya
        </p>
      </div>

      {/* Search Section */}
      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 lg:p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-4 sm:mb-6 flex items-center gap-2">
          <span className="text-xl sm:text-2xl">🔍</span>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Cari Tiket</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-xs sm:text-sm font-medium text-white/90">Cari Rute atau Destinasi</label>
            <input
              type="text"
              placeholder="Contoh: Jakarta, Bali, Tokyo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-white/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            />
          </div>
          <div className="sm:w-56">
            <label className="mb-2 block text-xs sm:text-sm font-medium text-white/90">Urutkan</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
            >
              <option value="price-asc" className="bg-slate-800 text-white">Harga: Terendah</option>
              <option value="price-desc" className="bg-slate-800 text-white">Harga: Tertinggi</option>
              <option value="name" className="bg-slate-800 text-white">Nama: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2 text-white">
            <span className="text-lg sm:text-xl">✈️</span>
            <h2 className="text-lg sm:text-2xl font-semibold">Destinasi Populer</h2>
          </div>
          <p className="text-xs sm:hidden text-white/60">Ketuk destinasi untuk memfilter pencarian</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {popularDestinations.map((dest) => (
            <button
              key={dest.code}
              onClick={() => setSearchQuery(dest.name)}
              className="group rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 text-center transition hover:border-white/25 hover:bg-white/10 hover:shadow-md"
            >
              <div className="mb-1 sm:mb-2 text-2xl sm:text-3xl transition-transform group-hover:scale-110">{dest.image}</div>
              <div className="text-xs sm:text-sm font-semibold text-white">{dest.name}</div>
              <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-white/60">{dest.code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 py-6 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl border border-white/20 bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
              <h2 className="text-lg sm:text-2xl font-bold text-white">Form Pemesanan Tiket</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitBooking} className="space-y-4 sm:space-y-5">
              {/* Selected Service Info */}
              <div className="rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-4">
                <div className="mb-1 text-[10px] sm:text-xs font-medium uppercase tracking-wider text-white/60">
                  Paket yang dipilih
                </div>
                <div className="mb-2 text-base sm:text-lg font-semibold text-white">{selectedService.name}</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-300">Rp {selectedService.price.toLocaleString()}</div>
                {selectedService.flightDate && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <span className="text-white/60">🛫</span>
                    <span>
                      {new Date(selectedService.flightDate).toLocaleString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Trip Type & Passengers */}
              {/* <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">Tipe Perjalanan</label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as any)}
                    className="w-full rounded-lg border border-white/20 bg-slate-800 px-4 py-3 text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  >
                    <option value="one-way" className="bg-slate-800 text-white">Sekali Jalan</option>
                    <option value="round-trip" className="bg-slate-800 text-white">Pulang Pergi</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">Jumlah Penumpang</label>
                  <input
                    type="number"
                    min="1"
                    max="9"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div> */}

              {/* Dates */}
              {/* <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    Tanggal Keberangkatan <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
                {tripType === "round-trip" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">Tanggal Kembali</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={departureDate || new Date().toISOString().split("T")[0]}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>
                )}
              </div> */}

              {/* Passenger Info */}
              <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Data Penumpang</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      Nama Penumpang <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="Nama lengkap"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/90">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">
                    Nomor Telepon <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={passengerPhone}
                    onChange={(e) => setPassengerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-sky-600 bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-700 hover:from-sky-700 hover:to-indigo-700"
                >
                  Konfirmasi Pemesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Hasil Pencarian
            {filteredServices.length > 0 && (
              <span className="ml-2 text-lg font-normal text-white/70">({filteredServices.length} paket ditemukan)</span>
            )}
          </h2>
          {filteredServices.length > 0 && (
            <div className="text-sm text-white/60">
              Menampilkan semua hasil untuk "{searchQuery || "semua destinasi"}"
            </div>
          )}
        </div>

        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <div className="mb-4 text-4xl">✈️</div>
            <div className="text-white/80">Memuat paket penerbangan...</div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-sm text-red-100">
            {error}
          </div>
        )}

        {!loading && !error && filteredServices.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <div className="mb-4 text-5xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold text-white">Tidak ada paket ditemukan</h3>
            <p className="mb-6 text-white/70">
              {searchQuery
                ? `Tidak ada paket yang cocok dengan "${searchQuery}". Coba ubah kata kunci pencarian Anda.`
                : "Belum ada paket tersedia. Silakan hubungi admin untuk menambahkan paket baru."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
              >
                Hapus Filter
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <div key={service.id} className="flex flex-col">
                <ServiceCard service={service} hideButton={true} />
                <button
                  onClick={() => handleBookService(service)}
                  className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Pesan Sekarang
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
