export default function PlanetIcon({ size = 44 }: { size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      role="img" 
      aria-label="Meteorite Icon"
    >
      <defs>
        <linearGradient id="ring-icon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2b27e" />
          <stop offset="100%" stopColor="#e08e55" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="14" fill="#64748b" />
      <circle cx="25" cy="26" r="4" fill="#94a3b8" opacity="0.7" />
      <circle cx="34" cy="35" r="2.6" fill="#475569" />
      <ellipse 
        cx="30" 
        cy="33" 
        rx="24" 
        ry="7" 
        fill="none" 
        stroke="url(#ring-icon)" 
        strokeWidth="5" 
        strokeLinecap="round" 
        transform="rotate(-18 30 33)" 
      />
    </svg>
  );
}
