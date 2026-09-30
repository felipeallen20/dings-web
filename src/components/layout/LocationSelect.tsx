"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, Plus } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { getSavedLocations } from "@/services/locations";
import type { SavedLocation } from "@/types/location";

export function LocationSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  const [selected, setSelected] = useState<SavedLocation | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    void getSavedLocations().then((data) => {
      if (active) setLocations(data);
    });
    return () => {
      active = false;
    };
  }, [isOpen]);

  const triggerLabel = selected ? selected.label : "Ubicación";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-4 text-label-lg text-text-secondary transition-colors hover:border-border-strong hover:bg-canvas-muted"
      >
        <MapPin className="size-4 shrink-0 text-secondary" aria-hidden />
        <span className="max-w-32 truncate text-neutral">{triggerLabel}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-text-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-float">
          <ul role="listbox" className="max-h-80 overflow-y-auto">
            {locations.length === 0 && (
              <li className="px-4 py-3 text-body-sm text-text-secondary">
                No tenés ubicaciones guardadas.
              </li>
            )}
            {locations.map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected?.id === location.id}
                  onClick={() => {
                    setSelected(location);
                    setIsOpen(false);
                  }}
                  className="flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-canvas-muted"
                >
                  <span className="text-label-lg text-neutral">
                    {location.label}
                  </span>
                  <span className="text-label-md text-text-secondary">
                    {location.address}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-1 border-t border-border pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-label-lg text-neutral transition-colors hover:bg-canvas-muted"
            >
              <Plus className="size-4 shrink-0" aria-hidden />
              Agregar ubicación
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
