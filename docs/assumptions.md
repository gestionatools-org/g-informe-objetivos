# Assumptions

- PDF export keeps grouped items per instruction and includes metadata, observaciones y plazo.
- Plazo is selected per item at export time (not stored in Supabase).
- Supabase uses normalized tables (`informeobjetivos_commissions`, `informeobjetivos_instructions`, `informeobjetivos_matters`, `informeobjetivos_submatters`, `informeobjetivos_work_lines`, `informeobjetivos_items_objetivo`) and a read view `informeobjetivos_v_items_export` for UI/PDF.
- `informeobjetivos_items_objetivo.id` is a UUID primary key generated with `gen_random_uuid()` via `pgcrypto`.
- SSO handoff uses Hub SSO v2 tokens verified with Ed25519 public-key verification via `@gestionatools-org/hub-sso-core`.
- The migrated catalog keeps deprecated local-app IDs in `legacy_id`; new admin-created rows receive generated technical `legacy_id` values.
- RLS policies are deferred until the SSO-to-Supabase identity bridge is defined; the new catalog migration enables RLS and leaves tables deny-by-default.
- CRUD authorization is expected to use an admin flag such as `users.admin = true`, but the exact Supabase policy shape remains open.
- `@gestionatools-org/hub-sso-core` is installed from GitHub Packages; Vercel/CI needs `GITHUB_TOKEN` with `read:packages`.
- `HUB_SSO_PUBLIC_KEY` verifies Hub-issued SSO v2 tokens; `APP_SESSION_SECRET` signs this app's local `hub_app_session` cookie.
