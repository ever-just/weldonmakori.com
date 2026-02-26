"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

/* ─── Types ─── */
interface Course { code: string; name: string; credits: number; }
interface Term { term: string; status?: string; courses: Course[]; }
interface Institution {
  name: string;
  location: string;
  degree: string;
  major?: string;
  minor?: string;
  college?: string;
  period: string;
  terms: Term[];
}

/* ─── Degree Data ─── */
const degrees: Institution[] = [
  {
    name: "University of St. Thomas",
    location: "St. Paul, MN",
    degree: "BS Business Administration",
    major: "Law & Compliance",
    minor: "Actuarial Science",
    college: "Opus College of Business",
    period: "Fall 2017 – Spring 2026",
    terms: [
      { term: "Spring 2026", status: "In Progress", courses: [
        { code: "ACSC 264", name: "Theory of Interest", credits: 4 },
        { code: "BLAW 311", name: "Advanced Business Law for Accounting", credits: 2 },
        { code: "BLAW 401", name: "Law & Compliance: Skills & Strategy", credits: 4 },
        { code: "ECON 251", name: "Principles of Macroeconomics", credits: 4 },
        { code: "FINC 310", name: "Core Financial Management", credits: 2 },
        { code: "THEO 300", name: "SW: Faith & Law", credits: 4 },
      ]},
      { term: "Fall 2025", courses: [
        { code: "BLAW 314", name: "Employment Law", credits: 2 },
        { code: "BLAW 323", name: "Health Care Law & Ethics", credits: 4 },
        { code: "BUSN 202", name: "MS Excel Business Applications", credits: 0 },
        { code: "DASC 120", name: "Introduction to Computational Statistics", credits: 4 },
        { code: "ENTR 100", name: "Entrepreneurship & Innovation", credits: 2 },
      ]},
      { term: "Spring 2025", courses: [
        { code: "BETH 320", name: "The Role of Business in Society", credits: 4 },
        { code: "BLAW 321", name: "Law for Entrepreneurs and Innovators", credits: 4 },
        { code: "MGMT 200", name: "Working Skillfully in Organizations", credits: 2 },
      ]},
      { term: "Fall 2024", courses: [
        { code: "ACCT 200", name: "Principles of Accounting II", credits: 2 },
        { code: "BETH 300", name: "Ethical Principles in Business", credits: 2 },
        { code: "BLAW 300", name: "Law for Business Leaders I", credits: 2 },
        { code: "OPMT 200", name: "Operations & Supply Chain Management", credits: 2 },
      ]},
      { term: "Spring 2024", courses: [
        { code: "ACCT 100", name: "Principles of Accounting I", credits: 4 },
        { code: "ACSC 220", name: "Risk Management & Insurance", credits: 4 },
        { code: "BUSN 100", name: "Business for the Common Good", credits: 2 },
        { code: "COMM 105", name: "Communication in the ACSC Workplace", credits: 4 },
        { code: "MKTG 200", name: "Introduction to Marketing", credits: 2 },
        { code: "MUSC 230", name: "Music of the United States", credits: 4 },
      ]},
      { term: "Fall 2018", courses: [
        { code: "MATH 114", name: "Calculus II", credits: 4 },
        { code: "PHIL 214", name: "Introductory Ethics", credits: 4 },
        { code: "THEO 200", name: "Christian Belief: Ancient/Contemporary", credits: 4 },
      ]},
      { term: "Fall 2017", courses: [
        { code: "CISC 130", name: "Introduction to Programming & Problem Solving", credits: 4 },
        { code: "ENGR 150", name: "Introduction to Engineering", credits: 1 },
        { code: "MATH 113", name: "Calculus I", credits: 4 },
        { code: "PHIL 115", name: "Philosophy of Human Person", credits: 4 },
        { code: "THEO 101", name: "Christian Theological Tradition", credits: 4 },
      ]},
    ],
  },
];

/* ─── Transfer Credits (pre-UST coursework) ─── */
const transferTerms: Term[] = [
  { term: "Spring 2017", courses: [
    { code: "ARTS 199", name: "Studio Art Elective", credits: 3 },
    { code: "ENGL 215", name: "American Authors II", credits: 4 },
    { code: "HLTH 275", name: "Lifelong Stress Management", credits: 3 },
    { code: "PHED 100", name: "Foundations for Fitness", credits: 2 },
  ]},
  { term: "Fall 2016", courses: [
    { code: "COJO 230", name: "Foundations in Media & Society", credits: 3 },
    { code: "ENGL 206", name: "Texts in Conversation", credits: 3 },
    { code: "HIST 114", name: "Modern US/Global Perspective", credits: 4 },
    { code: "POLS 101", name: "American Government & Politics", credits: 3 },
  ]},
  { term: "Summer 2016", courses: [
    { code: "BIOL 208", name: "Biological Communication & Energetics", credits: 4 },
    { code: "ECON 252", name: "Principles of Microeconomics", credits: 3 },
  ]},
  { term: "Spring 2016", courses: [
    { code: "CHEM 112", name: "General Chemistry II", credits: 5 },
    { code: "COJO 220", name: "Interpersonal Communication", credits: 3 },
    { code: "MATH 105", name: "Precalculus", credits: 5 },
    { code: "SPAN 212", name: "Intermediate Spanish II", credits: 5 },
  ]},
  { term: "Fall 2015", courses: [
    { code: "CHEM 111", name: "General Chemistry I", credits: 5 },
    { code: "ENGL 121", name: "Critical Thinking: Literature/Writing", credits: 4 },
    { code: "MATH 199", name: "Mathematics Elective", credits: 4 },
    { code: "SPAN 211", name: "Intermediate Spanish I", credits: 5 },
  ]},
];

/* ─── Licenses & Certifications ─── */
const licenses = [
  {
    title: "Minnesota Real Estate Salesperson License",
    issuer: "Minnesota Department of Commerce",
    school: "Minnesota Realty School",
    year: "2024",
    status: "Active",
  },
];

/* ─── Software & Tools ─── */
const toolCategories: { category: string; tools: string[] }[] = [
  {
    category: "AI & Machine Learning",
    tools: ["ChatGPT / OpenAI", "Palantir AIP", "Devin.ai", "Google Colab", "Anthropic Claude"],
  },
  {
    category: "Software Development",
    tools: ["Xcode", "Windsurf", "Cursor", "VS Code", "GitHub", "Git", "Terminal / CLI", "Node.js", "npm"],
  },
  {
    category: "Cloud & Infrastructure",
    tools: ["AWS", "DigitalOcean", "Vercel", "Netlify", "Supabase", "Firebase", "Docker"],
  },
  {
    category: "CRM & Sales",
    tools: ["Salesforce", "HubSpot", "ADP Workforce", "Yardi", "RentCafe", "Knock"],
  },
  {
    category: "Microsoft",
    tools: ["Excel", "Word", "PowerPoint", "Outlook", "Teams", "OneDrive", "Azure"],
  },
  {
    category: "Google Cloud & Workspace",
    tools: ["Google Sheets", "Google Docs", "Google Drive", "Google Analytics", "Google Cloud Platform", "BigQuery"],
  },
  {
    category: "Design & Collaboration",
    tools: ["Figma", "Notion", "Slack", "Linear", "Loom", "Canva"],
  },
  {
    category: "Databases & Backend",
    tools: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "REST APIs", "GraphQL"],
  },
];

/* ─── Components ─── */
function TermRow({ term, defaultOpen }: { term: Term; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const cr = term.courses.reduce((s, c) => s + c.credits, 0);

  return (
    <div className="border-b border-white/[0.04]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">
            {term.term}
          </span>
          {term.status && (
            <span className="text-[10px] tracking-wide uppercase text-white/30 border border-white/10 px-2 py-0.5 rounded-full">
              {term.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/20">{term.courses.length} courses &middot; {cr} cr</span>
          <ChevronDown
            size={14}
            className={`text-white/20 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-0">
              {term.courses.map((c) => (
                <div
                  key={c.code}
                  className="grid grid-cols-[60px_1fr_36px] sm:grid-cols-[70px_1fr_40px] md:grid-cols-[90px_1fr_60px] gap-2 sm:gap-3 py-2 items-baseline"
                >
                  <span className="text-[11px] sm:text-xs font-mono text-white/25 truncate">{c.code}</span>
                  <span className="text-sm text-white/50">{c.name}</span>
                  {c.credits > 0 && (
                    <span className="text-xs text-white/15 text-right">{c.credits} cr</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─── */
export default function EducationPage() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-36 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">Education</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-white">
            Education &
            <br />
            <span className="text-white/20">Credentials</span>
          </h1>
          <p className="mt-8 text-white/50 max-w-lg leading-relaxed">
            Degrees, licenses, 50+ courses, and the software toolkit I use to build,
            sell, and scale.
          </p>

          <div className="mt-10 sm:mt-12 flex gap-8 sm:gap-10 md:gap-16">
            {[
              { value: "50+", label: "Courses" },
              { value: "189", label: "Credits" },
              { value: "2026", label: "Graduating" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-white/25 mt-1 tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Section 1: Degrees ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-16">Degrees</p>

          {degrees.map((inst, instIdx) => (
            <div key={inst.name} className={instIdx > 0 ? "mt-20" : ""}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                    {inst.name}
                  </h2>
                  <p className="text-sm text-white/30 mt-2">{inst.location} &middot; {inst.period}</p>
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    <span className="text-sm text-white/50">{inst.degree}</span>
                    {inst.major && <span className="text-sm text-white/30">Major: {inst.major}</span>}
                    {inst.minor && <span className="text-sm text-white/30">Minor: {inst.minor}</span>}
                    {inst.college && <span className="text-sm text-white/20">{inst.college}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Section 2: Licenses & Certifications ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-16">Licenses & Certifications</p>

          {licenses.map((lic) => (
            <div key={lic.title} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-6 border-b border-white/[0.04]">
              <div>
                <p className="text-xs text-white/20 font-mono">{lic.year}</p>
              </div>
              <div>
                <h3 className="text-white font-medium text-base md:text-lg">{lic.title}</h3>
                <p className="text-sm text-white/40 mt-1">{lic.school}</p>
                <p className="text-sm text-white/30 mt-0.5">{lic.issuer}</p>
                <span className="inline-block mt-3 text-[10px] tracking-wide uppercase text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                  {lic.status}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Section 3: Coursework ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-4">Coursework</p>
          <p className="text-sm text-white/30 mb-16 max-w-md">
            Complete coursework organized by term.
          </p>
        </motion.div>

        {degrees.map((inst) => (
          <motion.div
            key={inst.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">
              {inst.name}
            </h3>
            <p className="text-xs text-white/20 mb-8">{inst.period}</p>

            <div>
              {inst.terms.map((term, i) => (
                <TermRow key={term.term} term={term} defaultOpen={i < 2} />
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-white mb-2">
            Transfer Credits
          </h3>
          <p className="text-xs text-white/20 mb-8">Fall 2015 – Spring 2017</p>

          <div>
            {transferTerms.map((term) => (
              <TermRow key={term.term} term={term} defaultOpen={false} />
            ))}
          </div>
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Section 4: Areas of Study ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-12">Areas of Study</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-12 gap-y-5 sm:gap-y-6">
            {[
              { area: "Business Law & Compliance", count: 8 },
              { area: "Business & Management", count: 10 },
              { area: "Mathematics & Statistics", count: 6 },
              { area: "Actuarial Science", count: 3 },
              { area: "Theology & Philosophy", count: 5 },
              { area: "Sciences", count: 4 },
              { area: "Communications & English", count: 6 },
              { area: "Languages & Arts", count: 4 },
            ].map((item) => (
              <div key={item.area}>
                <p className="text-sm text-white/60">{item.area}</p>
                <p className="text-xs text-white/20 mt-1">{item.count} courses</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="hr-fade" />

      {/* ── Section 5: Software & Tools ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-4">Software & Tools</p>
          <p className="text-sm text-white/30 mb-16 max-w-md">
            The platforms and tools I work with daily across development, cloud, sales, and operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {toolCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <h3 className="text-sm font-medium text-white/60 mb-4">{cat.category}</h3>
              <div className="flex flex-wrap gap-x-1 gap-y-2">
                {cat.tools.map((tool, j) => (
                  <span key={tool} className="text-sm text-white/35 hover:text-white/60 transition-colors">
                    {tool}{j < cat.tools.length - 1 && <span className="text-white/10 mx-2">/</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
