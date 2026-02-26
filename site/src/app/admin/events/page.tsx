"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit, X, Save } from "lucide-react";
import { RecordModel } from "pocketbase";

const EMPTY_EVENT = {
  title: "",
  description: "",
  start_at: "",
  end_at: "",
  location: "",
  event_type: "event",
  status: "upcoming",
  color: "#ffffff",
};

export default function AdminEvents() {
  const { pb } = useAdmin();
  const [events, setEvents] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const load = async () => {
    try {
      const result = await pb.collection("events").getList(1, 200, { sort: "-start_at" });
      setEvents(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pb]);

  const openNew = () => {
    setForm(EMPTY_EVENT);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (evt: RecordModel) => {
    setForm({
      title: evt.title || "",
      description: evt.description || "",
      start_at: evt.start_at ? new Date(evt.start_at).toISOString().slice(0, 16) : "",
      end_at: evt.end_at ? new Date(evt.end_at).toISOString().slice(0, 16) : "",
      location: evt.location || "",
      event_type: evt.event_type || "event",
      status: evt.status || "upcoming",
      color: evt.color || "#ffffff",
    });
    setEditing(evt.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        start_at: form.start_at ? new Date(form.start_at).toISOString() : null,
        end_at: form.end_at ? new Date(form.end_at).toISOString() : null,
      };
      if (editing) {
        await pb.collection("events").update(editing, data);
      } else {
        await pb.collection("events").create(data);
      }
      setShowForm(false);
      setEditing(null);
      setMessage({ type: "success", text: editing ? "Event updated!" : "Event created!" });
      load();
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      setMessage({ type: "error", text: "Failed to save event: " + msg });
    } finally {
      setSaving(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    try {
      await pb.collection("events").delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      setMessage({ type: "success", text: "Event deleted." });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete event." });
    }
  };

  const statusColor = (s: string) => {
    if (s === "upcoming") return "bg-blue-400/20 text-blue-300/80";
    if (s === "completed") return "bg-green-400/20 text-green-300/80";
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

      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Manage</p>
          <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Events</h1>
        </div>
        <button
          onClick={showForm ? () => { setShowForm(false); setEditing(null); } : openNew}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 border border-white/10 hover:border-white/20 rounded-sm transition-all"
        >
          {showForm ? <X className="w-4 h-4" strokeWidth={1.5} /> : <Plus className="w-4 h-4" strokeWidth={1.5} />}
          {showForm ? "Cancel" : "New Event"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 p-6 border border-white/[0.08] rounded-sm bg-white/[0.02] space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="Event title"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors"
                placeholder="Optional location"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Start</label>
              <input
                type="datetime-local"
                required
                value={form.start_at}
                onChange={(e) => setForm({ ...form, start_at: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm focus:border-white/30 focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">End</label>
              <input
                type="datetime-local"
                value={form.end_at}
                onChange={(e) => setForm({ ...form, end_at: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm focus:border-white/30 focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Type</label>
              <select
                value={form.event_type}
                onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm focus:border-white/30 focus:outline-none transition-colors"
              >
                <option value="event">Event</option>
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm focus:border-white/30 focus:outline-none transition-colors"
              >
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-transparent border border-white/10 rounded-sm px-3 py-2.5 text-white/80 text-sm placeholder:text-white/15 focus:border-white/30 focus:outline-none transition-colors resize-none"
                placeholder="Optional description"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.2em] uppercase text-white/20 mb-2">Color</label>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-12 h-10 bg-transparent border border-white/10 rounded-sm cursor-pointer"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 bg-white/10 hover:bg-white/15 border border-white/10 rounded-sm transition-all disabled:opacity-40"
          >
            <Save className="w-4 h-4" strokeWidth={1.5} />
            {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
          </button>
        </form>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <p className="text-sm text-white/20 py-10 text-center">No events yet.</p>
      ) : (
        <div className="space-y-2">
          {events.map((evt) => (
            <div key={evt.id} className="flex items-center gap-4 px-5 py-4 border border-white/[0.06] rounded-sm bg-white/[0.02]">
              <div
                className="w-2 h-8 rounded-full shrink-0"
                style={{ backgroundColor: evt.color || "rgba(255,255,255,0.3)" }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-white/60">{evt.title}</p>
                  <span className={`text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full ${statusColor(evt.status)}`}>
                    {evt.status}
                  </span>
                  <span className="text-[10px] tracking-wide uppercase text-white/15 px-2 py-0.5 border border-white/[0.06] rounded-full">
                    {evt.event_type}
                  </span>
                </div>
                <p className="text-xs text-white/20 mt-0.5">
                  {evt.start_at && new Date(evt.start_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                  {evt.location && ` · ${evt.location}`}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(evt)}
                  className="p-2 text-white/20 hover:text-white/50 transition-colors"
                >
                  <Edit className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => deleteEvent(evt.id)}
                  className="p-2 text-white/20 hover:text-red-400/70 transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
