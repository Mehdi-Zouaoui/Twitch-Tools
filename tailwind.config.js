module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "90vh": "90vh",
      },
      colors: {
        dark: "#231f20",
        gold: "#F5CB5C",
      },
    },
  },
  plugins: [],
};
