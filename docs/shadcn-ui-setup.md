# shadcn-style UI Setup Guide

This document describes how shadcn-style components are set up and integrated into the Astro Tailwind Boilerplate.

## Overview

We use **pure Astro components** that follow shadcn/ui design principles: CSS variable theming, accessible markup, and Tailwind utilities. No React or Radix UI—ideal for static sites and zero JS by default.

## Components Available

### Core Components

- **Button** - Variants: default, secondary, destructive, outline, ghost, link. Sizes: sm, default, lg, icon
- **Input** - Form input with consistent styling and accessibility
- **Textarea** - Multi-line text input
- **Card** - Container with optional `header` and `footer` slots
- **Badge** - Status indicators with variants: default, secondary, destructive, outline

### Component Structure

Each component follows shadcn patterns:
- TypeScript interfaces for props
- `cn()` utility for conflict-free class merging (clsx + tailwind-merge)
- CSS custom properties for theming (light/dark)
- Accessibility built-in (focus-visible, ARIA)

## File Structure

```
src/
├── components/
│   └── ui/
│       ├── Badge.astro
│       ├── Button.astro
│       ├── Card.astro
│       ├── Input.astro
│       ├── Textarea.astro
│       └── index.ts          ← barrel export
├── lib/
│   └── utils.ts               ← cn() for class merging
└── styles/
    └── global.css             ← CSS variables
```

## Usage Examples

### Import (path alias)

```astro
---
import { Button, Card, Input, Textarea, Badge } from '@/components/ui';
---
```

### Basic Button

```astro
<Button variant="default" size="lg">Click me</Button>
```

### Button as Link

```astro
<Button as="a" href="/contact" variant="outline">Contact Us</Button>
```

### Form Input

```astro
<Input type="email" placeholder="your@email.com" required />
```

### Card with Slots

```astro
<Card>
  <div slot="header">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-sm text-muted-foreground">Optional description.</p>
  </div>
  <p>Main content here.</p>
  <div slot="footer" class="flex gap-2">
    <Button size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </div>
</Card>
```

## Styling and Theming

### CSS Custom Properties

The components use CSS custom properties for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

### Tailwind Configuration

The Tailwind config includes all necessary color variables and utilities:

```javascript
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  // ... more colors
}
```

## Responsive Design

All components are built with mobile-first responsive design:

- Use `sm:`, `md:`, `lg:`, and `xl:` breakpoints
- Components adapt to different screen sizes
- Touch-friendly interactions on mobile devices
- Consistent spacing across viewports

## Accessibility Features

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Semantic HTML structure

## Adding New Components

To add a new shadcn/ui component:

1. Create the component file in `src/components/ui/`
2. Follow the existing component pattern
3. Add TypeScript interfaces for props
4. Use consistent class naming
5. Include accessibility features
6. Export from `src/components/ui/index.ts`
7. Update this documentation

## Dependencies

Required for the UI component system:

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.5.0"
  }
}
```

## Utility: `cn()`

The `cn()` function in `src/lib/utils.ts` merges class names and resolves Tailwind conflicts:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Why it matters**: Without `tailwind-merge`, `cn('p-6', 'p-4')` would output both classes; the "winner" depends on CSS order. With `tailwind-merge`, `p-4` correctly overrides `p-6`.

## Best Practices (2026)

1. **Use `cn()` for class merging** — All UI components use it for base + variant + `className` prop
2. **Theme via CSS variables** — `--radius`, `--primary`, etc. in `global.css`; Tailwind maps them in `tailwind.config.mjs`
3. **Path aliases** — Use `@/components/ui` and `@/lib/utils` (configured in `tsconfig.json`)
4. **Accessibility** — Components include `focus-visible:ring-2`, ARIA support; add `aria-label` on icon-only buttons
5. **Dark mode** — Toggle `.dark` on `<html>`; variables in `global.css` switch automatically

## Troubleshooting

| Issue | Solution |
|------|----------|
| Class overrides not working | Ensure component uses `cn(baseClasses, className)` |
| Theme colors wrong | Check `:root` / `.dark` in `global.css` |
| Import path errors | Verify `tsconfig.json` has `"@/*": ["src/*"]` |
| Tailwind classes missing | Run `pnpm build`; content paths include `./src/**/*.{astro,...}` |

## Live Demo

Visit `/components` to see all UI components in the "Design System (shadcn-style)" section.
