/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#00008B",
        lightblue: "#0062d1",
        litedarkblue: "#0045c2",
        green: "#00E6C0",
        overley: "#00000012",
        grays: "#f7f6f5",
        purple: "#f0e9fd",
        text: "#000000c2",
        yellow: "#fff8c8",
        lighttext: "#0000007a",
        bord: "#00000026",
        footer: "#f7f6f5",
        footerboder: "#322744",
        bgsend: "#f7f6f5",
        background : "#f7f6f5",
        border: "#322744ad",
        bdr: "#0062d11a",
        outline:"#00000036 "
      },
    },
    letterSpacing: {
      tightest: "-.075em",
      tighter: "-.05em",
      tight: "-.025em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".5rem",
    },
    ringWidth: {
      '2': '0px',
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),


  ]
};
