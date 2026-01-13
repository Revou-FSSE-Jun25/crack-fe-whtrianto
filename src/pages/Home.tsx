import ServiceCard from "../components/ServiceCard";
import api from "../api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AirplaneIcon,
  ShieldIcon,
  MobileIcon,
  TargetIcon,
  InsuranceIcon,
  StarIcon,
  TicketIcon,
  UsersIcon,
} from "../components/Icons";

type Service = { id: number; name: string; description?: string | null; price: number; flightDate?: string | null };

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const features = [
    {
      icon: AirplaneIcon,
      title: "50+ Maskapai Terpercaya",
      description: "Akses ke ratusan rute domestik dan internasional dari maskapai ternama dunia dengan jaminan kualitas terbaik.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: ShieldIcon,
      title: "Pembayaran Aman",
      description: "Transaksi dijamin aman dengan enkripsi SSL tingkat enterprise dan dukungan berbagai metode pembayaran terpercaya.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: MobileIcon,
      title: "Aplikasi Mobile",
      description: "Kelola booking, cek-in online, dan akses boarding pass langsung dari smartphone Anda dengan aplikasi yang user-friendly.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: TargetIcon,
      title: "Harga Terbaik",
      description: "Garansi harga terbaik dengan perbandingan real-time dari berbagai sumber terpercaya dan penawaran eksklusif.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: InsuranceIcon,
      title: "Asuransi Perjalanan",
      description: "Perlindungan lengkap untuk perjalanan Anda dengan paket asuransi yang fleksibel dan coverage komprehensif.",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: StarIcon,
      title: "Loyalty Program",
      description: "Dapatkan poin reward setiap transaksi dan tukar dengan diskon atau upgrade gratis ke berbagai destinasi.",
      gradient: "from-amber-500 to-yellow-500",
    },
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Business Traveler",
      text: "RevoBooking memudahkan perjalanan bisnis saya. Booking cepat, harga kompetitif, dan support 24/7 sangat membantu dalam mengatur jadwal perjalanan.",
      rating: 5,
    },
    {
      name: "Sari Dewi",
      role: "Travel Enthusiast",
      text: "Platform terbaik untuk mencari tiket murah! Sudah 3 kali liburan menggunakan RevoBooking dan selalu puas dengan pelayanannya yang ramah dan responsif.",
      rating: 5,
    },
    {
      name: "Ahmad Rizki",
      role: "Frequent Flyer",
      text: "Loyalty program-nya sangat menguntungkan. Poin yang terkumpul bisa langsung dipakai untuk diskon tiket berikutnya. Highly recommended!",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Maskapai Partner", value: "50+", icon: AirplaneIcon, gradient: "from-blue-500 to-cyan-500" },
    { label: "Tiket Terjual", value: "2.1M+", icon: TicketIcon, gradient: "from-purple-500 to-pink-500" },
    { label: "Pengguna Aktif", value: "850K+", icon: UsersIcon, gradient: "from-orange-500 to-red-500" },
    { label: "Rating", value: "4.8/5", icon: StarIcon, gradient: "from-yellow-500 to-amber-500" },
  ];

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data))
      .catch(() => setError("Gagal memuat layanan. Pastikan backend berjalan."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 text-white">
      {/* Hero Section - Modern & Professional */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/50 px-4 py-2 text-sm font-medium text-white/90">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Platform Booking Penerbangan #1 di Indonesia</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Perjalanan Impian
              </span>
              <br />
              <span className="text-white">Dimulai dari Sini</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
              RevoBooking adalah partner terpercaya untuk semua kebutuhan perjalanan Anda. Dengan teknologi canggih dan layanan prima, kami menghadirkan pengalaman booking yang mudah, cepat, dan menguntungkan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Cari Tiket Sekarang</span>
                <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-slate-900/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-slate-900/50 hover:scale-105"
              >
                Daftar Gratis
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-6 transition-all duration-300 hover:border-white/20 hover:bg-slate-900/60 hover:scale-105"
                  >
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                    <div className="mt-1 text-xs font-medium text-white/70">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section id="features" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              Fitur Unggulan
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-normal sm:text-4xl lg:text-5xl">
              <span className="text-white">Mengapa Pilih </span>
              <span className="gradient-text-blue-cyan">RevoBooking?</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Teknologi dan layanan terbaik untuk memastikan perjalanan Anda berjalan lancar dan nyaman
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-opacity group-hover:opacity-50" />
                  <div className="relative">
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-base leading-relaxed text-white/70">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section - Professional Layout */}
      <section id="about" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-400">
              Tentang Kami
            </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Platform Terpercaya untuk{" "}
              <span className="gradient-text-purple-pink">Perjalanan Anda</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Menjadi solusi terdepan dalam industri travel dengan komitmen memberikan pengalaman terbaik untuk setiap pelanggan
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-white-300">
                  <TargetIcon className="h-4 w-4" />
                  Visi Kami
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Masa Depan Perjalanan</h3>
                <p className="text-base leading-relaxed text-white/80">
                  Menjadi platform booking penerbangan terdepan di Asia Tenggara yang menghubungkan jutaan pelanggan dengan perjalanan impian mereka melalui teknologi inovatif dan layanan berkualitas tinggi.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-white-300">
                  <AirplaneIcon className="h-4 w-4" />
                  Misi Kami
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Komitmen Kami</h3>
                <p className="text-base leading-relaxed text-white/80">
                  Memberikan akses mudah, cepat, dan terjangkau untuk semua kebutuhan perjalanan dengan fokus pada kepuasan pelanggan, transparansi harga, dan inovasi berkelanjutan dalam industri travel.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-slate-900/60 p-10">
            <h3 className="mb-8 text-center text-2xl font-bold text-white">Mengapa Memilih RevoBooking?</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Lebih dari 10 tahun pengalaman di industri travel",
                "Tim profesional yang siap membantu 24/7",
                "Kerjasama dengan 50+ maskapai ternama",
                "Garansi harga terbaik di pasar",
                "Sistem keamanan data tingkat enterprise",
                "Program reward dan diskon eksklusif",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Design */}
      <section id="testimonials" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-400">
              Testimoni
            </div>
            <h2 className="mb-4 text-3xl font-bold leading-normal sm:text-4xl lg:text-5xl">
              Apa Kata <span className="gradient-text-amber-orange">Pelanggan Kami</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Ribuan pelanggan telah mempercayakan perjalanan mereka kepada RevoBooking
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/50 border border-white/10">
                      <UsersIcon className="h-7 w-7 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/60">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-white/80">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Modern Grid */}
      <section id="services" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4">
            <div>
              <div className="mb-4 inline-block rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-400">
                Paket Penerbangan
              </div>
              <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Destinasi <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Populer</span>
              </h2>
              <p className="text-lg text-white/70">
                Pilih paket yang sesuai dengan kebutuhan perjalanan Anda
              </p>
            </div>
            <Link
              to="/booking"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:scale-105"
            >
              Lihat Semua Paket
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {loading && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-16 text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue-500" />
              <div className="text-base text-white/80">Memuat paket penerbangan terbaik...</div>
            </div>
          )}
          {!loading && error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-6 py-4 text-sm text-red-100">
              {error}
            </div>
          )}
          {!loading && !error && services.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-16 text-center">
              <AirplaneIcon className="mx-auto mb-4 h-16 w-16 text-white/40" />
              <h3 className="mb-2 text-xl font-semibold text-white">Belum Ada Paket Tersedia</h3>
              <p className="text-base text-white/70">Masuk sebagai admin untuk menambahkan rute dan penawaran penerbangan terbaru.</p>
            </div>
          )}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Modern & Eye-catching */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-sky-600 to-pink-600" />
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-white/20 blur-3xl animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl 2xl:text-6xl">
            Siap Memulai <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">Perjalanan Anda?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-white/90">
            Daftar sekarang dan dapatkan penawaran spesial untuk member baru dengan diskon hingga 20%
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/50"
            >
              <span className="relative z-10">Daftar Sekarang - Gratis</span>
              <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-slate-900/30 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-slate-900/50 hover:scale-105"
            >
              Cari Tiket
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
