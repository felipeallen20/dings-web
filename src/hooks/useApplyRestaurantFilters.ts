"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { RestaurantFilters } from "@/types/restaurant-filters";
import { serializeRestaurantFilters } from "@/services/restaurant-filters";

export function useApplyRestaurantFilters() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (next: RestaurantFilters) => {
      const query = serializeRestaurantFilters(next).toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router],
  );
}