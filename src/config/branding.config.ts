/**
 * Branding configuration for rapid theme customization.
 * These tokens are the source of truth for the design system.
 */

export const brandingConfig = {
    colors: {
        // Primary brand colors (base for primary, secondary, accent)
        primary: {
            hue: 221,
            saturation: 83,
            lightness: 53, // Blue 600 equivalent
        },
        secondary: {
            hue: 210,
            saturation: 40,
            lightness: 96,
        },
        accent: {
            hue: 210,
            saturation: 40,
            lightness: 96,
        },
        destructive: {
            hue: 0,
            saturation: 84,
            lightness: 60,
        },
    },
    typography: {
        fontSans: "'Inter', system-ui, sans-serif",
        fontHeading: "'Inter', system-ui, sans-serif",
    },
    layout: {
        radius: "0.5rem",
    }
};

export default brandingConfig;
