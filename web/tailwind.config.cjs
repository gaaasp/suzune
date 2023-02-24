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
            "quaternary-label": "var(--quaternary-label)",
            elevated: {
                DEFAULT: "var(--elevated)",
                translucid: "var(--elevated-translucid)",
            },
            separator: "var(--separator)",
            "opaque-separator": "var(--opaque-separator)",
            highlight: {
                DEFAULT: "var(--highlight)",
                dark: "var(--highlight-dark)",
                light: "var(--highlight-light)",
            },
            red: {
                DEFAULT: "var(--red)",
                dark: "var(--red-dark)",
                light: "var(--red-light)",
            },
        },
        fontFamily: {
            sans: ["Inter"],
        }
    },
  },
  plugins: [],
}
