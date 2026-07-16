export default function FlagIcon({ country, className = "" }) {
  if (country === "VE") {
    return (
      <svg
        viewBox="0 0 30 20"
        aria-label="Venezuela"
        role="img"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <rect width="30" height="20" fill="#cf142b" />
        <rect width="30" height="13.33" fill="#00247d" />
        <rect width="30" height="6.66" fill="#fcd116" />
        <g fill="#ffffff">
          <circle cx="10.5" cy="11.5" r="0.5" />
          <circle cx="12.5" cy="10.7" r="0.5" />
          <circle cx="14.5" cy="10.3" r="0.5" />
          <circle cx="16.5" cy="10.3" r="0.5" />
          <circle cx="18.5" cy="10.7" r="0.5" />
          <circle cx="20.5" cy="11.5" r="0.5" />
          <circle cx="15" cy="9.5" r="0.5" />
          <circle cx="13" cy="9.7" r="0.5" />
        </g>
      </svg>
    );
  }
  if (country === "ES") {
    return (
      <svg
        viewBox="0 0 30 20"
        aria-label="España"
        role="img"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <rect width="30" height="20" fill="#c60b1e" />
        <rect y="5" width="30" height="10" fill="#ffc400" />
      </svg>
    );
  }
  return null;
}
