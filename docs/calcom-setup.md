---
title: Cal.com Setup
description: Configure Cal.com booking integration for your site
---

# Cal.com Setup

This guide explains how to enable and configure Cal.com scheduling on your site. Cal.com is an open-source scheduling platform — ideal for professionals and businesses who want to offer booking without building custom infrastructure.

## Prerequisites

1. A [Cal.com](https://cal.com) account (free tier available)
2. At least one event type created in your Cal.com dashboard

## Quick Start

### 1. Get Your Cal.com Link

In Cal.com, go to **Event Types** → select your event → **Embed** tab. Use the Embed Snippet Generator to get your link. It will look like:

- `yourusername` — your profile (all event types)
- `yourusername/30min` — a specific event type

### 2. Configure `site.config.ts`

Add the `booking` block to your site config:

```ts
export const siteConfig: SiteConfig = {
  // ... existing config
  booking: {
    enabled: true,
    calUsername: 'yourusername',           // or 'yourusername/30min'
    defaultEventType: '30min',             // optional
    floatingButton: true,                  // show floating "Book" button
    embedBaseUrl: 'https://cal.com',      // use for self-hosted Cal.com
  },
};
```

### 3. Add the Booking Page

The `/book` page is included in this boilerplate. When `booking.enabled` is `true`:

- **Header** shows a "Book a call" nav link
- **Footer** shows a "Book a call" link
- **Floating button** appears (if `floatingButton: true`) on all pages

## Embed Modes

Use the `CalEmbed` component in your pages:

### Inline (default)

Shows the full calendar inline on the page:

```astro
---
import CalEmbed from '../components/CalEmbed.astro';
---

<CalEmbed mode="inline" calLink="yourusername" elementId="cal-booking" />
```

### Popup

Opens the booking modal when a button is clicked:

```astro
<CalEmbed mode="popup" calLink="yourusername" popupButtonLabel="Schedule a call" />
```

### Floating Button

Adds a persistent floating button (typically bottom-right). Enable via `site.config.ts` with `floatingButton: true`, or render manually:

```astro
<CalEmbed mode="floatingButton" calLink="yourusername" />
```

## Prefill & UTM Tracking

### Prefill Form Fields

Pass user data to prefill the booking form (e.g. after a contact form or login):

```astro
<CalEmbed
  mode="inline"
  calLink="yourusername"
  config={{
    name: "Jane Doe",
    email: "jane@example.com",
    "metadata[source]": "website",
  }}
/>
```

### Query Parameter Forwarding

To auto-forward URL query params (e.g. `?name=John&email=john@example.com`) to the embed, add this script after the Cal embed loads:

```html
<script>
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;
</script>
```

Then a URL like `https://yoursite.com/book?name=John&email=john@example.com` will prefill the form.

### UTM Parameters

UTM params (`utm_source`, `utm_medium`, etc.) are useful for attribution. With `forwardQueryParams` enabled, they pass through automatically. Or add them to the `config` object:

```ts
config: {
  "metadata[utm_source]": "google",
  "metadata[utm_medium]": "cpc",
}
```

## Self-Hosted Cal.com

If you run your own Cal.com instance (e.g. `https://cal.yourdomain.com`):

```ts
booking: {
  enabled: true,
  calUsername: 'yourusername',
  embedBaseUrl: 'https://cal.yourdomain.com',
}
```

The embed script will load from `https://cal.yourdomain.com/embed/embed.js`.

## Customisation

- **Theme & layout**: Cal.com supports CSS variables. See [their Tailwind preset](https://github.com/calcom/cal.com/blob/main/packages/config/tailwind-preset.js) for options.
- **Success redirect**: Configure in Cal.com event type settings (Redirect after booking).
- **Multiple event types**: Use different `calLink` values per page, e.g. `yourusername/consultation` vs `yourusername/30min`.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Embed doesn't load | Check browser console. Ensure `calUsername` is correct and Cal.com script loads (no adblock). |
| "Cal is not defined" | Script loads async. The component waits for `window.Cal` — if it still fails, check `embedBaseUrl`. |
| Prefill not working | Verify `config` keys match Cal.com's prefill fields. See [Prefill docs](https://cal.com/help/embedding/prefill-booking-form-embed). |
| Floating button overlaps content | Cal.com controls position. Adjust in Embed Snippet Generator or via custom CSS. |

## References

- [Cal.com Help — Adding embed](https://cal.com/help/embedding/adding-embed)
- [Cal.com Help — Embed Snippet Generator](https://cal.com/help/embedding/embed-snippet-generator)
- [Cal.com Help — Prefill booking form](https://cal.com/help/embedding/prefill-booking-form-embed)
- [Cal.com Docs](https://cal.com/docs) — API and developer docs
