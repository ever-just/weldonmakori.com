"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const timeline = [
  { year: "2016", role: "Co-Owner", place: "WellDone Windows", logo: "/logos/welldone-windows.svg", note: "Built a loyal subscription base" },
  { year: "2017", role: "Sales Advisor", place: "Tesla", logo: "/logos/tesla.svg", note: "Model 3 ramp-up across multiple states" },
  { year: "2019", role: "Top Revenue Producer", place: "Sleep Number", logo: "/logos/sleep-number.png", note: "Led the org in monthly revenue" },
  { year: "2021", role: "Inside Sales", place: "Renewal by Andersen", logo: "/logos/renewal-by-andersen.svg", note: "Multi-channel growth" },
  { year: "2022", role: "Agent / Property Manager", place: "CapREIT", logo: "/logos/capreit.png", note: "Led new development lease-up" },
  { year: "2024", role: "COO", place: "Custom AI Studio", logo: "/logos/custom-ai-studio.png", note: "Scaled team and revenue rapidly" },
];

const ventures = [
  { name: "Custom AI Studio", desc: "AI consulting — fast-growing team" },
  { name: "Everjust", desc: "Technology & insurance optimization" },
  { name: "Custom Agents", desc: "AI agents for iMessage, email, phone" },
  { name: "Gasolina.ai", desc: "Talent management for creators" },
  { name: "Minnesota.CEO", desc: "Celebrating MN business leaders" },
  { name: "SMS", desc: "Airbnb for community gatherings" },
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/" },
  { label: "GitHub", href: "https://github.com/ever-just" },
  { label: "X", href: "https://x.com/makori_weldon" },
  { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/" },
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
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-6 md:px-10 w-full"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white/40 text-sm md:text-base tracking-wide mb-6 md:mb-8"
          >
            Builder &middot; Entrepreneur &middot; Minneapolis
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter"
          >
            <span className="text-white">Weldon</span>
            <br />
            <span className="text-white/20">Makori</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 md:mt-12 text-white/50 text-base md:text-lg max-w-lg leading-relaxed"
          >
            Finishing my degree at St.&nbsp;Thomas while scaling AI-powered
            businesses. A decade of turning ideas into revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 md:mt-14 flex flex-wrap gap-4"
          >
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 text-sm text-white border-b border-white/20 pb-1 hover:border-white/60 transition-colors"
            >
              View Resume
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
            <Link
              href="/education"
              className="group inline-flex items-center gap-2 text-sm text-white/50 border-b border-white/10 pb-1 hover:border-white/30 hover:text-white/80 transition-colors"
            >
              Education
              <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-70 transition-all" />
            </Link>
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2 text-sm text-white/50 border-b border-white/10 pb-1 hover:border-white/30 hover:text-white/80 transition-colors"
            >
              Get in Touch
              <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-70 transition-all" />
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

      {/* ── About split ── */}
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
              I build things that
              <br />
              <span className="text-white/25">create real value.</span>
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
              I&apos;ve spent the last decade at the intersection of sales, technology,
              and entrepreneurship — from leading teams as a teenager to scaling
              an AI startup. I study business administration and
              law at the University of St.&nbsp;Thomas, and I&apos;m always building
              something new.
            </p>
            <div className="mt-10 flex gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
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

        <div className="space-y-0">
          {timeline.map((item, i) => (
            <motion.div
              key={`${item.year}-${item.place}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-[60px_1fr] md:grid-cols-[100px_48px_200px_1fr_1fr] gap-4 md:gap-8 items-center py-6 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors"
            >
              <span className="text-white/20 text-sm font-mono">{item.year}</span>
              {/* Logo */}
              <div className="hidden md:flex w-10 h-10 rounded-lg bg-white/[0.03] items-center justify-center shrink-0 overflow-hidden">
                <Image
                  src={item.logo}
                  alt={`${item.place} logo`}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-white/60 text-sm font-medium hidden md:block">{item.role}</span>
              <span className="text-white group-hover:text-white/80 text-sm md:text-base transition-colors">
                <span className="md:hidden text-white/60 mr-2">{item.role} —</span>
                {item.place}
              </span>
              <span className="text-white/30 text-sm hidden md:block text-right">{item.note}</span>
            </motion.div>
          ))}
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
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6"
            >
              Ventures
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white"
            >
              Always
              <br />
              <span className="text-white/25">building.</span>
            </motion.h2>
          </div>

          <div className="space-y-0">
            {ventures.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group py-5 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-white text-sm md:text-base font-medium group-hover:text-white/80 transition-colors">
                    {v.name}
                  </h3>
                  <span className="text-white/20 text-xs md:text-sm shrink-0">{v.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="hr-fade" />

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.95] tracking-tighter text-white">
            Let&apos;s work
            <br />
            <span className="text-white/20">together.</span>
          </h2>

          <div className="mt-12 md:mt-16 flex flex-wrap gap-6 md:gap-10">
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2 text-sm md:text-base text-white border-b border-white/20 pb-1 hover:border-white/60 transition-colors"
            >
              weldonmakori@outlook.com
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.linkedin.com/in/weldonmakori/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm md:text-base text-white/50 border-b border-white/10 pb-1 hover:border-white/30 hover:text-white/80 transition-colors"
            >
              LinkedIn
              <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
