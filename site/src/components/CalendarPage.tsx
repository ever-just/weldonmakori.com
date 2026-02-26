"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, Send, CheckCircle, AlertCircle } from "lucide-react";
import { RecordModel } from "pocketbase";
import pb from "@/lib/pocketbase";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", message: "", preferred_time: "" });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const result = await pb.collection("events").getList(1, 200, {
          sort: "start_at",
        });
        setEvents(result.items);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const eventsByDate = useMemo(() => {
    const map: Record<string, RecordModel[]> = {};
    events.forEach((evt) => {
      if (evt.start_at) {
        const d = new Date(evt.start_at);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        if (!map[key]) map[key] = [];
        map[key].push(evt);
      }
    });
    return map;
  }, [events]);

  const selectedEvents = selectedDate
    ? eventsByDate[selectedDate] || []
    : [];

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFullDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const upcomingEvents = events
    .filter((e) => new Date(e.start_at) >= today && e.status === "upcoming")
    .slice(0, 5);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("sending");
    try {
      await pb.collection("bookings").create({
        name: bookingForm.name,
        email: bookingForm.email,
        message: bookingForm.message,
        preferred_time: bookingForm.preferred_time || null,
        status: "pending",
      });
      setBookingStatus("sent");
      setBookingForm({ name: "", email: "", message: "", preferred_time: "" });
    } catch (err) {
      console.error("Booking error:", err);
      setBookingStatus("error");
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
            Schedule
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white/90 leading-[1.1]"
          >
            Calendar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/30 max-w-xl leading-relaxed"
          >
            Upcoming events and meetings. Book time to connect.
          </motion.p>
        </div>
        <div className="hr-fade" />
      </section>

      {/* Calendar + Sidebar */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-5 h-5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              {/* Month Nav */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-light text-white/80">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 text-white/30 hover:text-white/70 transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 text-white/30 hover:text-white/70 transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-[11px] tracking-[0.15em] uppercase text-white/20 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateKey = `${currentYear}-${currentMonth}-${day}`;
                  const dayEvents = eventsByDate[dateKey] || [];
                  const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const isSelected = selectedDate === dateKey;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateKey)}
                      className={`aspect-square flex flex-col items-center justify-center relative border border-white/[0.03] transition-all duration-200 ${
                        isSelected
                          ? "bg-white/10"
                          : "hover:bg-white/[0.04]"
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          isToday
                            ? "text-white font-medium"
                            : isSelected
                            ? "text-white/80"
                            : "text-white/40"
                        }`}
                      >
                        {day}
                      </span>
                      {isToday && (
                        <div className="w-1 h-1 rounded-full bg-white/60 mt-0.5" />
                      )}
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.slice(0, 3).map((evt) => (
                            <div
                              key={evt.id}
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: evt.color || "rgba(255,255,255,0.4)" }}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Day Events */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-white/[0.06]"
                >
                  {selectedEvents.length === 0 ? (
                    <p className="text-sm text-white/20">No events on this day.</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedEvents.map((evt) => (
                        <div
                          key={evt.id}
                          className="flex gap-4 p-4 rounded-sm bg-white/[0.03] border border-white/[0.06]"
                        >
                          <div
                            className="w-1 rounded-full shrink-0"
                            style={{ backgroundColor: evt.color || "rgba(255,255,255,0.3)" }}
                          />
                          <div>
                            <p className="text-sm text-white/70 font-light">{evt.title}</p>
                            <div className="flex items-center gap-3 mt-2">
                              {evt.start_at && (
                                <span className="flex items-center gap-1 text-xs text-white/25">
                                  <Clock className="w-3 h-3" strokeWidth={1.5} />
                                  {formatTime(evt.start_at)}
                                  {evt.end_at && ` – ${formatTime(evt.end_at)}`}
                                </span>
                              )}
                              {evt.location && (
                                <span className="flex items-center gap-1 text-xs text-white/25">
                                  <MapPin className="w-3 h-3" strokeWidth={1.5} />
                                  {evt.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-12"
            >
              {/* Upcoming Events */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-6">
                  Upcoming
                </p>
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-white/20">No upcoming events.</p>
                ) : (
                  <div className="space-y-4">
                    {upcomingEvents.map((evt) => (
                      <div key={evt.id} className="group">
                        <p className="text-sm text-white/60 font-light group-hover:text-white/80 transition-colors">
                          {evt.title}
                        </p>
                        <p className="text-xs text-white/20 mt-1">
                          {formatFullDate(evt.start_at)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Book a Meeting */}
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/20 mb-6">
                  Book a Meeting
                </p>
                {!showBooking ? (
                  <button
                    onClick={() => setShowBooking(true)}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    <Calendar className="w-4 h-4" strokeWidth={1.5} />
                    Request a time
                  </button>
                ) : bookingStatus === "sent" ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-8 h-8 text-green-400/50 mx-auto mb-3" strokeWidth={1} />
                    <p className="text-sm text-white/60">Request sent!</p>
                    <p className="text-xs text-white/25 mt-1">I&apos;ll confirm soon.</p>
                    <button
                      onClick={() => { setBookingStatus("idle"); setShowBooking(false); }}
                      className="text-xs text-white/30 hover:text-white/50 mt-3 underline underline-offset-4 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-5">
                    <div>
                      <input
                        type="text"
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-white/70 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-white/70 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <input
                        type="datetime-local"
                        value={bookingForm.preferred_time}
                        onChange={(e) => setBookingForm({ ...bookingForm, preferred_time: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-white/70 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={3}
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 pb-2 text-white/70 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
                        placeholder="What would you like to discuss?"
                      />
                    </div>
                    {bookingStatus === "error" && (
                      <div className="flex items-center gap-2 text-red-400/70 text-xs">
                        <AlertCircle className="w-3 h-3" />
                        <span>Something went wrong.</span>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={bookingStatus === "sending"}
                        className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors disabled:opacity-40"
                      >
                        <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {bookingStatus === "sending" ? "Sending..." : "Send request"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBooking(false)}
                        className="text-xs text-white/20 hover:text-white/40 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </>
  );
}
