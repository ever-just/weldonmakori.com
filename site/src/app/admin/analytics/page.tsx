"use client";

import { BarChart3, ExternalLink } from "lucide-react";

const GOATCOUNTER_URL = "http://142.93.78.220:8081";

export default function AdminAnalytics() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Insights</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Analytics</h1>
        </div>
        <a
          href={GOATCOUNTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
        >
          <ExternalLink size={12} />
          Open Full Dashboard
        </a>
      </div>

      <div className="space-y-6">
        {/* Info */}
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <BarChart3 size={16} className="text-white/30 mt-0.5" />
            <div>
              <p className="text-sm text-white/60 mb-1">GoatCounter</p>
              <p className="text-xs text-white/25 leading-relaxed">
                Privacy-friendly analytics — no cookies, no tracking scripts that slow down your site.
                Page views, referrers, browsers, and screen sizes are tracked automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Dashboard */}
        <div className="rounded-sm border border-white/[0.06] overflow-hidden bg-white">
          <iframe
            src={GOATCOUNTER_URL}
            className="w-full border-0"
            style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}
            title="GoatCounter Analytics"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`${GOATCOUNTER_URL}/settings/main`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <p className="text-sm text-white/50 group-hover:text-white/70">Settings</p>
            <p className="text-[10px] text-white/20 mt-1">Configure tracking preferences</p>
          </a>
          <a
            href={`${GOATCOUNTER_URL}/settings/sites`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <p className="text-sm text-white/50 group-hover:text-white/70">Sites</p>
            <p className="text-[10px] text-white/20 mt-1">Manage tracked domains</p>
          </a>
          <a
            href={`${GOATCOUNTER_URL}/settings/purge`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <p className="text-sm text-white/50 group-hover:text-white/70">Data</p>
            <p className="text-[10px] text-white/20 mt-1">Export or purge analytics data</p>
          </a>
        </div>
      </div>
    </div>
  );
}
