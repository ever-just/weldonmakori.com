"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Index" },
  { href: "/resume", label: "Resume" },
  { href: "/education", label: "Education" },
  { href: "/blog", label: "Blog" },
  { href: "/photos", label: "Photos" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/" },
  { label: "GitHub", href: "https://github.com/ever-just" },
  { label: "X", href: "https://x.com/makori_weldon" },
  { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-white/90">
              Weldon Makori
            </p>
            <p className="mt-3 text-sm text-white/30 max-w-xs leading-relaxed">
              Minneapolis, MN
            </p>
          </div>

          <div className="flex gap-16">
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
