import { useEffect, useState } from "react";

// Static Cloud Component
const Cloud = ({ top, size, duration, opacity, delay }: { top: string; size: number; duration: number; opacity: number; delay: number }) => {
  const style: React.CSSProperties = {
    top,
    opacity,
    animationDuration: `${duration}s`,
    animationDelay: `-${delay}s`,
    transform: `scale(${size})`,
    position: 'absolute',
    left: 0,
  };

  return (
    <div className="animate-cloud absolute pointer-events-none text-white left-[-200px]" style={style}>
      <svg width="180" height="100" viewBox="0 0 180 100" fill="currentColor">
        <circle cx="58" cy="50" r="28" />
        <circle cx="86" cy="35" r="30" />
        <circle cx="125" cy="40" r="33" />
        <circle cx="145" cy="50" r="25" />
        <circle cx="95" cy="60" r="30" />
      </svg>
    </div>
  );
};

export default function Background() {
  const [paths, setPaths] = useState<{ id: number; d: string; duration: number }[]>([]);

  // Calculate paths on resize only - NO animation loop
  useEffect(() => {
    const calculatePaths = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const flightPaths = [
        { baseY: height * 0.32, curve: 110, duration: 25 },
        { baseY: height * 0.46, curve: 90, duration: 30 },
        { baseY: height * 0.6, curve: 70, duration: 28 },
      ];

      const newPaths = flightPaths.map((path, index) => {
        const start = { x: -200, y: path.baseY };
        // Control point logic from previous canvas code
        const control = { x: width * 0.52, y: path.baseY - path.curve };
        const end = { x: width + 200, y: path.baseY + 18 };

        // SVG Quadratic curve command: M startX startY Q controlX controlY endX endY
        const d = `M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`;
        return { id: index, d, duration: path.duration };
      });

      setPaths(newPaths);
    };

    calculatePaths();
    window.addEventListener("resize", calculatePaths);
    return () => window.removeEventListener("resize", calculatePaths);
  }, []);

  // Generate static clouds only once
  const [clouds] = useState(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 55}%`,
      size: 0.6 + Math.random() * 0.9,
      duration: 30 + Math.random() * 20, // Slower, relaxed clouds
      opacity: 0.55 + Math.random() * 0.25,
      delay: Math.random() * 50,
    }));
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* CSS Gradient Background - Zero JS Cost */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300" />

      {/* Sun Gradient - CSS */}
      <div
        className="absolute rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.9) 0%, rgba(254, 240, 138, 0.35) 35%, rgba(254, 240, 138, 0) 70%)',
          top: '18%',
          left: '78%',
          transform: 'translate(-50%, -50%)',
          width: '100vh',
          height: '100vh',
        }}
      />

      {/* Horizon Gradient - CSS */}
      <div
        className="absolute bottom-0 w-full h-[45%]"
        style={{
          background: 'linear-gradient(to bottom, rgba(14, 116, 144, 0.25) 0%, rgba(30, 64, 175, 0.2) 60%, rgba(30, 64, 175, 0.4) 100%)'
        }}
      />

      {/* CSS Animated Clouds */}
      {clouds.map(cloud => (
        <Cloud key={cloud.id} {...cloud} />
      ))}

      {/* SVG Flight Paths - Zero JS Animation Loop */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {paths.map((path) => (
          <g key={path.id}>
            {/* The dashed path line */}
            <path
              d={path.d}
              fill="none"
              stroke="rgba(15, 118, 110, 0.35)"
              strokeWidth="1.6"
              strokeDasharray="14 9"
            />
            {/* The Plane */}
            <g>
              {/* Rotate auto calculates the tangent! */}
              <animateMotion
                dur={`${path.duration}s`}
                repeatCount="indefinite"
                path={path.d}
                rotate="auto"
              />
              {/* Plane Shape (centered at 0,0) */}
              <g transform="rotate(90) scale(0.6)">
                {/* Simple Plane SVG Shape */}
                <path fill="rgba(14, 116, 144, 0.9)" d="M0,-12 L5,6 L0,3 L-5,6 Z" />
                <rect fill="rgba(14, 116, 144, 0.65)" x="-6" y="2" width="12" height="3" rx="1" />
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
