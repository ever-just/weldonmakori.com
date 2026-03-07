"use client";

import { useState } from "react";
import { BarChart3, ChevronDown, ChevronUp, ExternalLink, Key, LogIn } from "lucide-react";

const GOATCOUNTER_URL = "/stats";
const GC_EMAIL = "weldonmakori@outlook.com";
const GC_PASSWORD = "NewAdmin2026!";

export default function AdminAnalytics() {
  const [showCreds, setShowCreds] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Insights</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreds(!showCreds)}
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
          >
            <Key size={12} />
            Credentials
            {showCreds ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <a
            href={GOATCOUNTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
          >
            <ExternalLink size={12} />
            Open in New Tab
          </a>
        </div>
      </div>

      {/* Credentials dropdown */}
      {showCreds && (
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] mb-4 flex-shrink-0">
          <div className="flex items-start gap-3">
            <LogIn size={14} className="text-white/30 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-white/40 mb-3">
                GoatCounter has its own login. If the dashboard below asks you to sign in, use these credentials:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/15 mb-1">Email</p>
                  <p className="text-sm font-mono text-white/50">{GC_EMAIL}</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/15 mb-1">Password</p>
                  <p className="text-sm font-mono text-white/50">{GC_PASSWORD}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info bar */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/[0.06] bg-white/[0.02] mb-4 flex-shrink-0">
        <BarChart3 size={13} className="text-white/25" />
        <p className="text-[11px] text-white/25">
          Privacy-friendly analytics — no cookies, no personal data. Page views, referrers, browsers tracked automatically.
        </p>
      </div>

      {/* Embedded GoatCounter Dashboard */}
      <div className="flex-1 rounded-sm border border-white/[0.06] overflow-hidden min-h-[500px]">
        <iframe
          src={GOATCOUNTER_URL}
          className="w-full h-full border-0"
          title="GoatCounter Analytics Dashboard"
          style={{ minHeight: "500px", background: "#fff" }}
        />
      </div>
    </div>
  );
}
