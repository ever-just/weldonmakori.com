"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, GraduationCap, Pen, Camera, Mail, CalendarDays, type LucideIcon } from "lucide-react";
import pb from "@/lib/pocketbase";

const allLinks: { href: string; label: string; icon: LucideIcon; settingKey: string }[] = [
  { href: "/", label: "Home", icon: Home, settingKey: "page_home" },
  { href: "/resume", label: "Work", icon: Briefcase, settingKey: "page_work" },
  { href: "/education", label: "School", icon: GraduationCap, settingKey: "page_school" },
  { href: "/blog", label: "Blog", icon: Pen, settingKey: "page_blog" },
  { href: "/photos", label: "Photos", icon: Camera, settingKey: "page_photos" },
  { href: "/calendar", label: "Calendar", icon: CalendarDays, settingKey: "page_calendar" },
  { href: "/contact", label: "Say Hi", icon: Mail, settingKey: "page_contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hiddenPages, setHiddenPages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    pb.collection("site_settings")
      .getFullList({ filter: 'key ~ "page_"' })
      .then((records) => {
        const hidden = new Set<string>();
        records.forEach((r) => {
          if (r.value === false) hidden.add(r.key as string);
        });
        setHiddenPages(hidden);
      })
      .catch(() => {});
  }, []);

  const links = allLinks.filter((l) => !hiddenPages.has(l.settingKey));

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors">
          Weldon Makori
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative inline-flex items-center gap-1.5 text-[13px] tracking-wide uppercase transition-colors duration-300 ${
                  active ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                <Icon size={13} strokeWidth={1.5} className="opacity-60" />
                {link.label}
                {active && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center"
          aria-label="Menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white/70"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-px bg-white/70"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-px bg-white/70"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 bg-[#050505]/98 backdrop-blur-2xl"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`inline-flex items-center gap-3 text-2xl font-light tracking-wide transition-colors ${
                      pathname === link.href ? "text-white" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} className="opacity-50" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
