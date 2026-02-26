"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, FileText, Image, CalendarDays, Users, ArrowUpRight } from "lucide-react";
import { useAdmin } from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  const { pb } = useAdmin();
  const [stats, setStats] = useState({
    contacts: 0,
    newContacts: 0,
    posts: 0,
    publishedPosts: 0,
    photos: 0,
    events: 0,
    bookings: 0,
    pendingBookings: 0,
  });
  const [recentContacts, setRecentContacts] = useState<Array<{ id: string; name: string; email: string; subject: string; created: string; status: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [contacts, posts, photos, events, bookings] = await Promise.all([
          pb.collection("contact_submissions").getList(1, 5, { sort: "-created" }),
          pb.collection("blog_posts").getList(1, 1),
          pb.collection("photos").getList(1, 1),
          pb.collection("events").getList(1, 1),
          pb.collection("bookings").getList(1, 1),
        ]);

        const publishedPosts = await pb.collection("blog_posts").getList(1, 1, { filter: 'status = "published"' });
        const newContacts = await pb.collection("contact_submissions").getList(1, 1, { filter: 'status = "new"' });
        const pendingBookings = await pb.collection("bookings").getList(1, 1, { filter: 'status = "pending"' });

        setStats({
          contacts: contacts.totalItems,
          newContacts: newContacts.totalItems,
          posts: posts.totalItems,
          publishedPosts: publishedPosts.totalItems,
          photos: photos.totalItems,
          events: events.totalItems,
          bookings: bookings.totalItems,
          pendingBookings: pendingBookings.totalItems,
        });

        setRecentContacts(contacts.items.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          subject: c.subject || "",
          created: c.created,
          status: c.status,
        })));
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pb]);

  const cards = [
    {
      label: "Contacts",
      value: stats.contacts,
      sub: `${stats.newContacts} new`,
      icon: Mail,
      href: "/admin/contacts",
    },
    {
      label: "Blog Posts",
      value: stats.posts,
      sub: `${stats.publishedPosts} published`,
      icon: FileText,
      href: "/admin/blog",
    },
    {
      label: "Photos",
      value: stats.photos,
      sub: "in gallery",
      icon: Image,
      href: "/admin/photos",
    },
    {
      label: "Events",
      value: stats.events,
      sub: "scheduled",
      icon: CalendarDays,
      href: "/admin/events",
    },
    {
      label: "Bookings",
      value: stats.bookings,
      sub: `${stats.pendingBookings} pending`,
      icon: Users,
      href: "/admin/bookings",
    },
  ];

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
        <h1 className="text-2xl md:text-3xl font-extralight text-white/80">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group p-5 rounded-sm border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4 text-white/20" strokeWidth={1.5} />
                <ArrowUpRight className="w-3 h-3 text-white/10 group-hover:text-white/30 transition-colors" strokeWidth={1.5} />
              </div>
              <p className="text-2xl font-light text-white/70">{card.value}</p>
              <p className="text-[11px] tracking-wide text-white/25 mt-1">
                {card.label} · {card.sub}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent Contacts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-[11px] tracking-[0.2em] uppercase text-white/20">Recent Contacts</p>
          <Link href="/admin/contacts" className="text-xs text-white/25 hover:text-white/50 transition-colors">
            View all →
          </Link>
        </div>
        {recentContacts.length === 0 ? (
          <p className="text-sm text-white/20">No contact submissions yet.</p>
        ) : (
          <div className="space-y-2">
            {recentContacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 rounded-sm border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-white/60 truncate">{c.name}</p>
                    {c.status === "new" && (
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                    )}
                  </div>
                  <p className="text-xs text-white/20 mt-0.5 truncate">{c.subject || c.email}</p>
                </div>
                <p className="text-xs text-white/15 shrink-0 ml-4">
                  {c.created && !isNaN(new Date(c.created).getTime())
                    ? new Date(c.created).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "—"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
