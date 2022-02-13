module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                turquoise: "#00d0f1",
            },
            width: {
                33: "33%",
                50: "50%",
                75: "75%",
                "25px": "25px",
            },
            maxWidth: {
                1600: "1600px",
            },
            height: {
                150: "150px",
                225: "225px",
                "25px": "25px",
            },
        },
    },
    plugins: [],
};
