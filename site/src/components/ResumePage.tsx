"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const jobs = [
  {
    company: "Everjust",
    url: "https://everjust.co",
    role: "Founder",
    period: "Jan 2025 – Present",
    logo: "/logos/everjust.svg",
    highlights: [
      "Building a technology and insurance optimization platform",
    ],
  },
  {
    company: "Custom AI Studio",
    url: "https://customaistudio.io",
    role: "Founding Member / COO",
    period: "Aug 2024 – Dec 2024",
    logo: "/logos/custom-ai-studio.png",
    highlights: [
      "Grew the team from founding stage to a full organization",
      "Scaled monthly revenue by orders of magnitude",
      "Implemented AI agents driving exponential efficiency gains",
      "Managed HR operations: payroll, benefits, recruiting, compliance",
    ],
  },
  {
    company: "Marsh McLennan Agency",
    url: "https://marshmma.com",
    role: "Business Insurance Intern",
    period: "May 2024 – Aug 2024",
    logo: "/logos/marsh-mclennan.png",
    highlights: [
      "Assisted sales operations at the #1 business insurance brokerage globally",
      "Created local market intelligence report and conversion optimization strategies",
    ],
  },
  {
    company: "CapREIT",
    role: "Agent / Property Manager",
    period: "Jul 2022 – Jul 2023",
    logo: "/logos/capreit.png",
    highlights: [
      "Led lease-up of new development to strong occupancy",
      "Combined leasing with property management duties",
    ],
  },
  {
    company: "Renewal by Andersen",
    url: "https://renewalbyandersen.com",
    role: "Inside Sales Professional",
    period: "Feb 2021 – Jul 2022",
    logo: "/logos/renewal-by-andersen.png",
    highlights: [
      "Exceeded lead generation targets across multiple marketing channels",
    ],
  },
  {
    company: "Sleep Number",
    url: "https://sleepnumber.com",
    role: "Marketing Professional",
    period: "Nov 2019 – Aug 2020",
    logo: "/logos/sleep-number.png",
    highlights: [
      "Became the top revenue producer for the entire sales organization",
      "Consistently led the team in monthly revenue produced",
    ],
  },
  {
    company: "Tesla",
    url: "https://tesla.com",
    role: "Sales Advisor",
    period: "Dec 2017 – Aug 2019",
    logo: "/logos/tesla.svg",
    highlights: [
      "Top-performing advisor across multi-state Midwest territory",
      "Part of Model 3 ramp-up team; helped train incoming employees",
    ],
  },
  {
    company: "WellDone Windows",
    role: "Co-Owner",
    period: "Apr 2016 – Aug 2019",
    logo: "/logos/welldone-windows.svg",
    highlights: [
      "Built a loyal customer subscription base",
      "Preferred vendor for Lifetime Fitness",
    ],
  },
  {
    company: "TC Running Company",
    role: "Sales Associate",
    period: "Aug 2015 – Jul 2017",
    logo: "/logos/tc-running.png",
    highlights: [],
  },
];

const skills = {
  "Sales & Business": ["Enterprise Sales", "Revenue Growth", "Team Leadership", "HR Operations", "Recruiting", "Business Development", "Marketing"],
  "Technical": ["AI Agents", "Next.js / React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Python"],
  "Legal": ["Business Law", "Employment Law", "Health Care Law", "Fair Housing", "Regulatory Compliance"],
  "Tools": ["Salesforce", "ADP", "Yardi", "Netlify", "DigitalOcean", "AWS"],
};

export default function ResumePage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">Resume</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-white">
            Professional
            <br />
            <span className="text-white/20">Experience</span>
          </h1>
          <p className="mt-8 text-white/50 max-w-lg leading-relaxed">
            A decade of sales leadership, entrepreneurship, and building businesses —
            from early management roles to founding my own company.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2 text-sm text-white border-b border-white/20 pb-1 hover:border-white/60 transition-colors"
            >
              Get in touch
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.linkedin.com/in/weldonmakori/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-white/50 border-b border-white/10 pb-1 hover:border-white/30 hover:text-white/80 transition-colors"
            >
              LinkedIn
              <ArrowUpRight size={14} className="opacity-30 group-hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* Experience */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-16">Experience</p>

        <div className="space-y-0">
          {jobs.map((job, i) => (
            <motion.div
              key={`${job.company}-${job.period}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="group py-8 border-b border-white/[0.04] hover:border-white/[0.08] transition-colors"
            >
              <div className="grid md:grid-cols-[auto_1fr_2fr] gap-4 md:gap-8 items-start">
                {/* Logo */}
                <div className="hidden md:flex w-12 h-12 rounded-lg bg-white/[0.03] items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-base md:text-lg">
                      {job.company}
                    </h3>
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/20 hover:text-white/50 transition-colors"
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-white/40 mt-1">{job.role}</p>
                  <p className="text-xs text-white/20 font-mono mt-1">{job.period}</p>
                </div>

                {job.highlights.length > 0 && (
                  <div className="space-y-2 md:pt-1">
                    {job.highlights.map((h, j) => (
                      <p key={j} className="text-sm text-white/50 leading-relaxed">
                        {h}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="hr-fade" />

      {/* Skills */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-16">Skills</p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="text-sm font-medium text-white/60 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {items.map((item) => (
                  <span key={item} className="text-sm text-white/30 hover:text-white/60 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="hr-fade" />

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Interested?
          </h2>
          <div className="mt-8 flex flex-wrap gap-6">
            <a
              href="mailto:weldonmakori@outlook.com"
              className="group inline-flex items-center gap-2 text-sm text-white border-b border-white/20 pb-1 hover:border-white/60 transition-colors"
            >
              weldonmakori@outlook.com
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.linkedin.com/in/weldonmakori/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-white/50 border-b border-white/10 pb-1 hover:border-white/30 hover:text-white/80 transition-colors"
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
