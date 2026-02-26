"use client";

import { useState, useEffect } from "react";
import { useAdmin } from "@/components/admin/AdminLayout";
import { Trash2, Eye, Mail, ChevronDown } from "lucide-react";
import { RecordModel } from "pocketbase";

export default function AdminContacts() {
  const { pb } = useAdmin();
  const [contacts, setContacts] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = async () => {
    try {
      const result = await pb.collection("contact_submissions").getList(1, 100, { sort: "-created" });
      setContacts(result.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [pb]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await pb.collection("contact_submissions").update(id, { status });
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await pb.collection("contact_submissions").delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = (s: string) => {
    if (s === "new") return "bg-blue-400/20 text-blue-300/80";
    if (s === "read") return "bg-white/10 text-white/40";
    return "bg-green-400/20 text-green-300/80";
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
        <p className="text-[11px] tracking-[0.3em] uppercase text-white/20 mb-2">Manage</p>
        <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Contact Submissions</h1>
        <p className="text-sm text-white/25 mt-2">{contacts.length} total</p>
      </div>

      {contacts.length === 0 ? (
        <p className="text-sm text-white/20 py-10 text-center">No submissions yet.</p>
      ) : (
        <div className="space-y-2">
          {contacts.map((c) => (
            <div key={c.id} className="border border-white/[0.06] rounded-sm bg-white/[0.02]">
              <button
                onClick={() => {
                  setExpanded(expanded === c.id ? null : c.id);
                  if (c.status === "new") updateStatus(c.id, "read");
                }}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-white/60">{c.name}</p>
                    <span className={`text-[10px] tracking-wide uppercase px-2 py-0.5 rounded-full ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/20 mt-0.5 truncate">
                    {c.subject ? `${c.subject} — ` : ""}{c.email}
                  </p>
                </div>
                <p className="text-xs text-white/15 shrink-0">
                  {new Date(c.created).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <ChevronDown className={`w-4 h-4 text-white/15 transition-transform ${expanded === c.id ? "rotate-180" : ""}`} />
              </button>

              {expanded === c.id && (
                <div className="px-5 pb-5 border-t border-white/[0.04]">
                  <div className="pt-4 space-y-4">
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-white/15 mb-1">Message</p>
                      <p className="text-sm text-white/50 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-white/15 mb-1">Email</p>
                        <a href={`mailto:${c.email}`} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                          {c.email}
                        </a>
                      </div>
                      {c.subject && (
                        <div>
                          <p className="text-[10px] tracking-[0.15em] uppercase text-white/15 mb-1">Subject</p>
                          <p className="text-sm text-white/40">{c.subject}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={`mailto:${c.email}?subject=Re: ${c.subject || "Your message"}`}
                        onClick={() => updateStatus(c.id, "replied")}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/40 hover:text-white/70 border border-white/10 rounded-sm transition-colors"
                      >
                        <Mail className="w-3 h-3" strokeWidth={1.5} />
                        Reply
                      </a>
                      {c.status !== "read" && (
                        <button
                          onClick={() => updateStatus(c.id, "read")}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/30 hover:text-white/50 border border-white/10 rounded-sm transition-colors"
                        >
                          <Eye className="w-3 h-3" strokeWidth={1.5} />
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-400/40 hover:text-red-400/70 border border-red-400/10 rounded-sm transition-colors ml-auto"
                      >
                        <Trash2 className="w-3 h-3" strokeWidth={1.5} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
