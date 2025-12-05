AB testing setup

- Variant assignment via `getABVariant()` persisted in `localStorage`.
- Events recorded with `recordEvent(event)` into `localStorage.ab_metrics`.
- Tracked events: `add_to_cart`, `checkout_started`, `place_order` (extend as needed).
- Read metrics periodically to evaluate conversion differences.

Future improvements
- Wire to a backend endpoint for centralized storage.
- Add experiment toggles via query string `?ab=B` to override local assignment.
