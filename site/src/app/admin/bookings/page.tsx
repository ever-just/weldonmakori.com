"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Trash2, Check, X as XIcon, Clock } from "lucide-react";
import { RecordModel } from "pocketbase";

export default function AdminBookings() {
  const { pb } = useAdmin();
  const [bookings, setBookings] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      const result = await pb.collection("bookings").getList(1, 100, { sort: "-created" });
      setBookings(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pb]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await pb.collection("bookings").update(id, { status });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
      setMessage({ type: "success", text: `Booking ${status}.` });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to update booking." });
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    try {
      await pb.collection("bookings").delete(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setMessage({ type: "success", text: "Booking deleted." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete booking." });
    }
  };

  const statusColor = (s: string) => {
    if (s === "pending") return "bg-yellow-400/20 text-yellow-300/80";
    if (s === "confirmed") return "bg-green-400/20 text-green-300/80";
    return "bg-red-400/20 text-red-300/80";
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
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-sm border text-sm ${
          message.type === "success"
            ? "border-green-400/20 bg-green-400/10 text-green-300/80"
            : "border-red-400/20 bg-red-400/10 text-red-300/80"
        }`}>
          {message.text}
          <button onClick={() => setMessage(null)} className="float-right text-white/30 hover:text-white/60">×</button>
        </div>
      )}

      <div className="mb-10">
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Manage</p>
        <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Bookings</h1>
        <p className="text-sm text-white/25 mt-2">{bookings.length} total</p>
      </div>

      {bookings.length === 0 ? (
        <p className="text-sm text-white/20 py-10 text-center">No booking requests yet.</p>
      ) : (
        <div className="space-y-2">
          {bookings.map((b) => (
            <div key={b.id} className="px-5 py-4 border border-white/[0.06] rounded-sm bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm text-white/60">{b.name}</p>
                    <span className={`text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full ${statusColor(b.status)}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/30">{b.email}</p>
                  {b.preferred_time && (
                    <p className="flex items-center gap-1.5 text-xs text-white/25 mt-2">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      Preferred: {new Date(b.preferred_time).toLocaleString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                        hour: "numeric", minute: "2-digit",
                      })}
                    </p>
                  )}
                  {b.message && (
                    <p className="text-sm text-white/35 mt-2 leading-relaxed">{b.message}</p>
                  )}
                  <p className="text-xs text-white/15 mt-2">
                    Submitted {new Date(b.created).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {b.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(b.id, "confirmed")}
                        className="p-2 text-green-400/40 hover:text-green-400/80 hover:bg-green-400/10 rounded-sm transition-colors"
                        title="Confirm"
                      >
                        <Check className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, "declined")}
                        className="p-2 text-red-400/40 hover:text-red-400/80 hover:bg-red-400/10 rounded-sm transition-colors"
                        title="Decline"
                      >
                        <XIcon className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="p-2 text-white/15 hover:text-red-400/70 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
