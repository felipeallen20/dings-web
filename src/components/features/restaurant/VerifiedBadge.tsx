export function VerifiedBadge({ label = "Verificado" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas-muted py-1 pr-3 pl-1">
      <span className="flex size-5 items-center justify-center rounded-full bg-tertiary text-white">
        <svg
          viewBox="0 0 20 20"
          className="size-3.5"
          fill="none"
          aria-hidden
          focusable="false"
        >
          <path
            d="M5 10.5l3.2 3.2L15 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-label-md text-tertiary-strong">{label}</span>
    </span>
  );
}