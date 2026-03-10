#!/usr/bin/env node
/**
 * PocketBase Setup Script: Create "videos" collection and seed the podcast video.
 *
 * Usage:
 *   POCKETBASE_URL=https://weldonmakori.com/pb \
 *   POCKETBASE_ADMIN_EMAIL=admin@example.com \
 *   POCKETBASE_ADMIN_PASSWORD=yourpassword \
 *   node scripts/setup-videos.mjs
 */

const PB_URL = process.env.POCKETBASE_URL || "https://weldonmakori.com/pb";
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Error: Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD env vars.");
  process.exit(1);
}

async function api(path, options = {}) {
  const url = `${PB_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) {
    console.error(`API Error ${res.status} ${path}:`, data);
    throw new Error(`API Error ${res.status}`);
  }
  return data;
}

async function main() {
  // 1. Authenticate as admin
  console.log("Authenticating as admin...");
  const auth = await api("/api/admins/auth-with-password", {
    method: "POST",
    body: JSON.stringify({ identity: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const token = auth.token;
  console.log("Authenticated successfully.");

  const authHeaders = { Authorization: `Bearer ${token}` };

  // 2. Check if videos collection already exists
  let collectionExists = false;
  try {
    await api("/api/collections/videos", { headers: authHeaders });
    collectionExists = true;
    console.log("Videos collection already exists.");
  } catch {
    console.log("Videos collection does not exist. Creating...");
  }

  // 3. Create videos collection if it doesn't exist
  if (!collectionExists) {
    await api("/api/collections", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        name: "videos",
        type: "base",
        schema: [
          { name: "title", type: "text", required: true },
          { name: "youtube_url", type: "url", required: true },
          { name: "youtube_id", type: "text", required: true },
          { name: "description", type: "text" },
          { name: "visible", type: "bool", options: { default: true } },
          { name: "display_order", type: "number", options: { default: 0 } },
        ],
        listRule: "",
        viewRule: "",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
      }),
    });
    console.log("Videos collection created.");
  }

  // 4. Seed the Whole Lotta...Weldon podcast video
  console.log("Seeding podcast video...");
  try {
    const existing = await api(
      `/api/collections/videos/records?filter=(youtube_id='XSEknO_Nb2o')`,
      { headers: authHeaders }
    );
    if (existing.items && existing.items.length > 0) {
      console.log("Podcast video already exists. Skipping seed.");
    } else {
      await api("/api/collections/videos/records", {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify({
          title: "Whole Lotta...Weldon",
          youtube_url: "https://www.youtube.com/watch?v=XSEknO_Nb2o",
          youtube_id: "XSEknO_Nb2o",
          description: "Weldon Makori sits down with the Whole Lotta Podcast hosts to share his entrepreneurial journey from Kenya to the U.S., co-founding a window cleaning business at 15, landing a job at Tesla by 19, and building multiple startups.",
          visible: true,
          display_order: 0,
        }),
      });
      console.log("Podcast video seeded successfully!");
    }
  } catch (err) {
    console.error("Failed to seed video:", err.message);
  }

  console.log("\nDone! The videos collection is ready.");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});
