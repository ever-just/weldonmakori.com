"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  FileText,
  GraduationCap,
  Mail,
  Building2,
  TrendingUp,
  Award,
  Car,
  BedDouble,
  Home,
  Bot,
  Shield,
  Smartphone,
  Music,
  Crown,
  CalendarDays,
  Linkedin,
  Github,
  Instagram,
  Sparkles,
} from "lucide-react";

const timeline = [
  { year: "2016", role: "Co-Owner", place: "WellDone Windows", logo: "/logos/welldone-windows.svg", note: "Built a loyal subscription base", icon: Home },
  { year: "2017", role: "Sales Advisor", place: "Tesla", logo: "/logos/tesla.svg", note: "Model 3 ramp-up across multiple states", icon: Car },
  { year: "2019", role: "Top Revenue Producer", place: "Sleep Number", logo: "/logos/sleep-number.png", note: "Led the org in monthly revenue", icon: BedDouble },
  { year: "2021", role: "Inside Sales", place: "Renewal by Andersen", logo: "/logos/renewal-by-andersen.png", note: "Multi-channel growth", icon: Home },
  { year: "2022", role: "Agent / Property Manager", place: "CapREIT", logo: "/logos/capreit.png", note: "Led new development lease-up", icon: Building2 },
  { year: "2024", role: "COO", place: "Custom AI Studio", logo: "/logos/custom-ai-studio.png", note: "Scaled team and revenue rapidly", icon: Bot },
  { year: "2025", role: "Founder", place: "Everjust", logo: "/logos/everjust.svg", note: "Technology & insurance optimization", icon: Shield },
];

const ventures = [
  { name: "Everjust", desc: "Technology & insurance optimization", icon: Shield, href: "https://everjust.co" },
  { name: "Custom AI Studio", desc: "AI consulting (prev. COO)", icon: Bot, href: "https://customaistudio.io" },
  { name: "Custom Agents", desc: "AI agents for iMessage, email, phone", icon: Smartphone, href: undefined },
  { name: "Gasolina.ai", desc: "Talent management for creators", icon: Music, href: undefined },
  { name: "Minnesota.CEO", desc: "Celebrating MN business leaders", icon: Crown, href: undefined },
  { name: "SMS", desc: "Airbnb for community gatherings", icon: CalendarDays, href: undefined },
];

const expertise = [
  "Sales & Revenue Growth",
  "Startup Operations",
  "AI & Automation",
  "Team Building",
  "Business Law",
  "Risk Management",
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/ever-just", icon: Github },
  { label: "X", href: "https://x.com/makori_weldon", icon: Sparkles },
  { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/", icon: Instagram },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97]);

  return (
    <>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Subtle dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative max-w-7xl mx-auto px-6 md:px-10 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/40 text-sm md:text-base tracking-wide mb-6 md:mb-8"
          >
            Founder &middot; Builder &middot; Minneapolis
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter"
          >
            <span className="text-white">Weldon</span>
            <br />
            <span className="gradient-text">Makori</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-12 text-white/50 text-base md:text-lg max-w-xl leading-relaxed"
          >
            Started my first business at 19 with a ladder and a squeegee.
            Now I&apos;m building <span className="text-white/70">Everjust</span> and
            studying business law and actuarial science at
            St.&nbsp;Thomas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 md:mt-14 flex flex-wrap gap-5"
          >
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2.5 text-sm text-white border border-white/15 rounded-full px-5 py-2.5 hover:bg-white/[0.05] hover:border-white/25 transition-all"
            >
              <FileText size={14} className="opacity-50 group-hover:opacity-80" />
              Resume
            </Link>
            <Link
              href="/education"
              className="group inline-flex items-center gap-2.5 text-sm text-white/60 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white/[0.03] hover:border-white/15 hover:text-white/80 transition-all"
            >
              <GraduationCap size={14} className="opacity-40 group-hover:opacity-70" />
              Education
            </Link>
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2.5 text-sm text-white/60 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white/[0.03] hover:border-white/15 hover:text-white/80 transition-all"
            >
              <Mail size={14} className="opacity-40 group-hover:opacity-70" />
              Contact
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-6 md:left-10"
        >
          <motion.p
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/20 [writing-mode:vertical-lr]"
          >
            Scroll
          </motion.p>
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <div className="overflow-hidden py-8 border-y border-white/[0.04]">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...expertise, ...expertise].map((item, i) => (
            <span key={i} className="mx-8 text-sm md:text-base text-white/15 font-medium tracking-wide uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="hr-fade" />

      {/* ── About ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">About</p>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
              I don&apos;t chase
              <br />
              <span className="text-white/25">opportunities —</span>
              <br />
              I build them.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-end"
          >
            <p className="text-white/50 leading-[1.8] text-base md:text-lg">
              At 19 I co-founded a window cleaning company and built a subscriber
              base that ran itself. By 22 I was selling Teslas across three states
              and became the #1 revenue producer at my next company. Then I helped
              scale an AI startup from zero to a full team as COO.
            </p>
            <p className="text-white/50 leading-[1.8] text-base md:text-lg mt-4">
              Now I&apos;m building <span className="text-white/70 font-medium">Everjust</span> — a
              technology and insurance optimization company — while studying
              business law and actuarial science at the University of
              St.&nbsp;Thomas. Risk management is what I find most interesting.
            </p>
            <div className="mt-10 flex gap-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-white/60 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="hr-fade" />

      {/* ── Timeline ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-16"
        >
          Career
        </motion.p>

        <div className="relative">
          {/* Vertical gradient accent line */}
          <div className="hidden md:block absolute left-[49px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />

          <div className="space-y-0">
            {timeline.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${item.year}-${item.place}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group grid grid-cols-[60px_1fr] md:grid-cols-[100px_48px_200px_1fr_1fr] gap-4 md:gap-8 items-center py-6 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors"
                >
                  <span className="text-white/20 text-sm font-mono">{item.year}</span>
                  <div className="hidden md:flex w-10 h-10 rounded-lg bg-white/[0.03] items-center justify-center shrink-0 overflow-hidden group-hover:bg-white/[0.06] transition-colors">
                    <Image
                      src={item.logo}
                      alt={`${item.place} logo`}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="text-white/60 text-sm font-medium hidden md:flex items-center gap-2">
                    <Icon size={13} className="text-white/20 shrink-0" />
                    {item.role}
                  </span>
                  <span className="text-white group-hover:text-white/80 text-sm md:text-base transition-colors">
                    <span className="md:hidden text-white/60 mr-2">{item.role} —</span>
                    {item.place}
                  </span>
                  <span className="text-white/30 text-sm hidden md:block text-right">{item.note}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="/resume"
            className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            Full resume
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Ventures ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">Ventures</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white">
            Always <span className="gradient-text">building.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {ventures.map((v, i) => {
            const Icon = v.icon;
            const Wrapper = v.href ? "a" : "div";
            const wrapperProps = v.href
              ? { href: v.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="glass-card p-6 md:p-8 block group cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                      <Icon size={18} className="text-white/30 group-hover:text-purple-400/70 transition-colors" />
                    </div>
                    {v.href && (
                      <ArrowUpRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors mt-1" />
                    )}
                  </div>
                  <h3 className="text-white text-base font-medium group-hover:text-white/90 transition-colors">
                    {v.name}
                  </h3>
                  <p className="text-white/30 text-sm mt-1.5 leading-relaxed">{v.desc}</p>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </section>

      <div className="hr-fade" />

      {/* ── CTA ── */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tighter">
            <span className="text-white">Let&apos;s work</span>
            <br />
            <span className="gradient-text">together.</span>
          </h2>

          <p className="mt-6 text-white/40 text-base md:text-lg max-w-md">
            Open to partnerships, consulting, and interesting conversations.
          </p>

          <div className="mt-10 md:mt-14 flex flex-wrap gap-4">
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2.5 text-sm text-white border border-white/15 rounded-full px-6 py-3 hover:bg-white/[0.05] hover:border-white/25 transition-all"
            >
              <Mail size={15} className="opacity-50 group-hover:opacity-80" />
              weldonmakori@outlook.com
            </a>
            <a
              href="https://www.linkedin.com/in/weldonmakori/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-sm text-white/60 border border-white/10 rounded-full px-6 py-3 hover:bg-white/[0.03] hover:border-white/15 hover:text-white/80 transition-all"
            >
              <Linkedin size={15} className="opacity-40 group-hover:opacity-70" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
