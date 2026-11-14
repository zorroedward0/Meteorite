interface PropsIcon {
  size?: number;
}

export function SearchIcon({ size = 16 }: PropsIcon) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="15.5"
        y1="15.5"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

}

export function SettingsIcon({ size = 16 }: PropsIcon) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="9"
        cy="7"
        r="2.6"
        fill="#0f172a"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="15"
        cy="16"
        r="2.6"
        fill="#0f172a"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );

}

export function ArrowsIcon({ size = 13 }: PropsIcon) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 4 L8 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 10.5 L8 14.5 L11.5 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 20 L16 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12.5 13.5 L16 9.5 L19.5 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

}

export function ExternalIcon({ size = 14 }: PropsIcon) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 4 H20 V10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4 L11 13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M18 14 V18.5 H5.5 V6 H10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

}

export function DoorIcon({ size = 16 }: PropsIcon) {

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 4 H19 V20 H14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12 H15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M11.5 8.5 L15 12 L11.5 15.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  
}
