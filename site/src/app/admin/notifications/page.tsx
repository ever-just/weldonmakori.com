"use client";

import { useState } from "react";
import { Bell, ExternalLink, Send, Loader2, Check, AlertCircle } from "lucide-react";

const NTFY_URL = "http://142.93.78.220:8083";
const NTFY_TOPIC = "weldonmakori-updates";

export default function AdminNotifications() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(`${NTFY_URL}/${NTFY_TOPIC}`, {
        method: "POST",
        headers: {
          "Title": title || "New Update",
          "Content-Type": "text/plain",
        },
        body: message,
      });
      if (res.ok) {
        setStatus({ type: "success", text: "Notification sent!" });
        setTitle("");
        setMessage("");
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus({ type: "error", text: "Failed to send notification. Try again." });
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Push</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Notifications</h1>
        </div>
        <a
          href={NTFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
        >
          <ExternalLink size={12} />
          Open ntfy
        </a>
      </div>

      {/* Toast */}
      {status && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-sm text-sm transition-all ${
            status.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400/80"
              : "bg-red-500/10 border border-red-500/20 text-red-400/80"
          }`}
        >
          {status.type === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
          {status.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Info */}
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <Bell size={16} className="text-white/30 mt-0.5" />
            <div>
              <p className="text-sm text-white/60 mb-1">ntfy Push Notifications</p>
              <p className="text-xs text-white/25 leading-relaxed">
                Send instant push notifications to subscribers. Users subscribe via the ntfy app
                or browser to the <span className="text-white/40 font-mono">{NTFY_TOPIC}</span> topic.
              </p>
            </div>
          </div>
        </div>

        {/* Send Notification Form */}
        <div className="max-w-lg">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">Send a Notification</p>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New Blog Post"
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">
                Message *
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Check out my latest post about..."
                rows={4}
                className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm text-sm text-white/70 transition-all duration-300 disabled:opacity-40"
            >
              {sending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
              Send Notification
            </button>
          </form>
        </div>

        {/* Subscribe Instructions */}
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-3">How Users Subscribe</p>
          <div className="space-y-2 text-xs text-white/30 leading-relaxed">
            <p><span className="text-white/50">Web:</span> Visit <span className="font-mono text-white/40">weldonmakori.com/notify/{NTFY_TOPIC}</span> in a browser</p>
            <p><span className="text-white/50">Android:</span> Install ntfy app → Subscribe to <span className="font-mono text-white/40">{NTFY_TOPIC}</span> with server <span className="font-mono text-white/40">{NTFY_URL}</span></p>
            <p><span className="text-white/50">iOS:</span> Install ntfy app → Add subscription → Same as Android</p>
            <p><span className="text-white/50">CLI:</span> <span className="font-mono text-white/40">curl -s {NTFY_URL}/{NTFY_TOPIC}/json</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
