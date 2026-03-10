"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart3,
  ExternalLink,
  Eye,
  Globe,
  Monitor,
  RefreshCw,
  TrendingUp,
  FileText,
  MapPin,
  Loader2,
  AlertTriangle,
} from "lucide-react";

const API_BASE = "/gc-api/api/stats";
const GOATCOUNTER_URL = "/stats";

interface Summary {
  total_views: number;
  total_pages: number;
  today_views: number;
  week_views: number;
  month_views: number;
}

interface PageStat {
  path: string;
  views: number;
}

interface DailyStat {
  day: string;
  views: number;
}

interface NamedStat {
  name: string;
  hits: number;
}

interface RefStat {
  ref: string;
  hits: number;
}

interface LocationStat {
  code: string;
  name: string;
  hits: number;
}

async function fetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number | string; icon: React.ElementType }) {
  return (
    <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={13} className="text-white/20" />
        <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">{label}</p>
      </div>
      <p className="text-2xl font-extralight text-white/70">{value}</p>
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <p className="text-xs text-white/40 truncate w-40 flex-shrink-0" title={label}>
        {label || "(direct)"}
      </p>
      <div className="flex-1 h-5 bg-white/[0.03] rounded-sm overflow-hidden">
        <div
          className="h-full bg-white/[0.08] rounded-sm transition-all"
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
      <p className="text-xs text-white/30 w-10 text-right flex-shrink-0">{value}</p>
    </div>
  );
}

function MiniChart({ data }: { data: DailyStat[] }) {
  if (!data.length) return null;
  const maxViews = Math.max(...data.map((d) => d.views), 1);
  return (
    <div className="flex items-end gap-[2px] h-24">
      {data.map((d) => (
        <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full group relative">
          <div
            className="w-full bg-white/[0.12] hover:bg-white/[0.25] rounded-t-sm transition-all min-h-[2px]"
            style={{ height: `${Math.max((d.views / maxViews) * 100, 3)}%` }}
          />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white/70 text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
            {d.day}: {d.views}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [pages, setPages] = useState<PageStat[]>([]);
  const [daily, setDaily] = useState<DailyStat[]>([]);
  const [refs, setRefs] = useState<RefStat[]>([]);
  const [browsers, setBrowsers] = useState<NamedStat[]>([]);
  const [systems, setSystems] = useState<NamedStat[]>([]);
  const [locations, setLocations] = useState<LocationStat[]>([]);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(false);
    const [s, p, d, r, b, sys, loc] = await Promise.all([
      fetchJSON<Summary>(`${API_BASE}/summary`),
      fetchJSON<PageStat[]>(`${API_BASE}/pages`),
      fetchJSON<DailyStat[]>(`${API_BASE}/daily`),
      fetchJSON<RefStat[]>(`${API_BASE}/refs`),
      fetchJSON<NamedStat[]>(`${API_BASE}/browsers`),
      fetchJSON<NamedStat[]>(`${API_BASE}/systems`),
      fetchJSON<LocationStat[]>(`${API_BASE}/locations`),
    ]);
    // If all requests failed, show error state
    if (!s && !p && !d && !r && !b && !sys && !loc) {
      setError(true);
    } else {
      if (s) setSummary(s);
      if (p) setPages(p);
      if (d) setDaily(d);
      if (r) setRefs(r);
      if (b) setBrowsers(b);
      if (sys) setSystems(sys);
      if (loc) setLocations(loc);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Insights</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Analytics</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadAll}
            disabled={loading}
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all disabled:opacity-30"
          >
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <a
            href={GOATCOUNTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
          >
            <ExternalLink size={12} />
            GoatCounter
          </a>
        </div>
      </div>

      {loading && !summary ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={20} className="animate-spin text-white/20" />
        </div>
      ) : error && !summary ? (
        <div className="space-y-6">
          {/* Error Banner */}
          <div className="p-5 rounded-sm border border-amber-500/20 bg-amber-500/[0.04]">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-400/60 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-white/60 mb-1">Unable to load analytics data</p>
                <p className="text-xs text-white/30 leading-relaxed">
                  The analytics API service could not be reached. This usually means the GoatCounter
                  stats API on your server needs to be running. You can still view analytics directly
                  in the GoatCounter dashboard below.
                </p>
                <button
                  onClick={loadAll}
                  className="mt-3 inline-flex items-center gap-2 text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
                >
                  <RefreshCw size={12} />
                  Try again
                </button>
              </div>
            </div>
          </div>

          {/* GoatCounter Dashboard Embed */}
          <div className="rounded-sm border border-white/[0.06] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">GoatCounter Dashboard</p>
              <a
                href={GOATCOUNTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/50 transition-colors"
              >
                <ExternalLink size={10} />
                Open in new tab
              </a>
            </div>
            <div className="bg-white">
              <iframe
                src={GOATCOUNTER_URL}
                className="w-full border-0"
                style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}
                title="GoatCounter Analytics"
              />
            </div>
          </div>

          {/* Footer info */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/[0.06] bg-white/[0.02]">
            <BarChart3 size={13} className="text-white/20" />
            <p className="text-[10px] text-white/20">
              Powered by GoatCounter — privacy-friendly, no cookies, no personal data tracked.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          {summary && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Today" value={summary.today_views} icon={Eye} />
              <StatCard label="This Week" value={summary.week_views} icon={TrendingUp} />
              <StatCard label="This Month" value={summary.month_views} icon={BarChart3} />
              <StatCard label="All Time" value={summary.total_views} icon={Globe} />
            </div>
          )}

          {/* Daily Chart */}
          {daily.length > 0 && (
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-4">
                Daily Views — Last 30 Days
              </p>
              <MiniChart data={daily} />
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={13} className="text-white/20" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Top Pages</p>
              </div>
              <div className="space-y-2">
                {pages.length > 0 ? (
                  pages.slice(0, 10).map((p) => (
                    <BarRow key={p.path} label={p.path} value={p.views} max={pages[0]?.views || 1} />
                  ))
                ) : (
                  <p className="text-xs text-white/20">No page data yet</p>
                )}
              </div>
            </div>

            {/* Referrers */}
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={13} className="text-white/20" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Referrers</p>
              </div>
              <div className="space-y-2">
                {refs.length > 0 ? (
                  refs.slice(0, 10).map((r) => (
                    <BarRow key={r.ref} label={r.ref} value={r.hits} max={refs[0]?.hits || 1} />
                  ))
                ) : (
                  <p className="text-xs text-white/20">No referrer data yet</p>
                )}
              </div>
            </div>

            {/* Browsers */}
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <Monitor size={13} className="text-white/20" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Browsers</p>
              </div>
              <div className="space-y-2">
                {browsers.length > 0 ? (
                  browsers.slice(0, 8).map((b) => (
                    <BarRow key={b.name} label={b.name} value={b.hits} max={browsers[0]?.hits || 1} />
                  ))
                ) : (
                  <p className="text-xs text-white/20">No browser data yet</p>
                )}
              </div>
            </div>

            {/* Operating Systems */}
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <Monitor size={13} className="text-white/20" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Operating Systems</p>
              </div>
              <div className="space-y-2">
                {systems.length > 0 ? (
                  systems.slice(0, 8).map((s) => (
                    <BarRow key={s.name} label={s.name} value={s.hits} max={systems[0]?.hits || 1} />
                  ))
                ) : (
                  <p className="text-xs text-white/20">No OS data yet</p>
                )}
              </div>
            </div>

            {/* Locations */}
            <div className="p-5 rounded-sm border border-white/[0.06] bg-white/[0.02] lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={13} className="text-white/20" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20">Locations</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {locations.length > 0 ? (
                  locations.slice(0, 12).map((l) => (
                    <BarRow key={l.code} label={l.name} value={l.hits} max={locations[0]?.hits || 1} />
                  ))
                ) : (
                  <p className="text-xs text-white/20">No location data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/[0.06] bg-white/[0.02]">
            <BarChart3 size={13} className="text-white/20" />
            <p className="text-[10px] text-white/20">
              Powered by GoatCounter — privacy-friendly, no cookies, no personal data tracked.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
