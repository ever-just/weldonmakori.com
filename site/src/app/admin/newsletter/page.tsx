"use client";

import { Newspaper, ExternalLink, Users, Send, List } from "lucide-react";

const LISTMONK_URL = "http://142.93.78.220:8082";

export default function AdminNewsletter() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Email</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Newsletter</h1>
        </div>
        <a
          href={LISTMONK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
        >
          <ExternalLink size={12} />
          Open Listmonk
        </a>
      </div>

      <div className="space-y-6">
        {/* Info */}
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <Newspaper size={16} className="text-white/30 mt-0.5" />
            <div>
              <p className="text-sm text-white/60 mb-1">Listmonk</p>
              <p className="text-xs text-white/25 leading-relaxed">
                Self-hosted newsletter and mailing list manager. Manage subscribers, create campaigns,
                and send email updates. SMTP needs to be configured before emails can be sent.
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Dashboard */}
        <div className="rounded-sm border border-white/[0.06] overflow-hidden bg-white">
          <iframe
            src={LISTMONK_URL}
            className="w-full border-0"
            style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}
            title="Listmonk Newsletter"
          />
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <a
            href={`${LISTMONK_URL}/subscribers`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <Users size={14} className="text-white/20 mb-2" />
            <p className="text-sm text-white/50 group-hover:text-white/70">Subscribers</p>
            <p className="text-[10px] text-white/20 mt-1">View & manage subscribers</p>
          </a>
          <a
            href={`${LISTMONK_URL}/lists`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <List size={14} className="text-white/20 mb-2" />
            <p className="text-sm text-white/50 group-hover:text-white/70">Lists</p>
            <p className="text-[10px] text-white/20 mt-1">Manage mailing lists</p>
          </a>
          <a
            href={`${LISTMONK_URL}/campaigns`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <Send size={14} className="text-white/20 mb-2" />
            <p className="text-sm text-white/50 group-hover:text-white/70">Campaigns</p>
            <p className="text-[10px] text-white/20 mt-1">Create & send campaigns</p>
          </a>
          <a
            href={`${LISTMONK_URL}/settings`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
          >
            <Newspaper size={14} className="text-white/20 mb-2" />
            <p className="text-sm text-white/50 group-hover:text-white/70">Settings</p>
            <p className="text-[10px] text-white/20 mt-1">SMTP, templates & more</p>
          </a>
        </div>
      </div>
    </div>
  );
}
