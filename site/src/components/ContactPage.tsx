"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import pb from "@/lib/pocketbase";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/weldonmakori/" },
  { label: "GitHub", href: "https://github.com/ever-just" },
  { label: "X", href: "https://x.com/makori_weldon" },
  { label: "Instagram", href: "https://www.instagram.com/actuallyweldon/" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await pb.collection("contact_submissions").create({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        status: "new",
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white/90 leading-[1.1]"
          >
            Let&apos;s connect
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/30 max-w-xl leading-relaxed"
          >
            Have a question, a project idea, or just want to say hello? I&apos;d love to hear from you.
          </motion.p>
        </div>
        <div className="hr-fade" />
      </section>

      {/* Contact Form + Info */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400/60 mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-light text-white/90 mb-3">Message sent</h3>
                <p className="text-sm text-white/30 mb-8">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-3">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400/70 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Something went wrong. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex items-center gap-3 text-sm tracking-wide uppercase text-white/70 hover:text-white transition-colors duration-300 disabled:opacity-40"
                >
                  <span>{status === "sending" ? "Sending..." : "Send message"}</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Email
              </p>
              <a
                href="mailto:weldonmakori@outlook.com"
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                weldonmakori@outlook.com
              </a>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Location
              </p>
              <p className="text-sm text-white/50">Minneapolis, MN</p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Social
              </p>
              <div className="flex flex-col gap-3">
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
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Response Time
              </p>
              <p className="text-sm text-white/50">Usually within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
