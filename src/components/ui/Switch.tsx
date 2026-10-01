"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Switch({
  checked,
  onChange,
  label,
  description,
}: SwitchProps) {
  return (
    <div className="flex items-center justify-between gap-3 sm:gap-6">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-label-md text-neutral sm:text-body-sm">
          {label}
        </span>
        {description && (
          <span className="text-caption text-text-secondary sm:text-body-sm">
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-10 shrink-0 rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
          checked
            ? "border-primary bg-primary"
            : "border-border bg-canvas-muted"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-surface shadow-float transition-[left] duration-200 motion-reduce:transition-none ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}