"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { site, type PageKey } from "@/data/site";

const allLinks: { href: string; label: string; settingKey: PageKey }[] = [
  { href: "/", label: "Home", settingKey: "home" },
  { href: "/resume", label: "Work", settingKey: "work" },
  { href: "/education", label: "School", settingKey: "school" },
  { href: "/blog", label: "Blog", settingKey: "blog" },
  { href: "/photos", label: "Media", settingKey: "photos" },
  { href: "/calendar", label: "Calendar", settingKey: "calendar" },
  { href: "/contact", label: "Say Hi", settingKey: "contact" },
];

const socials = site.socials;

export default function Footer() {
  const links = allLinks.filter((l) => site.pages[l.settingKey]);

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="mb-16 pb-12 border-b border-white/[0.04]">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-3">Stay in Touch</p>
            <h3 className="text-lg font-light text-white/70 mb-6">
              The fastest way to reach me is email.
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-full text-sm text-white/70 transition-all duration-300"
            >
              <Mail size={14} />
              {site.email}
            </a>
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
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">Pages</p>
              <nav className="flex flex-col gap-3">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm text-white/45 hover:text-white/70 transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">Social</p>
              <nav className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 hover:text-white/70 transition-colors duration-300"
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Weldon Makori
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-xs text-white/25 hover:text-white/40 transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
