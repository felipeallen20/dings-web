import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({
  title,
  description,
  action,
  children,
  className,
}: CardProps) {
  const hasHeader = Boolean(title || description || action);

  return (
    <section
      className={`flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:gap-4 sm:p-6 ${className ?? ""}`}
    >
      {hasHeader && (
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
            {title && (
              <h2 className="text-title-sm text-neutral sm:text-headline-md">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-caption text-text-secondary sm:text-body-md">
                {description}
              </p>
            )}
          </div>

          {action && (
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {action}
            </div>
          )}
        </div>
      )}

      {children}
    </section>
  );
}