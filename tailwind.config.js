/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#0059ff",
          90: "#196AFF",
          80: "#337AFF",
          70: "#4C8BFF",
          60: "#669BFF",
          50: "#7FACFF",
          40: "#99BDFF",
          30: "#B2CDFF",
          20: "#CCDEFF",
          10: "#E5EEFF",
          5: "#F5F8FF",
        },
        grayscale: {
          100: "#030303",
          90: "#1A1A1A",
          80: "#333333",
          70: "#4D4D4D",
          60: "#666666",
          50: "#808080",
          40: "#999999",
          30: "#B3B3B3",
          20: "#CCCCCC",
          10: "#E6E6E6",
          5: "#F3F3F3",
        },
        red: "#FF0000",
        green: "#33E95B",
      },
      boxShadow: {
        "1dp": "0px 1px 2px 0px #00000030",
        "2dp": "0px 2px 4px 0px #0000001A",
        "4dp": "0px 4px 8px 0px #00000030",
        "8dp": "0px 8px 16px 0px #00000030",
        "16dp": "0px 16px 32px 0px #00000030",
        "24dp": "0px 24px 32px 0px #00000030",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
