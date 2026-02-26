"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Image,
  CalendarDays,
  Users,
  LogOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import PocketBase from "pocketbase";
import pbClient from "@/lib/pocketbase";

const pb = pbClient;

const AdminAuthContext = createContext<{ pb: PocketBase; logout: () => void }>({
  pb,
  logout: () => {},
});

export function useAdmin() {
  return useContext(AdminAuthContext);
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/photos", label: "Photos", icon: Image },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/bookings", label: "Bookings", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pb.authStore.isValid) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await pb.collection("_superusers").authWithPassword(email, password);
      setAuthenticated(true);
    } catch (err: unknown) {
      console.error("Admin login error:", err);
      const msg = err instanceof Error ? err.message : String(err);
      setError("Login failed: " + msg);
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setAuthenticated(false);
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-3">Admin</p>
            <h1 className="text-2xl font-extralight text-white/80">Sign In</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400/70 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm text-sm text-white/70 transition-all duration-300"
            >
              Sign In
            </button>
          </form>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mt-8 text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ pb, logout }}>
      <div className="min-h-screen bg-[#050505] flex">
        {/* Sidebar — Desktop */}
        <aside className="hidden lg:flex flex-col w-56 border-r border-white/[0.06] fixed inset-y-0 left-0 z-40">
          <div className="px-6 py-6 border-b border-white/[0.06]">
            <Link href="/" className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white/50 transition-colors">
              ← weldonmakori.com
            </Link>
            <p className="text-sm font-light text-white/70 mt-2">Admin</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-200 ${
                    active
                      ? "bg-white/10 text-white/80"
                      : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="px-3 py-4 border-t border-white/[0.06]">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-sm text-white/30 hover:text-red-400/70 hover:bg-white/[0.04] transition-all duration-200"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center justify-between px-4 h-14">
            <p className="text-sm font-light text-white/60">Admin</p>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/40">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {mobileOpen && (
            <nav className="px-4 py-3 border-t border-white/[0.06] space-y-1">
              {navItems.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all ${
                      active ? "bg-white/10 text-white/80" : "text-white/30"
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-sm text-white/30 hover:text-red-400/70 transition-all"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                Sign Out
              </button>
            </nav>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:ml-56 pt-14 lg:pt-0">
          <div className="px-6 md:px-10 py-8 md:py-12">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthContext.Provider>
  );
}
