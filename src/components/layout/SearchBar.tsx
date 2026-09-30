"use client";

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative flex-1 lg:max-w-md">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-secondary"
        aria-hidden
      />
      <input
        type="search"
        placeholder="Buscar restaurantes, platos..."
        aria-label="Buscar"
        className="h-9 w-full rounded-[25px] bg-canvas-muted pr-4 pl-10 text-body-sm text-neutral transition-colors placeholder:text-placeholder hover:bg-border focus:ring-2 focus:ring-primary/20 focus:outline-none"
      />
    </div>
  );
}
