import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./AuthContext";
import Admin from "./pages/Admin";
import Background from "./components/Background";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '10px',
            border: '1px solid rgba(148, 163, 184, 0.18)'
          }
        }} />
        <Background />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="rounded-2xl p-5 sm:p-7 lg:p-8 bg-slate-900/80 border border-slate-700/50 shadow-2xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Protected children={<Dashboard />} />} />
                  <Route path="/admin" element={<AdminOnly children={<Admin />} />} />
                </Routes>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return user.role === "admin" ? <>{children}</> : <Navigate to="/" replace />;
}

