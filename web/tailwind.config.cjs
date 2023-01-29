/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
        colors: {
            base: "var(--base)",
            label: "var(--label)",
            "secondary-label": "var(--secondary-label)",
            "tertiary-label": "var(--tertiary-label)",
            elevated: "var(--elevated)",
            separator: "var(--separator)",
            "opaque-separator": "var(--opaque-separator)",
            highlight: {
                DEFAULT: "var(--highlight)",
                dark: "var(--highlight-dark)",
                light: "var(--highlight-light)",
            },
        },
    },
  },
  plugins: [],
}
