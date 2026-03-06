# Cal.com Integration Plan — Astro Tailwind Boilerplate

> Senior full-stack perspective for integrating Cal.com into the business/professional boilerplate.  
> **Branch**: `feature/calcom-integration` (to be created)

---

## Executive Summary

Cal.com is an open-source scheduling platform that fits well with Astro. The **embed approach** is the recommended path for this boilerplate: zero backend, no API keys for basic use, and works with vanilla JS. The Cal.com API and Atoms (React) are optional for advanced use cases.

---

## 1. What We Can Do

### 1.1 Embed Integration (Recommended — Phase 1)

| Approach | Effort | Use Case |
|----------|--------|----------|
| **Inline embed** | Low | Dedicated `/book` page with full calendar inline |
| **Popup on click** | Low | "Book a call" CTA opens modal |
| **Floating button** | Low | Persistent booking button (e.g. bottom-right) |

**Technical notes:**
- Cal.com provides a script loader (`https://cal.com/embed/embed.js`) — framework-agnostic
- Works with Astro out of the box (no React required)
- Embed Snippet Generator in Cal.com app auto-generates snippets per event type
- Supports prefill (name, email, metadata, location) for logged-in users or UTM tracking
- Query param forwarding (`?name=John&email=john@example.com`) for prefill
- Theme, layout, and brand color configurable via embed config

**Deliverables:**
- `CalEmbed.astro` component with props for `mode` (inline | popup | floating), `calLink`, `config`
- `/book` page with inline embed
- Optional floating button in Layout or Footer
- `site.config.ts` extension: `booking.calUsername`, `booking.defaultEventType`, `booking.enabled`

### 1.2 Site Config Extension

Add a `booking` section to `site.config.ts`:

```ts
booking?: {
  enabled: boolean;
  /** Cal.com username or team slug, e.g. 'yourcompany' or 'yourcompany/30min' */
  calUsername: string;
  /** Default event type slug when embedding profile (optional) */
  defaultEventType?: string;
  /** Show floating button globally */
  floatingButton?: boolean;
}
```

### 1.3 Prefill & UTM Tracking

- Prefill name/email from query params or session (e.g. after contact form)
- Forward UTM params to Cal.com for attribution
- Metadata passthrough for CRM/analytics (e.g. `metadata[source]=website`)

### 1.4 Self-Hosted Cal.com (Advanced)

Cal.com can be self-hosted. If the business runs their own instance:
- Replace `cal.com` with `cal.yourdomain.com` in the embed script URL
- Same embed API; only the origin changes

---

## 2. What We Cannot Do (Out of Scope for Boilerplate)

| Limitation | Reason |
|------------|--------|
| **Cal.com Atoms (React)** | Requires React 18/19; boilerplate is Astro-first, no React. Adding React just for Atoms is overkill. Embed is sufficient. |
| **Platform OAuth / Managed Users** | Platform plan deprecated for new signups (Dec 2025). Not relevant for typical SMB/professional sites. |
| **Full API-driven booking UI** | Possible but requires API keys, server-side logic, rate limits (120 req/min). Overkill for a boilerplate; embed handles 99% of use cases. |
| **Cal.ai (AI phone agent)** | Separate product; not part of core scheduling. |
| **Real-time slot fetching without embed** | Would need Cal.com API + server endpoint; adds complexity. Embed handles this client-side. |

---

## 3. What We Shouldn't Hurry To Do

| Item | Recommendation |
|------|-----------------|
| **API integration** | Defer. Only add if a project needs: programmatic booking creation, custom dashboards, or server-side slot checks. |
| **OAuth client setup** | Only for Atoms or "Continue with Cal.com" — not needed for embed. |
| **Webhooks** | Add when a project needs post-booking automation (CRM sync, custom emails). Document as optional in `/docs`. |
| **Multiple event types / routing forms** | Support via `calLink` prop. Don't build a UI for selecting event types — let users paste their link from Cal.com. |
| **Payments (Stripe)** | Configured in Cal.com dashboard, not in our code. Document that paid events work out of the box. |
| **Cal Video / Zoom integration** | Handled by Cal.com; no code changes needed. |

---

## 4. Implementation Plan

### Phase 1 — Embed Boilerplate (MVP)

1. **Create branch** `feature/calcom-integration`
2. **Extend `site.config.ts`** with optional `booking` block
3. **Create `CalEmbed.astro`**:
   - Load Cal.com script (once per page)
   - Support `mode`: `inline` | `popup` | `floatingButton`
   - Props: `calLink`, `config` (prefill, theme), `elementId` (for inline)
4. **Create `/book` page** with inline embed using config
5. **Optional**: Add "Book a call" CTA to Header/Footer when `booking.enabled`
6. **Documentation**: Add `docs/calcom-setup.md` with:
   - How to get embed snippet from Cal.com
   - How to configure `site.config.ts`
   - Prefill and UTM examples

### Phase 2 — Polish (Optional)

- Floating button component with configurable position/text
- Success redirect handling (Cal.com supports `?successRedirect=`)
- E2E test: assert Cal embed loads on `/book`

### Phase 3 — Advanced (Only if needed)

- API integration for custom dashboards
- Webhook endpoint stub for documentation

---

## 5. Technical Details

### Script Loading

Cal.com embed uses a queue pattern. Load once in Layout or in the component:

```html
<script is:inline>
  (function (C, A, L) {
    C[L] = C[L] || function () { (C[L].q = C[L].q || []).push(arguments); };
    var s = A.createElement('script');
    s.async = true;
    s.src = 'https://cal.com/embed/embed.js';
    var h = A.getElementsByTagName('script')[0];
    h.parentNode.insertBefore(s, h);
  })(window, document, 'Cal');
</script>
```

Then call `Cal("inline", { elementOrSelector: "#cal-embed", calLink: "username" })` after DOM ready.

### Astro Considerations

- Use `client:load` or `client:visible` only if needed for dynamic behavior (e.g. opening popup on click)
- For inline embed, script can run in `Layout` or a dedicated `CalEmbed.astro` with `is:inline` script
- Cal.com script is third-party; consider `rel="noopener"` if opening in new tab (N/A for embed)

### Self-Hosted Cal.com

If using self-hosted instance, use `https://cal.yourdomain.com/embed/embed.js` instead.

---

## 6. References

- [Cal.com Help — Adding embed](https://cal.com/help/embedding/adding-embed)
- [Cal.com Help — Embed Snippet Generator](https://cal.com/help/embedding/embed-snippet-generator)
- [Cal.com Help — Prefill booking form](https://cal.com/help/embedding/prefill-booking-form-embed)
- [Cal.com Docs — API v2](https://cal.com/docs) (for future API use)
- [Cal.com Docs — LLM index](https://cal.com/docs/llms.txt) (full doc discovery)

---

## 7. Checklist Before Merge

- [ ] `CalEmbed.astro` supports inline, popup, floating
- [ ] `site.config.ts` has optional `booking` config
- [ ] `/book` page works with placeholder calLink
- [ ] `docs/calcom-setup.md` exists
- [ ] No hardcoded credentials or API keys
- [ ] E2E test (optional) for embed presence
- [ ] README mentions Cal.com as optional booking solution
