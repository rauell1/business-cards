# Database Schema (Neon PostgreSQL + Drizzle)

UUID v4 primary keys (`gen_random_uuid()`), `created_at` / `updated_at` on every
table, soft delete (`deleted_at`) on user-facing entities.

## Entity groups

### Identity
- **users** - id, email (unique), email_verified_at, password_hash, name, role
  enum(`super_admin`,`admin`,`customer`,`org_admin`,`org_member`), status, deleted_at
- **user_sessions** - Better Auth sessions
- **accounts** - OAuth/provider links
- **organizations** - id, name, slug, logo_url, brand_colour, billing_email
- **organization_members** - (organization_id, user_id) unique, role

### Digital profile
- **user_profiles** - id, user_id FK, organization_id FK null, username (unique,
  citext), full_name, title, bio, company, industry, location, avatar_url,
  cover_url, theme jsonb, is_published, published_at, visibility jsonb
- **profile_links** - id, profile_id FK, kind enum(`social`,`document`,`custom`),
  network, label, url, position, is_visible
- **profile_themes** - preset palettes and layouts

### Hardware
- **nfc_cards** - id, tag_uid (unique, never exposed publicly), status
  enum(`unassigned`,`pending`,`active`,`suspended`,`lost`,`replaced`),
  batch, finish, owner_user_id null
- **card_assignments** - id, card_id FK, profile_id FK, assigned_at,
  unassigned_at, assigned_by. Partial unique index: one active assignment per card.

### Analytics
- **profile_events** - id, profile_id FK, card_id FK null,
  type enum(...), source enum(`nfc`,`qr`,`link`,`direct`), occurred_at,
  device_category, referrer_host. Indexed on (profile_id, occurred_at).
- **profile_analytics** - daily rollups (profile_id, day, type, count) for fast dashboards

### Commerce
- products · product_variants · product_images · carts · cart_items · orders ·
  order_items · payments · payment_events · delivery_addresses
- `payments` keeps provider, provider_ref (unique), status, raw_callback jsonb
- order status enum: pending → awaiting_payment → paid → processing →
  profile_setup → card_preparation → dispatched → delivered → completed
  (+ cancelled, refunded)

### Supporting
- contacts (saved from scanner) · scanned_business_cards · scanner_usage
- notifications · support_tickets · admin_audit_logs · impact_records

## Key constraints

```sql
-- A card may only have one live assignment at a time
CREATE UNIQUE INDEX card_one_active_assignment
  ON card_assignments (card_id) WHERE unassigned_at IS NULL;

-- Usernames are case-insensitive and globally unique
CREATE UNIQUE INDEX profiles_username_unique ON user_profiles (lower(username));

-- Idempotent payment callbacks
CREATE UNIQUE INDEX payments_provider_ref ON payments (provider, provider_ref);
```

## Integrity rules

- `profile_events.card_id` must be validated against an active assignment for the
  same profile before insert.
- Deleting a user soft-deletes profiles and unassigns cards; cards return to
  `unassigned` rather than being deleted, so inventory stays truthful.
- All multi-table order creation runs in a single transaction.
