/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
        colors: {
            background: "var(--background)",
            foreground: "var(--foreground)",
        },
    },
  },
  plugins: [],
}
