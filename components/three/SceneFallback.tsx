/**
 * Pure CSS/SVG animated rail line. Used on mobile, reduced-motion,
 * WebGL failure, and as the loading state for the R3F scene.
 * No WebGL, negligible cost.
 */
export default function SceneFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* warm depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,#3A332B_0%,#14110E_60%)]" />
      {/* perspective track drawn in SVG */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[70%] w-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="rail" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E7BE6A" />
            <stop offset="100%" stopColor="#C8962C" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* sleepers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 12;
          const y = 400 - t * 380;
          const spread = 260 * (1 - t) + 12;
          return (
            <line
              key={i}
              x1={400 - spread}
              x2={400 + spread}
              y1={y}
              y2={y}
              stroke="#3A332B"
              strokeWidth={(1 - t) * 6 + 1}
              opacity={0.7 - t * 0.5}
            />
          );
        })}
        {/* two rails converging */}
        <line x1="150" y1="400" x2="392" y2="20" stroke="url(#rail)" strokeWidth="3" />
        <line x1="650" y1="400" x2="408" y2="20" stroke="url(#rail)" strokeWidth="3" />
      </svg>
      {/* drifting glow */}
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-brass/20 blur-3xl" />
    </div>
  );
}
