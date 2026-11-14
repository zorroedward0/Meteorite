const COLORS = [
  "#e08e55",
  "#6bb4d8",
  "#94a3b8",
  "#f2b27e",
  "#7dd3fc",
  "#cbd5e1",
];

export default function MeteoriteIcon({ seed }: { seed: string }) {

  const sum = [...seed].reduce(
    (total, letra) => total + letra.charCodeAt(0),
    0,
  );
  const color = COLORS[sum % COLORS.length];

  return (

    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3 L10 10"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6.5 2 L12 7.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="15.5" cy="15.5" r="6.4" fill={color} />
      <circle cx="13.4" cy="13.6" r="1.5" fill="#0f172a" opacity="0.35" />
      <circle cx="17.6" cy="16.9" r="1.1" fill="#0f172a" opacity="0.35" />
    </svg>
    
  );

}
