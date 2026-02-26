"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Eye, EyeOff, Construction, Mail, Key, Save, Check, AlertCircle } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: boolean;
}

const PAGE_TOGGLES = [
  { key: "page_home", label: "Home", desc: "Main landing page" },
  { key: "page_work", label: "Work", desc: "Resume / work experience" },
  { key: "page_school", label: "School", desc: "Education page" },
  { key: "page_blog", label: "Blog", desc: "Blog listing & posts" },
  { key: "page_photos", label: "Photos", desc: "Photo gallery" },
  { key: "page_contact", label: "Contact", desc: "Contact form (Say Hi)" },
  { key: "page_calendar", label: "Calendar", desc: "Events calendar & bookings" },
];

const FEATURE_TOGGLES = [
  { key: "maintenance_mode", label: "Maintenance Mode", desc: "Show a maintenance page to all visitors", danger: true },
  { key: "contact_form_enabled", label: "Contact Form", desc: "Accept new contact form submissions" },
];

export default function AdminSettings() {
  const { pb } = useAdmin();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const result = await pb.collection("site_settings").getFullList({ sort: "key" });
        setSettings(result.map((r) => ({ id: r.id, key: r.key as string, value: r.value as boolean })));
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pb]);

  const toggle = async (key: string) => {
    const setting = settings.find((s) => s.key === key);
    if (!setting) return;
    setSaving(key);
    try {
      await pb.collection("site_settings").update(setting.id, { value: !setting.value });
      setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value: !s.value } : s)));
      setMessage({ type: "success", text: `${key.replace(/_/g, " ")} updated` });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update setting" });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const getValue = (key: string) => settings.find((s) => s.key === key)?.value ?? true;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }

    setPasswordLoading(true);
    try {
      // Re-authenticate with current password to verify identity
      await pb.collection("_superusers").authWithPassword(
        pb.authStore.record?.email as string,
        currentPassword
      );
      // Update password
      await pb.collection("_superusers").update(pb.authStore.record!.id, {
        password: newPassword,
        passwordConfirm: newPassword,
        oldPassword: currentPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", text: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update password. Check your current password." });
    } finally {
      setPasswordLoading(false);
      setTimeout(() => setMessage(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Configuration</p>
        <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Settings</h1>
      </div>

      {/* Toast */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-sm text-sm transition-all ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400/80"
              : "bg-red-500/10 border border-red-500/20 text-red-400/80"
          }`}
        >
          {message.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
          {message.text}
        </div>
      )}

      {/* Page Visibility */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Eye size={16} className="text-white/30" strokeWidth={1.5} />
          <h2 className="text-sm tracking-[0.15em] uppercase text-white/40">Page Visibility</h2>
        </div>
        <p className="text-xs text-white/20 mb-6">
          Toggle which pages are visible to visitors. Hidden pages will be removed from the navigation menu.
        </p>
        <div className="space-y-2">
          {PAGE_TOGGLES.map((page) => (
            <div
              key={page.key}
              className="flex items-center justify-between p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]"
            >
              <div>
                <p className="text-sm text-white/60">{page.label}</p>
                <p className="text-xs text-white/20 mt-0.5">{page.desc}</p>
              </div>
              <button
                onClick={() => toggle(page.key)}
                disabled={saving === page.key}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  getValue(page.key) ? "bg-green-500/30" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                    getValue(page.key) ? "translate-x-5 bg-green-400" : "translate-x-0 bg-white/30"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Toggles */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Construction size={16} className="text-white/30" strokeWidth={1.5} />
          <h2 className="text-sm tracking-[0.15em] uppercase text-white/40">Features</h2>
        </div>
        <div className="space-y-2">
          {FEATURE_TOGGLES.map((feat) => (
            <div
              key={feat.key}
              className={`flex items-center justify-between p-4 rounded-sm border ${
                feat.danger && getValue(feat.key)
                  ? "border-red-500/20 bg-red-500/[0.03]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/60">{feat.label}</p>
                  {feat.danger && getValue(feat.key) && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400/80 uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/20 mt-0.5">{feat.desc}</p>
              </div>
              <button
                onClick={() => toggle(feat.key)}
                disabled={saving === feat.key}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                  getValue(feat.key)
                    ? feat.danger
                      ? "bg-red-500/30"
                      : "bg-green-500/30"
                    : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-200 ${
                    getValue(feat.key)
                      ? feat.danger
                        ? "translate-x-5 bg-red-400"
                        : "translate-x-5 bg-green-400"
                      : "translate-x-0 bg-white/30"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Change Password */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Key size={16} className="text-white/30" strokeWidth={1.5} />
          <h2 className="text-sm tracking-[0.15em] uppercase text-white/40">Change Password</h2>
        </div>
        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="Min 8 characters"
            />
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={passwordLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm text-sm text-white/70 transition-all duration-300 disabled:opacity-40"
          >
            {passwordLoading ? (
              <div className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Update Password
          </button>
        </form>
      </section>

      {/* Account Info */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Mail size={16} className="text-white/30" strokeWidth={1.5} />
          <h2 className="text-sm tracking-[0.15em] uppercase text-white/40">Account</h2>
        </div>
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] max-w-md">
          <p className="text-xs text-white/20 mb-1">Signed in as</p>
          <p className="text-sm text-white/60">{pb.authStore.record?.email || "—"}</p>
        </div>
      </section>
    </div>
  );
}
