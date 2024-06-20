import { cn } from "@/lib/utils";

type CircleProgressProps = {
  className?: string;
  value?: number;
  strokeWidth?: number;
  variant?: "determinate" | "indeterminate";
};

const SIZE = 44;

export function CircleProgress({
  className,
  value = 1,
  strokeWidth = 3.6,
  variant,
}: CircleProgressProps) {
  if (variant === "indeterminate") value = 20;

  const radius = (SIZE - strokeWidth) / 2;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = ((100 - value) / 100) * (Math.PI * (radius * 2));

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuemin={0}
    >
      <svg
        className={cn("-rotate-90", {
          "animate-rotate": variant === "indeterminate",
        })}
        width="1em"
        height="1em"
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <circle
          fill="none"
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - strokeWidth) / 2}
          strokeWidth={strokeWidth}
          className="stroke-muted/40"
        ></circle>
        <circle
          fill="none"
          strokeLinecap="round"
          strokeDasharray={dashArray + "px"}
          strokeDashoffset={dashOffset}
          cx={SIZE}
          cy={SIZE}
          stroke="currentColor"
          r={(SIZE - strokeWidth) / 2}
          strokeWidth={strokeWidth}
          className="transition-all"
        ></circle>
      </svg>
      <span className="sr-only">
        {variant === "determinate" ? `${value}%` : "Загрузка..."}
      </span>
    </div>
  );
}
