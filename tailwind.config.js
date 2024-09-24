module.exports = {
  important: true,
  content: ["./app/javascript/**/*.{js,jsx}", "./app/views/**/*.html.erb"],
  theme: {
    extend: {
      colors: {
        "bb-purple": "#5469D4",
        "bb-env": "#F1F5F9",
        "bb-border": "#E4E4E7",
        "bb-gray-700": "#37415",
        "bb-gray-600": "#4B5563",
        "bb-red": "#F56565",
        "bb-green": "#31C48D",
        "bb-yellow": "#F6B100",
        "nitro-gray-800": "#1F2937",
        peach: "#F4D1AE",
        charcoal: "#3D405B",
        softGreen: "#81B29A",
        vibrantRed: "#FF595E",
        brightYellow: "#FFCA3A",
        lightBlue: "#56CCF2",
        deepBlue: "#2F80ED",
        softPurple: "#D4A5FF",
        oceanBlue: "#0077B6",
        forestGreen: "#228B22",
        warmGray: "#B5A99E",
        midnight: "#2C3E50",
      },
      boxShadow: {
        "custom-box-shadow": "10px 10px 5px 200px rgba(0,0,0,1)",
      },
    },
  },
};
