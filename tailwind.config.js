/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./goods.js",
        "./basket/index.html",
        "./basket/basket.js",
        "./favorites/index.html",
        "./favorites/favorites.js",
        "./profile/index.html",
        "./profile/profile.js",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["coffee"],
    },
}
