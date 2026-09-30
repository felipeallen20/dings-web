import { Star } from "lucide-react";

const STAR_CLASS = "size-4 shrink-0";
const STAR_GAP = "gap-0.5";

export function StarRating({
  rating,
  ratingCount,
}: {
  rating: number;
  ratingCount: number;
}) {
  const percentage = Math.min(100, Math.max(0, (rating / 5) * 100));
  const formattedCount =
    ratingCount >= 1000
      ? `${(ratingCount / 1000).toFixed(1).replace(".", ",")}K`
      : `${ratingCount}`;

  return (
    <div className="flex items-center gap-2">
      <span
        className="relative inline-flex"
        role="img"
        aria-label={`${rating.toFixed(1)} de 5 estrellas`}
      >
        <span className={`flex ${STAR_GAP} text-border-strong`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`${STAR_CLASS} fill-current`}
              aria-hidden
            />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${percentage}%` }}
          aria-hidden
        >
          <span className={`flex ${STAR_GAP} text-secondary`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={`${STAR_CLASS} fill-current`}
                aria-hidden
              />
            ))}
          </span>
        </span>
      </span>

      <span className="text-label-lg text-neutral tabular-nums">
        {rating.toFixed(1)}
      </span>
      <span className="text-label-md text-text-secondary tabular-nums">
        ({formattedCount}+)
      </span>
    </div>
  );
}