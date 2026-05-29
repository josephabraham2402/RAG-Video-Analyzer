/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkBg: "#0b0c16",       // Main background deep space black
          cardBg: "#111322",       // Slightly lighter card background
          panelBg: "#131526",      // Main panel background
          border: "#1f2238",       // Subtle border color
          mutedText: "#8e92b2",    // Premium cool gray description text
          activePurple: "#7c3aed", // Video A / primary accents
          activeTeal: "#0d9488",   // Video B / success accents
          glowPurple: "rgba(124, 58, 237, 0.15)",
          glowTeal: "rgba(13, 148, 136, 0.15)",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        'pulse-glow-purple': 'pulseGlowPurple 3s infinite alternate',
        'pulse-glow-teal': 'pulseGlowTeal 3s infinite alternate',
        'stream-dots': 'streamDots 1.4s infinite both',
      },
      keyframes: {
        pulseGlowPurple: {
          '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.2), inset 0 0 5px rgba(124, 58, 237, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.6), inset 0 0 10px rgba(124, 58, 237, 0.3)' }
        },
        pulseGlowTeal: {
          '0%': { boxShadow: '0 0 5px rgba(13, 148, 136, 0.2), inset 0 0 5px rgba(13, 148, 136, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(13, 148, 136, 0.6), inset 0 0 10px rgba(13, 148, 136, 0.3)' }
        },
        streamDots: {
          '0%, 80%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '40%': { opacity: '1', transform: 'scale(1.2)' }
        }
      }
    },
  },
  plugins: [],
}
