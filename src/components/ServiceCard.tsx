import { useNavigate } from "react-router-dom";

type Props = {
  service: { id: number; name: string; description?: string | null; price: number; flightDate?: string | null };
  hideButton?: boolean;
  onBookClick?: () => void;
};

export default function ServiceCard({ service, hideButton = false, onBookClick }: Props) {
  const navigate = useNavigate();

  const handleBook = () => {
    if (onBookClick) {
      onBookClick();
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-indigo-500/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex flex-1 flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <h3 className="text-lg font-semibold text-white leading-tight">{service.name}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {service.description || "Rute favorit dengan benefit tambahan seperti bagasi prioritas, asuransi perjalanan, dan opsi upgrade kursi."}
            </p>
            {service.flightDate && (
              <div className="flex items-center gap-2 text-xs font-medium text-white/70">
                <span className="text-white/50">🛫</span>
                <span>
                  {new Date(service.flightDate).toLocaleString("id-ID", {
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
          <div className="flex-shrink-0 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Mulai dari</p>
            <p className="text-xl font-bold text-amber-300">Rp {service.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-2.5 text-xs text-white/70">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[10px] font-semibold text-white/80">
              1
            </span>
            <p className="leading-relaxed">Integrasi itinerary pintar: sinkronkan jadwal penerbangan ke kalender tim secara otomatis.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[10px] font-semibold text-white/80">
              2
            </span>
            <p className="leading-relaxed">Kebijakan reschedule fleksibel dengan dukungan concierge RevoBooking 24/7.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-[10px] font-semibold text-white/80">
              3
            </span>
            <p className="leading-relaxed">Benefit eksklusif: prioritas check-in, lounge partner, dan penawaran hotel terkurasi.</p>
          </div>
        </div>

        {/* Button - Only show if not hidden */}
        {!hideButton && (
          <div className="pt-2">
            <button
              onClick={handleBook}
              className="inline-flex w-full items-center justify-center rounded-lg bg-amber-300 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-slate-900/40"
            >
              Lihat Detail & Pesan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
