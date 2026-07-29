# Migración del catálogo antiguo

El catálogo inicial procede de `old/seed.js` (seed version 7) y se carga mediante
la migración `20260729000001_seed_catalog.sql`.

Los IDs antiguos (`c1`, `i1`, `m1`, `s1`, `w1`, etc.) se conservan en `legacy_id`.
Las relaciones internas usan UUID para mantener el modelo relacional de Supabase.
Las traducciones se conservan en columnas JSONB y la interfaz actual continúa
mostrando español.

RLS queda habilitado en la migración base, pero las policies se añadirán cuando
esté definido cómo el SSO del hub establece la identidad JWT que recibe Supabase.
