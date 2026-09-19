"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { site } from "@/data/site";

const socials = site.socials;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = form.subject || `Message from ${form.name} — weldon.lol`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
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
            className="mt-6 text-base md:text-lg text-white/40 max-w-xl leading-relaxed"
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
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400/60 mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-light text-white/90 mb-3">Email draft opened</h3>
                <p className="text-sm text-white/30 mb-8">
                  Send it from your email app and I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-white/30 mb-3">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-white/80 text-sm placeholder:text-white/20 focus:border-white/30 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="group flex items-center gap-3 text-sm tracking-wide uppercase text-white/70 hover:text-white transition-colors duration-300"
                >
                  <span>Send message</span>
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
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                Email
              </p>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                Location
              </p>
              <p className="text-sm text-white/50">{site.location}</p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
                Social
              </p>
              <div className="flex flex-col gap-3">
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
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-4">
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
