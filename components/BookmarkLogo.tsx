type Props = { className?: string; size?: "sm" | "md" | "lg" };

const sizes = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };

export default function BookmarkLogo({ className = "", size = "md" }: Props) {
  return (
    <svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="bookmarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path
        d="M12 8v48l20-12 20 12V8a4 4 0 00-4-4H16a4 4 0 00-4 4z"
        fill="url(#bookmarkGrad)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
