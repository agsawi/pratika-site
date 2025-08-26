# Visual Configuration Examples

This document provides ready-to-use configuration examples for different types of projects. Copy and paste these configurations into your `src/config/visual-config.json` file, then run `npm run generate-css` to apply the changes.

## Table of Contents

1. [Corporate/Business](#corporatebusiness)
2. [E-commerce](#e-commerce)
3. [Creative Agency](#creative-agency)
4. [SaaS Application](#saas-application)
5. [Portfolio](#portfolio)
6. [Blog/Content Site](#blogcontent-site)
7. [Educational Platform](#educational-platform)
8. [Healthcare](#healthcare)
9. [Financial Services](#financial-services)
10. [Non-Profit Organization](#non-profit-organization)

## Usage Instructions

1. **Choose a Configuration**: Select the configuration that best matches your project type
2. **Copy the JSON**: Copy the entire JSON configuration
3. **Replace Your Config**: Paste it into your `src/config/visual-config.json` file
4. **Generate CSS**: Run `node scripts/generate-css-from-config.mjs` to apply changes
5. **Test Changes**: Run `npm run dev` with your development server
6. **Customize Further**: Modify individual values to match your specific brand requirements

## Corporate/Business

Professional and trustworthy design suitable for corporate websites, consulting firms, and business services.

**Key Features:**
- Deep blue primary for trust and professionalism
- Green secondary for growth and success
- Clean, readable typography
- Conservative spacing and rounded corners

```json
{
  "colors": {
    "brand": {
      "primary": "#1e40af",
      "secondary": "#059669",
      "accent": "#dc2626"
    },
    "ui": {
      "background": "#fafafa",
      "surface": "#ffffff",
      "text": "#1e293b",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#059669",
      "warning": "#d97706",
      "error": "#dc2626",
      "info": "#1e40af"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["Georgia", "Times New Roman", "serif"],
      "mono": ["Consolas", "Monaco", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## E-commerce

Optimized for online retail with colors that encourage action and highlight deals.

**Key Features:**
- Red primary for urgency and call-to-action buttons
- Green secondary for success states and growth
- Orange accent for highlights and promotions
- Conservative typography and subtle shadows

```json
{
  "colors": {
    "brand": {
      "primary": "#dc2626",
      "secondary": "#059669",
      "accent": "#f59e0b"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f9fafb",
      "text": "#111827",
      "textMuted": "#6b7280",
      "border": "#d1d5db",
      "success": "#059669",
      "warning": "#f59e0b",
      "error": "#dc2626",
      "info": "#3b82f6"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Roboto", "system-ui", "sans-serif"],
      "serif": ["Georgia", "serif"],
      "mono": ["Courier New", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Creative Agency

Bold and modern design for creative agencies, design studios, and professionals.

**Key Features:**
- Purple primary for creativity and innovation
- Pink secondary for energy and passion
- Cyan accent for highlights and modern tech feel
- Slightly rounded corners and more pronounced shadows

```json
{
  "colors": {
    "brand": {
      "primary": "#7c3aed",
      "secondary": "#ec4899",
      "accent": "#06b6d4"
    },
    "ui": {
      "background": "#fafafa",
      "surface": "#ffffff",
      "text": "#0f172a",
      "textMuted": "#475569",
      "border": "#cbd5e1",
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444",
      "info": "#06b6d4"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Poppins", "system-ui", "sans-serif"],
      "serif": ["Playfair Display", "Georgia", "serif"],
      "mono": ["JetBrains Mono", "monospace"],
      "display": ["Playfair Display", "serif"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.5rem",
      "6xl": "4rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.5rem",
    "md": "0.75rem",
    "lg": "1rem",
    "xl": "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 2px 4px 0 rgb(0 0 0 / 0.06)",
    "DEFAULT": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
    "md": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)",
    "lg": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)",
    "xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "2xl": "0 50px 100px -20px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.06)",
    "none": "none"
  }
}
```

## SaaS Application

Clean and professional design optimized for software applications and dashboards.

**Key Features:**
- Blue primary for trust and reliability
- Green secondary for positive actions
- Purple accent for premium features
- Minimal design tokens for clean, optimized dashboard interfaces

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",
      "secondary": "#10b981",
      "accent": "#8b5cf6"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f9fafb",
      "text": "#1f2937",
      "textMuted": "#6b7280",
      "border": "#e5e7eb",
      "success": "#059669",
      "warning": "#f59e0b",
      "error": "#dc2626",
      "info": "#3b82f6"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["ui-serif", "Georgia", "serif"],
      "mono": ["ui-monospace", "SFMono-Regular", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.375rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Portfolio

Elegant and minimal design to showcase creative work and personal branding.

**Key Features:**
- Dark gray primary for excellent readability
- Large base font size (18px) for comfortable reading
- Serif fonts for display and sophisticated appearance
- Generous spacing for content breathing room
- Minimal shadows and borders allow content to take center stage

```json
{
  "colors": {
    "brand": {
      "primary": "#0f172a",
      "secondary": "#64748b",
      "accent": "#f59e0b"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#0f172a",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444",
      "info": "#3b82f6"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Source Sans Pro", "system-ui", "sans-serif"],
      "serif": ["Source Serif Pro", "Georgia", "serif"],
      "mono": ["Source Code Pro", "monospace"],
      "display": ["Crimson Text", "serif"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1.125rem",
      "lg": "1.25rem",
      "xl": "1.375rem",
      "2xl": "1.625rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.25rem",
      "6xl": "4rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Blog/Content Site

Reader-friendly and approachable design optimized for content consumption and readability.

**Key Features:**
- Blue primary for trust and learning
- Green secondary for progress and achievement
- Orange accent for highlights and notifications
- Rounded corners for friendliness
- Readable fonts optimized for learning content

```json
{
  "colors": {
    "brand": {
      "primary": "#3b82f6",
      "secondary": "#10b981",
      "accent": "#f59e0b"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#1e293b",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#059669",
      "warning": "#d97706",
      "error": "#dc2626",
      "info": "#0369a1"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Open Sans", "system-ui", "sans-serif"],
      "serif": ["Merriweather", "Georgia", "serif"],
      "mono": ["Source Code Pro", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.5rem",
    "md": "0.75rem",
    "lg": "1rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Educational Platform

User-friendly and approachable design suitable for learning environments.

**Key Features:**
- Monochromatic colors for sophisticated, understated elegance
- Minimal design tokens focusing on content
- Serif font for sophisticated display
- Orange accent for subtle highlights
- Clean, uncluttered aesthetic

```json
{
  "colors": {
    "brand": {
      "primary": "#0f172a",
      "secondary": "#475569",
      "accent": "#f59e0b"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#0f172a",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#10b981",
      "warning": "#f59e0b",
      "error": "#ef4444",
      "info": "#3b82f6"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Inter", "system-ui", "sans-serif"],
      "serif": ["Crimson Text", "Georgia", "serif"],
      "mono": ["ui-monospace", "monospace"],
      "display": ["Crimson Text", "serif"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Healthcare

Calming and professional design suitable for healthcare and wellness websites.

**Key Features:**
- Blue primary for trust and learning
- Green secondary for progress and achievement
- Orange accent for highlights and notifications
- Rounded corners for friendliness
- Readable fonts optimized for learning content

```json
{
  "colors": {
    "brand": {
      "primary": "#0369a1",
      "secondary": "#059669",
      "accent": "#dc2626"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f8fafc",
      "text": "#1e293b",
      "textMuted": "#64748b",
      "border": "#e2e8f0",
      "success": "#059669",
      "warning": "#d97706",
      "error": "#dc2626",
      "info": "#0369a1"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["Source Sans Pro", "system-ui", "sans-serif"],
      "serif": ["Source Serif Pro", "Georgia", "serif"],
      "mono": ["ui-monospace", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.375rem",
    "md": "0.5rem",
    "lg": "0.75rem",
    "xl": "1rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Financial Services

Conservative and trustworthy design suitable for financial advisors, investment firms, and banks.

**Key Features:**
- Deep blue primary for trust and professionalism
- Green secondary for growth and success
- Red accent for urgent/critical information
- Professional typography suitable for financial content
- Clean, accessible design

```json
{
  "colors": {
    "brand": {
      "primary": "#1e40af",
      "secondary": "#059669",
      "accent": "#dc2626"
    },
    "ui": {
      "background": "#fafafa",
      "surface": "#ffffff",
      "text": "#1e293b",
      "textMuted": "#64748b",
      "border": "#d1d5db",
      "success": "#059669",
      "warning": "#d97706",
      "error": "#dc2626",
      "info": "#1e40af"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["IBM Plex Sans", "system-ui", "sans-serif"],
      "serif": ["IBM Plex Serif", "Georgia", "serif"],
      "mono": ["IBM Plex Mono", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px -rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Non-Profit Organization

Warm and approachable design that builds trust and encourages engagement.

**Key Features:**
- Warm, approachable design
- Friendly, rounded appearance
- Typography and spacing from one configuration
- Colors that encourage action and donation
- Orange accent for calls-to-action

```json
{
  "colors": {
    "brand": {
      "primary": "#059669",
      "secondary": "#f59e0b",
      "accent": "#dc2626"
    },
    "ui": {
      "background": "#ffffff",
      "surface": "#f9fafb",
      "text": "#111827",
      "textMuted": "#6b7280",
      "border": "#d1d5db",
      "success": "#059669",
      "warning": "#f59e0b",
      "error": "#dc2626",
      "info": "#3b82f6"
    }
  },
  "typography": {
    "fontFamilies": {
      "sans": ["system-ui", "sans-serif"],
      "serif": ["Georgia", "serif"],
      "mono": ["ui-monospace", "monospace"]
    },
    "scales": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem"
    }
  },
  "spacing": {
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem"
  },
  "borderRadius": {
    "none": "0",
    "sm": "0.125rem",
    "DEFAULT": "0.5rem",
    "md": "0.75rem",
    "lg": "1rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    "none": "none"
  }
}
```

## Next Steps

After applying a configuration:

1. **Run Accessibility Check**: `node scripts/generate-css-from-config.mjs --check-accessibility`
2. **Review Components**: Check how existing components look with new colors
3. **Test Both Themes**: Verify light and dark mode appearance
4. **Document Changes**: Keep track of customizations for your team
5. **Customize Further**: Adjust individual values to match your exact needs

## Need Help?

- **Accessibility Issues**: Run `node scripts/generate-css-from-config.mjs --check-accessibility` for detailed analysis
- **Color Problems**: The system provides automatic color suggestions
- **Build Errors**: Validate your JSON syntax and required fields
- **Theme Issues**: Check that dark theme variants are generated properly

For more detailed information, see the [Visual Customization Guide](./visual-customization-guide.md).