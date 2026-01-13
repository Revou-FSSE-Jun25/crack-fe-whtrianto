/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Gradient utilities
    'bg-gradient-to-r',
    'bg-gradient-to-br',
    'bg-gradient-to-b',
    // Gradient colors for navbar and icons - using patterns to ensure all combinations
    {
      pattern: /^(from|to)-(blue|cyan|rose|pink|sky|indigo|green|emerald|yellow|amber|orange|red|purple)-(400|500|600|700)$/,
    },
    {
      pattern: /^bg-gradient-to-(r|br|b)$/,
    },
    // Specific combinations used in navbar
    'bg-gradient-to-r from-blue-600 to-cyan-600',
    'bg-gradient-to-r from-rose-500 to-pink-500',
    'bg-gradient-to-r from-green-600 to-emerald-600',
    // Specific combinations used in Home.tsx icons
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-blue-600 to-cyan-600',
    'bg-gradient-to-br from-green-500 to-emerald-500',
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-orange-500 to-red-500',
    'bg-gradient-to-br from-indigo-500 to-blue-500',
    'bg-gradient-to-br from-amber-500 to-yellow-500',
    'bg-gradient-to-br from-yellow-500 to-amber-500',
    // Other gradient colors used in app
    'from-yellow-400',
    'to-fuchsia-400',
    'from-blue-500',
    'to-cyan-500',
    'from-amber-500',
    'to-yellow-500',
    'from-purple-500',
    'to-pink-500',
    'from-green-500',
    'to-emerald-500',
    'from-orange-500',
    'to-red-500',
    'from-indigo-500',
    'to-blue-500',
    'from-sky-600',
    'to-indigo-600',
    'from-sky-700',
    'to-indigo-700',
    'from-blue-700',
    'to-cyan-700',
    // Text utilities
    'bg-clip-text',
    'text-transparent',
    'text-white',
    // Background colors
    'bg-sky-600',
    'hover:bg-sky-700',
    // Shadow utilities
    'shadow-lg',
    'shadow-xl',
    'shadow-blue-500/30',
    'shadow-rose-500/30',
    'hover:shadow-blue-500/40',
    'hover:shadow-rose-500/40',
    'hover:shadow-xl',
    // Focus ring utilities
    {
      pattern: /^focus:ring-(blue|cyan|rose|pink|sky|indigo|green|emerald|yellow|amber|orange|red|purple)-(400|500|600)\/(30|50)$/,
    },
    'focus:ring-blue-500',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-slate-900',
    // Color utilities with opacity - background
    {
      pattern: /^bg-(blue|cyan|rose|pink|sky|indigo|green|emerald|yellow|amber|orange|red|purple|slate|white)-(400|500|600|700|800|900)\/(10|20|30|40|50)$/,
    },
    // Color utilities with opacity - text
    {
      pattern: /^text-(blue|cyan|rose|pink|sky|indigo|green|emerald|yellow|amber|orange|red|purple|slate|white)-(300|400)$/,
    },
    // Specific color classes used in Home.tsx
    'bg-blue-500/10',
    'bg-blue-500/20',
    'bg-purple-500/10',
    'bg-purple-500/20',
    'bg-amber-500/10',
    'bg-cyan-500/10',
    'bg-green-500/20',
    'text-blue-300',
    'text-blue-400',
    'text-purple-300',
    'text-purple-400',
    'text-amber-400',
    'text-cyan-400',
    'text-green-400',
    // Border colors with opacity
    {
      pattern: /^border-(blue|cyan|rose|pink|sky|indigo|green|emerald|yellow|amber|orange|red|purple|slate|white)-(400|500)\/(10|20|30)$/,
    },
    'border-red-400/30',
    'border-white/10',
    'border-white/20',
    'border-white/30',
  ],
};

