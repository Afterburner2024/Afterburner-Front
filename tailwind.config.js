module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind가 적용될 파일 경로
  ],
  theme: {
    extend: {
      colors: {
        mainBg: "#2D2A2A",
        headerFooter: "#595959",
        highlightBlue: "#3C63EA",
        highlightPink: "#EA3C63",
        fontBlack: "#0D0D0D",
        fontWhite: "#FFFFFF",
      },
      fontSize: {
        "lg-title": ["32px", { fontWeight: "bold" }],
        "md-title": ["24px", { fontWeight: "bold" }],
        "sm-title": ["21px"],
        content: ["16px"],
        comment: ["14px"],
      },
    },
  },
  plugins: [],
};
