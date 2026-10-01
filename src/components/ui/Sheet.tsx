"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Sheet({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}: SheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4 ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Cerrar"
        onClick={onClose}
        className={`absolute inset-0 bg-inverse-surface/50 transition-opacity duration-300 motion-reduce:transition-none ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-2xl bg-surface shadow-float outline-none transition-all duration-300 ease-out motion-reduce:transition-none sm:rounded-2xl ${
          isOpen
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-full opacity-0 sm:translate-y-0 sm:scale-95"
        }`}
      >
        <header className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
            <h2 className="text-title-xs text-neutral sm:text-headline-md">
              {title}
            </h2>
            {description && (
              <p className="text-caption text-text-secondary sm:text-body-md">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Cerrar"
            className="-mt-1 -mr-1 shrink-0 rounded-full p-1.5 text-text-secondary transition-colors hover:bg-canvas-muted hover:text-neutral focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:p-2"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-border bg-surface px-4 py-3 sm:px-6 sm:py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}