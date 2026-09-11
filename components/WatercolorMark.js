export default function WatercolorMark({ className = "" }) {
  return (
    <svg
      viewBox="0 0 110 46"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <path
        d="M4 26c18-9 31-13 50-10 18 3 29 10 52 2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity=".7"
      />
      <path d="M23 18c-5-8-10-9-14-8 2 6 7 10 14 8Z" fill="currentColor" opacity=".28" />
      <path d="M33 15c-1-8 3-12 8-14 2 7-1 12-8 14Z" fill="currentColor" opacity=".2" />
      <path d="M76 18c4-8 9-10 15-9-2 7-7 10-15 9Z" fill="currentColor" opacity=".24" />
      <circle cx="55" cy="17" r="2.2" fill="currentColor" opacity=".45" />
    </svg>
  );
}
