#!/bin/bash
PB_URL="http://142.93.78.220"

# Auth
PB_TOKEN=$(curl -s -X POST "$PB_URL/api/collections/_superusers/auth-with-password" \
  -H "Content-Type: application/json" \
  -d '{"identity":"weldonmakori@outlook.com","password":"AdminPass2026!"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

echo "Token length: ${#PB_TOKEN}"

# 1. blog_posts
echo "Creating blog_posts..."
curl -s -X POST "$PB_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{
    "name": "blog_posts",
    "type": "base",
    "schema": [
      {"name": "title", "type": "text", "required": true},
      {"name": "slug", "type": "text", "required": true},
      {"name": "content", "type": "editor", "required": false},
      {"name": "excerpt", "type": "text", "required": false},
      {"name": "cover_image", "type": "file", "required": false, "options": {"maxSelect": 1, "maxSize": 5242880, "mimeTypes": ["image/jpeg","image/png","image/webp","image/gif"]}},
      {"name": "tags", "type": "json", "required": false},
      {"name": "status", "type": "select", "required": true, "options": {"maxSelect": 1, "values": ["draft","published"]}},
      {"name": "published_at", "type": "date", "required": false}
    ],
    "indexes": ["CREATE UNIQUE INDEX idx_blog_slug ON blog_posts (slug)"]
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name', d.get('message','UNKNOWN')))"

# 2. photos
echo "Creating photos..."
curl -s -X POST "$PB_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{
    "name": "photos",
    "type": "base",
    "schema": [
      {"name": "image", "type": "file", "required": true, "options": {"maxSelect": 1, "maxSize": 10485760, "mimeTypes": ["image/jpeg","image/png","image/webp","image/gif","image/heic"]}},
      {"name": "title", "type": "text", "required": false},
      {"name": "caption", "type": "text", "required": false},
      {"name": "tags", "type": "json", "required": false},
      {"name": "visible", "type": "bool", "required": false},
      {"name": "display_order", "type": "number", "required": false}
    ]
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name', d.get('message','UNKNOWN')))"

# 3. events
echo "Creating events..."
curl -s -X POST "$PB_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{
    "name": "events",
    "type": "base",
    "schema": [
      {"name": "title", "type": "text", "required": true},
      {"name": "description", "type": "editor", "required": false},
      {"name": "start_at", "type": "date", "required": true},
      {"name": "end_at", "type": "date", "required": false},
      {"name": "location", "type": "text", "required": false},
      {"name": "type", "type": "select", "required": true, "options": {"maxSelect": 1, "values": ["event","meeting","deadline"]}},
      {"name": "status", "type": "select", "required": true, "options": {"maxSelect": 1, "values": ["upcoming","completed","cancelled"]}},
      {"name": "color", "type": "text", "required": false}
    ]
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name', d.get('message','UNKNOWN')))"

# 4. bookings
echo "Creating bookings..."
curl -s -X POST "$PB_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{
    "name": "bookings",
    "type": "base",
    "schema": [
      {"name": "name", "type": "text", "required": true},
      {"name": "email", "type": "email", "required": true},
      {"name": "message", "type": "text", "required": false},
      {"name": "preferred_time", "type": "date", "required": false},
      {"name": "status", "type": "select", "required": true, "options": {"maxSelect": 1, "values": ["pending","confirmed","declined"]}}
    ]
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name', d.get('message','UNKNOWN')))"

# 5. contact_submissions
echo "Creating contact_submissions..."
curl -s -X POST "$PB_URL/api/collections" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{
    "name": "contact_submissions",
    "type": "base",
    "schema": [
      {"name": "name", "type": "text", "required": true},
      {"name": "email", "type": "email", "required": true},
      {"name": "subject", "type": "text", "required": false},
      {"name": "message", "type": "text", "required": true},
      {"name": "status", "type": "select", "required": true, "options": {"maxSelect": 1, "values": ["new","read","replied"]}}
    ]
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name', d.get('message','UNKNOWN')))"

echo ""
echo "Done! Now setting API rules..."

# Now update API rules for public access where needed
# blog_posts: public can read published, superusers can CRUD
BLOG_ID=$(curl -s "$PB_URL/api/collections/blog_posts" -H "Authorization: $PB_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
curl -s -X PATCH "$PB_URL/api/collections/$BLOG_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{"listRule": "status = \"published\"", "viewRule": "status = \"published\""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('blog_posts rules: OK' if 'id' in d else d.get('message','FAIL'))"

# photos: public can read visible
PHOTOS_ID=$(curl -s "$PB_URL/api/collections/photos" -H "Authorization: $PB_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
curl -s -X PATCH "$PB_URL/api/collections/$PHOTOS_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{"listRule": "visible = true", "viewRule": "visible = true"}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('photos rules: OK' if 'id' in d else d.get('message','FAIL'))"

# events: public can read upcoming events
EVENTS_ID=$(curl -s "$PB_URL/api/collections/events" -H "Authorization: $PB_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
curl -s -X PATCH "$PB_URL/api/collections/$EVENTS_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{"listRule": "", "viewRule": ""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('events rules: OK' if 'id' in d else d.get('message','FAIL'))"

# bookings: public can create (submit booking), only superusers can read/update/delete
BOOKINGS_ID=$(curl -s "$PB_URL/api/collections/bookings" -H "Authorization: $PB_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
curl -s -X PATCH "$PB_URL/api/collections/$BOOKINGS_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{"createRule": ""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('bookings rules: OK' if 'id' in d else d.get('message','FAIL'))"

# contact_submissions: public can create (submit form), only superusers can read/update/delete
CONTACTS_ID=$(curl -s "$PB_URL/api/collections/contact_submissions" -H "Authorization: $PB_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
curl -s -X PATCH "$PB_URL/api/collections/$CONTACTS_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: $PB_TOKEN" \
  -d '{"createRule": ""}' \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print('contact_submissions rules: OK' if 'id' in d else d.get('message','FAIL'))"

echo ""
echo "All collections created and rules set!"
