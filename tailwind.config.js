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
        "xl-title": ["40px", { fontWeight: "bold" }],
        "lg-title": ["32px", { fontWeight: "bold" }],
        "md-title": ["24px", { fontWeight: "bold" }],
        "sm-title": ["21px"],
        "xs-title": ["18px"],
        "content-lg": ["20px"],
        "content-md": ["16px"],
        "content-sm": ["14px"],
        "content-ll": ["10px"],
        "comment-lg": ["16px"],
        "comment-md": ["14px"],
        "comment-sm": ["12px"],
      },
      fontFamily: {
        title: ["GoodNeighbors-Good-Neighbors-Bold"],
        batang: ["NanumSquareNeo"],
      },
      screens: {
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
