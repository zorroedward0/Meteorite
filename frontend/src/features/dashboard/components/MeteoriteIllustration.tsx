export default function MeteoriteIllustration() {

  return (
    <svg
      viewBox="0 0 220 150"
      className="illustration"
      role="img"
      aria-label="Falling meteorite"
    >
      <defs>
        <linearGradient id="meteorite-trail" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e08e55" stopOpacity="0" />
          <stop offset="100%" stopColor="#e08e55" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M20 16 L98 94"
        stroke="url(#meteorite-trail)"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M44 8 L108 72"
        stroke="#64748b"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M12 46 L72 106"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <circle cx="142" cy="94" r="34" fill="#e08e55" />
      <circle
        cx="142"
        cy="94"
        r="34"
        fill="none"
        stroke="#0f172a"
        strokeWidth="3"
        opacity="0.3"
      />
      <circle cx="131" cy="86" r="6" fill="#0f172a" opacity="0.28" />
      <circle cx="151" cy="102" r="4" fill="#0f172a" opacity="0.28" />
      <circle cx="152" cy="82" r="2.6" fill="#0f172a" opacity="0.28" />
      <circle cx="54" cy="120" r="2.4" fill="#f8fafc" opacity="0.8" />
      <circle cx="198" cy="36" r="2" fill="#f8fafc" opacity="0.7" />
      <circle cx="182" cy="126" r="1.8" fill="#6bb4d8" opacity="0.8" />
      <circle cx="96" cy="128" r="1.6" fill="#f2b27e" opacity="0.8" />
    </svg>
  );
  
}
