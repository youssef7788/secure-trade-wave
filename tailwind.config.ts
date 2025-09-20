import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Maritime Theme Colors
        ocean: {
          deep: "hsl(var(--ocean-deep))",
          primary: "hsl(var(--ocean-primary))",
          secondary: "hsl(var(--ocean-secondary))",
          light: "hsl(var(--ocean-light))",
          mist: "hsl(var(--ocean-mist))",
        },
        maritime: {
          gold: "hsl(var(--maritime-gold))",
          "gold-light": "hsl(var(--maritime-gold-light))",
          "gold-dark": "hsl(var(--maritime-gold-dark))",
        },
        tech: {
          cyan: "hsl(var(--tech-cyan))",
          teal: "hsl(var(--tech-teal))",
        },
        secure: {
          green: "hsl(var(--secure-green))",
        },
        alert: {
          amber: "hsl(var(--alert-amber))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-ocean": "var(--gradient-ocean)",
        "gradient-maritime": "var(--gradient-maritime)",
        "gradient-secure": "var(--gradient-secure)",
        "gradient-gold": "var(--gradient-gold)",
        "encrypted-grid": "var(--encrypted-grid)",
      },
      backgroundSize: {
        "encrypted": "var(--encrypted-grid-size)",
      },
      boxShadow: {
        "ocean": "var(--shadow-ocean)",
        "secure": "var(--shadow-secure)",
        "gold": "var(--shadow-gold)",
      },
      transitionProperty: {
        "smooth": "var(--transition-smooth)",
        "wave": "var(--transition-wave)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "wave": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-10px) translateY(-2px)" },
          "50%": { transform: "translateX(10px) translateY(2px)" },
          "75%": { transform: "translateX(-5px) translateY(-1px)" },
        },
        "ship": {
          "0%": { transform: "translateX(-100px)" },
          "100%": { transform: "translateX(calc(100vw + 100px))" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "wave": "wave 4s ease-in-out infinite",
        "ship": "ship 20s linear infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
