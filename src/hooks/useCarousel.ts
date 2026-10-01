import { useCallback, useRef } from "react";

const EDGE_TOLERANCE = 4;

export function useCarousel<T extends HTMLElement>() {
  const trackRef = useRef<T>(null);

  const scrollPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft <= EDGE_TOLERANCE) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    }
  }, []);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft >= maxScroll - EDGE_TOLERANCE) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    }
  }, []);

  return { trackRef, scrollPrev, scrollNext };
}
