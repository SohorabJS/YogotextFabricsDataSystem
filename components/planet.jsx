const planets = Array.from({ length: 40 }).map((_, i) => ({
  angle: (360 / 40) * i,
  size: Math.random() * 1.2 + 0.8, // 0.8px – 2px
  color: [
    "bg-cyan-300",
    "bg-purple-300",
    "bg-emerald-300",
    "bg-amber-300",
    "bg-blue-300",
    "bg-pink-300",
    "bg-indigo-300",
  ][i % 7],
  glow: [
    "rgba(103,232,249,0.6)",
    "rgba(196,181,253,0.6)",
    "rgba(110,231,183,0.6)",
    "rgba(252,211,77,0.6)",
    "rgba(147,197,253,0.6)",
    "rgba(249,168,212,0.6)",
    "rgba(165,180,252,0.6)",
  ][i % 7],
}));