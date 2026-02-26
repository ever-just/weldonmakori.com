"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminLayout";
import { RecordModel } from "pocketbase";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function AdminCalendar() {
  const { pb } = useAdmin();
  const [events, setEvents] = useState<RecordModel[]>([]);
  const [bookings, setBookings] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();

  useEffect(() => {
    async function load() {
      try {
        const [ev, bk] = await Promise.all([
          pb.collection("events").getFullList({ sort: "start_at" }),
          pb.collection("bookings").getFullList({ sort: "preferred_date" }),
        ]);
        setEvents(ev);
        setBookings(bk);
      } catch (err) {
        console.error("Failed to load calendar data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pb]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));
  const today = () => setCurrent(new Date());

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = events.filter((e) => {
      const start = (e.start_at as string || "").slice(0, 10);
      return start === dateStr;
    });
    const dayBookings = bookings.filter((b) => {
      const pref = (b.preferred_date as string || "").slice(0, 10);
      return pref === dateStr;
    });
    return { events: dayEvents, bookings: dayBookings };
  };

  const isToday = (day: number) => {
    const now = new Date();
    return day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Overview</p>
        <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Calendar</h1>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={prev} className="p-2 rounded-sm border border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-lg font-light text-white/60 min-w-[180px] text-center">
            {MONTHS[month]} {year}
          </h2>
          <button onClick={next} className="p-2 rounded-sm border border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
        <button
          onClick={today}
          className="text-xs text-white/30 hover:text-white/60 border border-white/[0.06] px-3 py-1.5 rounded-sm hover:bg-white/[0.04] transition-all"
        >
          Today
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-white/30">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400/60" /> Event
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400/60" /> Booking
        </span>
      </div>

      {/* Grid */}
      <div className="border border-white/[0.06] rounded-sm overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-[11px] tracking-wider uppercase text-white/20 py-2 border-b border-white/[0.06]">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Cells */}
        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[80px] border-b border-r border-white/[0.03]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const { events: dayEvents, bookings: dayBookings } = getEventsForDay(day);
            const hasItems = dayEvents.length > 0 || dayBookings.length > 0;
            return (
              <div
                key={day}
                className={`min-h-[80px] border-b border-r border-white/[0.03] p-1.5 transition-colors ${
                  hasItems ? "bg-white/[0.02]" : ""
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                    isToday(day)
                      ? "bg-white/20 text-white"
                      : "text-white/30"
                  }`}
                >
                  {day}
                </span>
                <div className="mt-1 space-y-0.5">
                  {dayEvents.map((ev) => (
                    <div key={ev.id} className="text-[10px] truncate px-1 py-0.5 rounded bg-blue-400/10 text-blue-400/70">
                      {ev.title as string}
                    </div>
                  ))}
                  {dayBookings.map((bk) => (
                    <div key={bk.id} className="text-[10px] truncate px-1 py-0.5 rounded bg-amber-400/10 text-amber-400/70">
                      {bk.name as string}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <CalendarIcon size={14} className="text-white/20 mb-2" />
          <p className="text-xl font-light text-white/60">{events.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-white/20">Events</p>
        </div>
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <CalendarIcon size={14} className="text-white/20 mb-2" />
          <p className="text-xl font-light text-white/60">{bookings.length}</p>
          <p className="text-[10px] uppercase tracking-wider text-white/20">Bookings</p>
        </div>
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <CalendarIcon size={14} className="text-white/20 mb-2" />
          <p className="text-xl font-light text-white/60">
            {events.filter((e) => (e.status as string) === "upcoming").length}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-white/20">Upcoming</p>
        </div>
        <div className="p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]">
          <CalendarIcon size={14} className="text-white/20 mb-2" />
          <p className="text-xl font-light text-white/60">
            {bookings.filter((b) => (b.status as string) === "pending").length}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-white/20">Pending</p>
        </div>
      </div>
    </div>
  );
}
