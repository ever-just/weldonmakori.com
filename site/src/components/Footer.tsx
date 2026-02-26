"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Mail, Check, Loader2 } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Work" },
  { href: "/education", label: "School" },
  { href: "/blog", label: "Blog" },
  { href: "/photos", label: "Photos" },
  { href: "/calendar", label: "Calendar" },
  { href: "/contact", label: "Say Hi" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/" },
  { label: "GitHub", href: "https://github.com/ever-just" },
  { label: "X", href: "https://x.com/makori_weldon" },
  { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/" },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subMsg, setSubMsg] = useState("");

  if (pathname.startsWith("/admin")) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("https://weldonmakori.com/mail/api/public/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: email.split("@")[0],
          list_uuids: ["358c1300-1d81-4b19-8677-d8b403bde192"],
        }),
      });
      if (res.ok) {
        setSubStatus("success");
        setSubMsg("Check your email to confirm!");
        setEmail("");
      } else {
        throw new Error("Subscribe failed");
      }
    } catch {
      setSubStatus("error");
      setSubMsg("Something went wrong. Try again.");
    }
    setTimeout(() => { setSubStatus("idle"); setSubMsg(""); }, 5000);
  };

  const handlePushSubscribe = () => {
    window.open("https://weldonmakori.com/notify/weldonmakori-updates/subscribe", "_blank");
  };

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        {/* Subscribe Section */}
        <div className="mb-16 pb-12 border-b border-white/[0.04]">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-3">Stay Updated</p>
            <h3 className="text-lg font-light text-white/70 mb-6">
              Get notified when I publish something new.
            </h3>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-white/10 rounded-full px-4 py-2.5 text-sm text-white/80 placeholder:text-white/15 focus:border-white/25 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={subStatus === "loading"}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-sm text-white/70 transition-all duration-300 disabled:opacity-40 shrink-0"
              >
                {subStatus === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : subStatus === "success" ? (
                  <Check size={14} />
                ) : (
                  <Mail size={14} />
                )}
                Subscribe
              </button>
            </form>
            {subMsg && (
              <p className={`text-xs ${subStatus === "success" ? "text-green-400/60" : "text-red-400/60"}`}>
                {subMsg}
              </p>
            )}
            <button
              onClick={handlePushSubscribe}
              className="inline-flex items-center gap-2 mt-3 text-xs text-white/20 hover:text-white/40 transition-colors"
            >
              <Bell size={12} />
              Or enable push notifications
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/90">
              Weldon Makori
            </p>
            <p className="mt-3 text-sm text-white/30 max-w-xs leading-relaxed">
              Minneapolis, MN
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">Pages</p>
              <nav className="flex flex-col gap-3">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">Social</p>
              <nav className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white/70 transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/15">
            &copy; {new Date().getFullYear()} Weldon Makori
          </p>
          <a
            href="mailto:weldonmakori@outlook.com"
            className="text-xs text-white/15 hover:text-white/40 transition-colors"
          >
            weldonmakori@outlook.com
          </a>
        </div>
      </div>
    </footer>
  );
}
