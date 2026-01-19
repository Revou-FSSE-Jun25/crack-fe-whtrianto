import { useEffect, useState, useMemo } from "react";
import api from "../api/api";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";
import { formatRupiah } from "../utils/formatRupiah";

type Service = { id: number; name: string; description?: string | null; price: number; flightDate?: string | null };
type Booking = {
  id: number;
  date: string;
  status: string;
  user: { name: string; email: string };
  service: { name: string; price?: number; flightDate?: string | null };
};

const STATUS_OPTIONS = ["pending", "confirmed", "completed", "cancelled"] as const;
type User = { id: number; name: string; email: string; role: "admin" | "user"; createdAt?: string };
type Destination = { id: number; name: string; image?: string };
type Aircraft = { id: number; name: string; type?: string };

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"dashboard" | "services" | "bookings" | "users" | "destinations" | "aircrafts">("dashboard");

  // Services state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [editService, setEditService] = useState<{ name: string; description: string; price: string; flightDate: string }>({
    name: "",
    description: "",
    price: "",
    flightDate: "",
  });

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [newUser, setNewUser] = useState<{ name: string; email: string; password: string; role: "admin" | "user" }>({ name: "", email: "", password: "", role: "user" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<{ name: string; email: string; password: string; role: "admin" | "user" }>({ name: "", email: "", password: "", role: "user" });

  // Destinations state
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState<boolean>(true);
  const [newDestination, setNewDestination] = useState<{ name: string; image: string }>({ name: "", image: "" });
  const [editingDestinationId, setEditingDestinationId] = useState<number | null>(null);
  const [editDestination, setEditDestination] = useState<{ name: string; image: string }>({ name: "", image: "" });

  // Aircrafts state
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [loadingAircrafts, setLoadingAircrafts] = useState<boolean>(true);
  const [newAircraft, setNewAircraft] = useState<{ name: string; type: string }>({ name: "", type: "" });
  const [editingAircraftId, setEditingAircraftId] = useState<number | null>(null);
  const [editAircraft, setEditAircraft] = useState<{ name: string; type: string }>({ name: "", type: "" });

  const loadServices = async () => {
    setLoadingServices(true);
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } finally {
      setLoadingServices(false);
    }
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    loadServices();
    loadBookings();
    loadUsers();
    loadDestinations();
    loadAircrafts();
  }, []);

  const loadDestinations = async () => {
    setLoadingDestinations(true);
    try {
      const res = await api.get("/destinations");
      setDestinations(res.data);
    } finally {
      setLoadingDestinations(false);
    }
  };

  const createDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestination.name) return toast.error("Nama tujuan diperlukan");
    try {
      await api.post("/destinations", newDestination);
      setNewDestination({ name: "", image: "" });
      await loadDestinations();
      toast.success("Tujuan dibuat");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal membuat tujuan");
    }
  };

  const deleteDestination = async (id: number) => {
    if (!confirm("Hapus tujuan ini?")) return;
    try {
      await api.delete(`/destinations/${id}`);
      await loadDestinations();
      toast.success("Tujuan dihapus");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal menghapus tujuan");
    }
  };

  const startEditDestination = (d: Destination) => {
    setEditingDestinationId(d.id);
    setEditDestination({ name: d.name, image: d.image || "" });
  };

  const cancelEditDestination = () => {
    setEditingDestinationId(null);
    setEditDestination({ name: "", image: "" });
  };

  const saveEditDestination = async (id: number) => {
    if (!editDestination.name) return toast.error("Nama tujuan diperlukan");
    try {
      await api.patch(`/destinations/${id}`, editDestination);
      await loadDestinations();
      cancelEditDestination();
      toast.success("Tujuan diperbarui");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal memperbarui tujuan");
    }
  };

  const loadAircrafts = async () => {
    setLoadingAircrafts(true);
    try {
      const res = await api.get("/aircrafts");
      setAircrafts(res.data);
    } finally {
      setLoadingAircrafts(false);
    }
  };

  const createAircraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAircraft.name) return toast.error("Nama pesawat diperlukan");
    try {
      await api.post("/aircrafts", newAircraft);
      setNewAircraft({ name: "", type: "" });
      await loadAircrafts();
      toast.success("Pesawat dibuat");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal membuat pesawat");
    }
  };

  const deleteAircraft = async (id: number) => {
    if (!confirm("Hapus pesawat ini?")) return;
    try {
      await api.delete(`/aircrafts/${id}`);
      await loadAircrafts();
      toast.success("Pesawat dihapus");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal menghapus pesawat");
    }
  };

  const startEditAircraft = (a: Aircraft) => {
    setEditingAircraftId(a.id);
    setEditAircraft({ name: a.name, type: a.type || "" });
  };

  const cancelEditAircraft = () => {
    setEditingAircraftId(null);
    setEditAircraft({ name: "", type: "" });
  };

  const saveEditAircraft = async (id: number) => {
    if (!editAircraft.name) return toast.error("Nama pesawat diperlukan");
    try {
      await api.patch(`/aircrafts/${id}`, editAircraft);
      await loadAircrafts();
      cancelEditAircraft();
      toast.success("Pesawat diperbarui");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal memperbarui pesawat");
    }
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Number(price);
    if (!name || !Number.isFinite(priceNum)) return toast.error("Nama dan harga valid diperlukan");
    if (!flightDate) return toast.error("Tanggal dan jam terbang diperlukan");
    let flightDateISO: string | null = null;
    try {
      flightDateISO = new Date(flightDate).toISOString();
      if (!flightDateISO) throw new Error();
    } catch {
      return toast.error("Format tanggal dan jam terbang tidak valid");
    }
    try {
      await api.post("/services", { name, description, price: priceNum, flightDate: flightDateISO });
      setName("");
      setDescription("");
      setPrice("");
      setFlightDate("");
      await loadServices();
      toast.success("Layanan dibuat");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal membuat layanan");
    }
  };

  const startEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setEditService({
      name: service.name,
      description: service.description || "",
      price: service.price.toString(),
      flightDate: toDateTimeLocalValue(service.flightDate),
    });
  };

  const cancelEditService = () => {
    setEditingServiceId(null);
    setEditService({ name: "", description: "", price: "", flightDate: "" });
  };

  const saveEditService = async (id: number) => {
    const priceNum = Number(editService.price);
    if (!editService.name.trim() || !Number.isFinite(priceNum)) {
      return toast.error("Nama dan harga valid diperlukan");
    }
    let flightDateISO: string | null = null;
    if (editService.flightDate) {
      try {
        flightDateISO = new Date(editService.flightDate).toISOString();
        if (!flightDateISO) throw new Error();
      } catch {
        return toast.error("Format tanggal dan jam terbang tidak valid");
      }
    }
    try {
      await api.patch(`/services/${id}`, {
        name: editService.name.trim(),
        description: editService.description.trim(),
        price: priceNum,
        flightDate: flightDateISO,
      });
      await loadServices();
      cancelEditService();
      toast.success("Layanan berhasil diperbarui");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal memperbarui layanan");
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus layanan ini?")) return;
    try {
      const response = await api.delete(`/services/${id}`);
      await loadServices();
      toast.success(response.data?.message || "Layanan berhasil dihapus");
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || "Gagal menghapus layanan";
      toast.error(errorMessage);
      console.error("Delete service error:", e);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      setUpdatingId(id);
      await api.patch(`/bookings/${id}/status`, { status });
      await loadBookings();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal memperbarui status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus booking ini?")) return;
    try {
      const response = await api.delete(`/bookings/${id}`);
      await loadBookings();
      toast.success(response.data?.message || "Booking berhasil dihapus");
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || "Gagal menghapus booking";
      toast.error(errorMessage);
      console.error("Delete booking error:", e);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-white/10 text-white/80 border-white/20";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: { [key: string]: string } = {
      confirmed: "Terkonfirmasi",
      pending: "Menunggu",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return labels[status.toLowerCase()] || status;
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



  // Dashboard statistics
  const stats = useMemo(() => {
    const totalRevenue = bookings
      .filter((b) => b.status.toLowerCase() !== "cancelled" && b.service?.price)
      .reduce((sum, b) => sum + (b.service?.price || 0), 0);

    const pendingBookings = bookings.filter((b) => b.status.toLowerCase() === "pending").length;
    const confirmedBookings = bookings.filter((b) => b.status.toLowerCase() === "confirmed").length;
    const completedBookings = bookings.filter((b) => b.status.toLowerCase() === "completed").length;
    const cancelledBookings = bookings.filter((b) => b.status.toLowerCase() === "cancelled").length;

    const adminUsers = users.filter((u) => u.role === "admin").length;
    const regularUsers = users.filter((u) => u.role === "user").length;

    return {
      totalServices: services.length,
      totalBookings: bookings.length,
      totalUsers: users.length,
      totalRevenue,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      adminUsers,
      regularUsers,
    };
  }, [services, bookings, users]);

  // Recent bookings (last 5)
  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [bookings]);

  const toDateTimeLocalValue = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } finally {
      setLoadingUsers(false);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.password) return toast.error("Lengkapi data user");
    try {
      await api.post("/users", newUser);
      setNewUser({ name: "", email: "", password: "", role: "user" });
      await loadUsers();
      toast.success("User dibuat");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal membuat user");
    }
  };

  const updateUserRole = async (id: number, role: "admin" | "user") => {
    try {
      await api.patch(`/users/${id}`, { role });
      await loadUsers();
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal mengubah role");
    }
  };

  const deleteUser = async (id: number) => {
    const user = users.find(u => u.id === id);
    if (user?.role === "admin") {
      toast.error("User dengan role admin tidak dapat dihapus");
      return;
    }
    if (!confirm("Hapus user ini?")) return;
    try {
      await api.delete(`/users/${id}`);
      await loadUsers();
      toast.success("User berhasil dihapus");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal menghapus user");
    }
  };

  const startEdit = (u: User) => {
    setEditingId(u.id);
    setEditUser({ name: u.name, email: u.email, password: "", role: u.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUser({ name: "", email: "", password: "", role: "user" });
  };

  const saveEdit = async (id: number) => {
    if (!editUser.name.trim() && !editUser.email.trim() && !editUser.password.trim() && !editUser.role) {
      return toast.error("Tidak ada perubahan untuk disimpan");
    }
    const payload: any = {};
    if (editUser.name.trim()) payload.name = editUser.name.trim();
    if (editUser.email.trim()) payload.email = editUser.email.trim();
    if (editUser.password.trim()) payload.password = editUser.password.trim();
    if (editUser.role) payload.role = editUser.role;
    try {
      await api.patch(`/users/${id}`, payload);
      await loadUsers();
      cancelEdit();
      toast.success("User berhasil diperbarui");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Admin Dashboard</h1>
        <p className="text-white/80">Selamat datang, {user?.name || "Admin"}! Kelola semua aspek platform dari sini.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "dashboard"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "services"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("services")}
        >
          ℹ️ Layanan
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "bookings"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("bookings")}
        >
          📋 Booking
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "users"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("users")}
        >
          👥 Users
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "destinations"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("destinations")}
        >
          📍 Tujuan
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all ${tab === "aircrafts"
            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg"
            : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          onClick={() => setTab("aircrafts")}
        >
          ✈️ Pesawat
        </button>
      </div>

      {/* Dashboard Tab */}
      {tab === "dashboard" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-white/70">Total Layanan</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-xl">✈️</div>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalServices}</div>
              <div className="mt-2 text-xs text-white/60">Paket penerbangan aktif</div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-white/70">Total Booking</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-xl">📋</div>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalBookings}</div>
              <div className="mt-2 text-xs text-white/60">Semua pemesanan</div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-white/70">Total Users</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20 text-xl">👥</div>
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
              <div className="mt-2 text-xs text-white/60">
                {stats.adminUsers} admin, {stats.regularUsers} user
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-white/70">Total Revenue</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-xl">💰</div>
              </div>
              <div className="text-2xl font-bold text-white">{formatRupiah(stats.totalRevenue)}</div>
              <div className="mt-2 text-xs text-white/60">Pendapatan total</div>
            </div>
          </div>

          {/* Booking Status Overview */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
              <div className="mb-1 text-sm font-medium text-yellow-300">Menunggu</div>
              <div className="text-2xl font-bold text-yellow-200">{stats.pendingBookings}</div>
            </div>
            <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
              <div className="mb-1 text-sm font-medium text-green-300">Terkonfirmasi</div>
              <div className="text-2xl font-bold text-green-200">{stats.confirmedBookings}</div>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
              <div className="mb-1 text-sm font-medium text-blue-300">Selesai</div>
              <div className="text-2xl font-bold text-blue-200">{stats.completedBookings}</div>
            </div>
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <div className="mb-1 text-sm font-medium text-red-300">Dibatalkan</div>
              <div className="text-2xl font-bold text-red-200">{stats.cancelledBookings}</div>
            </div>
          </div>

          {/* Quick Actions & Recent Bookings */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Quick Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setTab("services")}
                  className="w-full rounded-lg border border-white/10 bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-left font-medium text-white transition hover:from-blue-700 hover:to-cyan-700"
                >
                  ➕ Tambah Layanan Baru
                </button>
                <button
                  onClick={() => setTab("bookings")}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left font-medium text-white transition hover:bg-white/10"
                >
                  📋 Kelola Booking
                </button>
                <button
                  onClick={() => setTab("users")}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left font-medium text-white transition hover:bg-white/10"
                >
                  👤 Kelola Users
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold text-white">Recent Bookings</h2>
              {loadingBookings ? (
                <div className="text-center text-white/60">Memuat...</div>
              ) : recentBookings.length === 0 ? (
                <div className="text-center text-white/60">Belum ada booking</div>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((b) => (
                    <div
                      key={b.id}
                      className="rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-white">{b.service?.name || "Layanan"}</div>
                          <div className="text-xs text-white/60">{b.user?.name}</div>
                        </div>
                        <span
                          className={`rounded-full border px-2 py-1 text-xs font-semibold ${getStatusColor(b.status)}`}
                        >
                          {getStatusLabel(b.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "services" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3 text-white">Buat Layanan</h2>
            <form onSubmit={create} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6 shadow-sm">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Tujuan</label>
                <select
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <option value="" disabled>Pilih Tujuan</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name} className="bg-slate-800">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Pesawat Yang Digunakan</label>
                <select
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  <option value="" disabled>Pilih Pesawat</option>
                  {aircrafts.map((a) => (
                    <option key={a.id} value={a.name} className="bg-slate-800">
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Tanggal &amp; Jam Terbang <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  required
                  value={flightDate}
                  onChange={(e) => setFlightDate(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Harga</label>
                <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <button className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700">Simpan</button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-3 text-white">Daftar Layanan</h2>
            {loadingServices ? (
              <div className="text-slate-300">Memuat...</div>
            ) : services.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-slate-300">
                Belum ada layanan. Buat layanan baru di form sebelah kiri.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-sm">
                    {editingServiceId === s.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Tujuan</label>
                          <select
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editService.name}
                            onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                          >
                            <option value="">Pilih Tujuan</option>
                            {destinations.map((d) => (
                              <option key={d.id} value={d.name} className="bg-slate-800">
                                {d.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Pesawat Yang Digunakan</label>
                          <select
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editService.description}
                            onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                          >
                            <option value="">Pilih Pesawat</option>
                            {aircrafts.map((a) => (
                              <option key={a.id} value={a.name} className="bg-slate-800">
                                {a.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Tanggal &amp; Jam Terbang</label>
                          <input
                            type="datetime-local"
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editService.flightDate}
                            onChange={(e) => setEditService({ ...editService, flightDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Harga</label>
                          <input
                            type="number"
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editService.price}
                            onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => saveEditService(s.id)}
                            className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEditService}
                            className="flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <div className="font-medium text-white">{s.name}</div>
                          <div className="mt-1 text-sm text-slate-300">{s.description || "-"}</div>
                          {s.flightDate && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
                              <span className="text-white/50">🗓</span>
                              <span>{formatBookingDate(s.flightDate)}</span>
                            </div>
                          )}
                          <div className="mt-2 text-base font-semibold text-amber-300">{formatRupiah(s.price)}</div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-white/10">
                          <button
                            onClick={() => startEditService(s)}
                            className="flex-1 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteService(s.id)}
                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "bookings" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Kelola Booking</h2>
            {bookings.length > 0 && (
              <div className="text-sm text-white/60">
                Total: {bookings.length} booking
              </div>
            )}
          </div>

          {loadingBookings ? (
            <div className="rounded-xl border border-white/10 bg-black/30 p-8 text-center text-slate-300">
              Memuat data booking...
            </div>
          ) : bookings.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/15 bg-black/30 p-12 text-center shadow-inner">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/15 text-3xl">
                📋
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Belum Ada Booking</h3>
              <p className="text-white/70">Tidak ada booking yang ditemukan.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="group flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/10 p-6 shadow-sm transition duration-200 hover:border-white/20 hover:shadow-xl"
                >
                  <div className="flex flex-1 flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-2xl text-sky-200">
                        ✈️
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-white/40">
                          <span className="rounded bg-white/10 px-2 py-1 font-semibold text-white/70">
                            #{String(b.id).padStart(5, "0")}
                          </span>
                          <span className="rounded bg-white/5 px-2 py-1 text-white/50">
                            {b.service?.name ? "Paket" : "Layanan"}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {b.service?.name ?? "Layanan"}
                        </h3>
                        <div className="space-y-2 text-sm text-white/70">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-white/50">🗓</span>
                              {formatBookingDate(b.date)}
                            </span>
                          </div>
                          {b.service?.flightDate && (
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="inline-flex items-center gap-2">
                                <span className="text-white/50">🛫</span>
                                {formatBookingDate(b.service.flightDate)}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-white/50">👤</span>
                              <span className="font-medium text-white/80">{b.user?.name}</span>
                            </span>
                            <span className="text-white/40">•</span>
                            <span className="inline-flex items-center gap-2">
                              <span className="text-white/50">✉️</span>
                              <span className="text-xs">{b.user?.email}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusColor(b.status)}`}
                        >
                          {getStatusLabel(b.status)}
                        </span>
                        {updatingId === b.id && (
                          <span className="text-xs text-white/60">Menyimpan...</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <select
                          className="w-full rounded-lg border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          disabled={updatingId === b.id}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="bg-slate-800 text-white">
                              {getStatusLabel(opt)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                        >
                          Hapus Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3 text-white">Buat User</h2>
            <form onSubmit={createUser} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6 shadow-sm">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Nama</label>
                <input className="w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input className="w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <input type="password" className="w-full rounded-md border border-white/10 bg-white/5 text-white px-3 py-2" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Role</label>
                <select className="w-full rounded-md border border-white/10 bg-slate-800 text-white px-3 py-2" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}>
                  <option value="user" className="bg-slate-800 text-white">user</option>
                  <option value="admin" className="bg-slate-800 text-white">admin</option>
                </select>
              </div>
              <button className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700">Simpan</button>
            </form>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-3 text-white">Daftar Users</h2>
            {loadingUsers ? (
              <div className="text-slate-300">Memuat...</div>
            ) : users.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-slate-300">
                Belum ada user. Buat user baru di form sebelah kiri.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((u) => (
                  <div key={u.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-black/30 p-4 shadow-sm">
                    {editingId === u.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-slate-300 mb-1 block">Nama</label>
                          <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 mb-1 block">Email</label>
                          <input type="email" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 mb-1 block">Password baru (opsional)</label>
                          <input type="password" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" value={editUser.password} onChange={(e) => setEditUser({ ...editUser, password: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 mb-1 block">Role</label>
                          <select className="w-full rounded-md border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white" value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value as any })}>
                            <option value="user" className="bg-slate-800 text-white">user</option>
                            <option value="admin" className="bg-slate-800 text-white">admin</option>
                          </select>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-white/10">
                          <button onClick={() => saveEdit(u.id)} className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700">Simpan</button>
                          <button onClick={cancelEdit} className="flex-1 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/15">Batal</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-2">
                          <div className="font-medium text-white">{u.name}</div>
                          <div className="text-sm text-slate-300 mt-1">{u.email}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            Role: <span className={`font-semibold ${u.role === "admin" ? "text-amber-400" : "text-blue-400"}`}>{u.role}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                          <select className="w-full rounded-md border border-white/10 bg-slate-800 text-white px-3 py-2 text-sm" value={u.role} onChange={(e) => updateUserRole(u.id, e.target.value as any)}>
                            <option value="user" className="bg-slate-800 text-white">user</option>
                            <option value="admin" className="bg-slate-800 text-white">admin</option>
                          </select>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(u)} className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">Edit</button>
                            {u.role !== "admin" && (
                              <button onClick={() => deleteUser(u.id)} className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">Hapus</button>
                            )}
                            {u.role === "admin" && (
                              <button disabled className="flex-1 rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">Hapus</button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "destinations" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3 text-white">Buat Tujuan</h2>
            <form onSubmit={createDestination} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6 shadow-sm">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Tujuan</label>
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400"
                  value={newDestination.name}
                  onChange={(e) => setNewDestination({ ...newDestination, name: e.target.value })}
                  placeholder="Contoh: Jakarta"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">URL Gambar (Opsional)</label>
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400"
                  value={newDestination.image}
                  onChange={(e) => setNewDestination({ ...newDestination, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <button className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700">Simpan</button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-3 text-white">Daftar Tujuan</h2>
            {loadingDestinations ? (
              <div className="text-slate-300">Memuat...</div>
            ) : destinations.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-slate-300">
                Belum ada tujuan.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((d) => (
                  <div key={d.id} className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-sm">
                    {editingDestinationId === d.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Nama Kota</label>
                          <input
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editDestination.name}
                            onChange={(e) => setEditDestination({ ...editDestination, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">URL Gambar</label>
                          <input
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editDestination.image}
                            onChange={(e) => setEditDestination({ ...editDestination, image: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => saveEditDestination(d.id)}
                            className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEditDestination}
                            className="flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3 flex items-start gap-3">
                          {d.image && (
                            <img src={d.image} alt={d.name} className="h-16 w-16 rounded-md object-cover bg-white/10" />
                          )}
                          <div>
                            <div className="font-medium text-white">{d.name}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-white/10">
                          <button
                            onClick={() => startEditDestination(d)}
                            className="flex-1 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteDestination(d.id)}
                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "aircrafts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-3 text-white">Buat Pesawat</h2>
            <form onSubmit={createAircraft} className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-6 shadow-sm">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Nama Maskapai</label>
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400"
                  value={newAircraft.name}
                  onChange={(e) => setNewAircraft({ ...newAircraft, name: e.target.value })}
                  placeholder="Contoh: Garuda Indonesia"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">Tipe Pesawat (Opsional)</label>
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400"
                  value={newAircraft.type}
                  onChange={(e) => setNewAircraft({ ...newAircraft, type: e.target.value })}
                  placeholder="Contoh: Boeing 737"
                />
              </div>
              <button className="w-full rounded-md bg-indigo-600 py-2 text-white hover:bg-indigo-700">Simpan</button>
            </form>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-3 text-white">Daftar Pesawat</h2>
            {loadingAircrafts ? (
              <div className="text-slate-300">Memuat...</div>
            ) : aircrafts.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/30 p-6 text-center text-slate-300">
                Belum ada pesawat.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aircrafts.map((a) => (
                  <div key={a.id} className="rounded-xl border border-white/10 bg-black/30 p-4 shadow-sm">
                    {editingAircraftId === a.id ? (
                      <div className="space-y-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Nama Maskapai</label>
                          <input
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editAircraft.name}
                            onChange={(e) => setEditAircraft({ ...editAircraft, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">Tipe Pesawat</label>
                          <input
                            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                            value={editAircraft.type}
                            onChange={(e) => setEditAircraft({ ...editAircraft, type: e.target.value })}
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => saveEditAircraft(a.id)}
                            className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEditAircraft}
                            className="flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-3">
                          <div className="font-medium text-white">{a.name}</div>
                          {a.type && <div className="mt-1 text-sm text-slate-300">{a.type}</div>}
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-white/10">
                          <button
                            onClick={() => startEditAircraft(a)}
                            className="flex-1 rounded-md bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteAircraft(a.id)}
                            className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


