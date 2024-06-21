import { cn } from "@/lib/utils";
import { AvatarFallback, AvatarImage, Avatar as AvatarRoot } from "./ui/avatar";

type AvatarProps = {
  fallback?: string;
  src?: string | null;
  className?: string;
  isOnline?: boolean;
};

export function Avatar({ fallback, className, src, isOnline }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative h-12 w-12 after:absolute after:bottom-0 after:right-0 after:h-[0.875em] after:w-[0.875em] after:scale-0 after:rounded-full after:border-2 after:border-background after:bg-primary after:transition after:content-['']",
        {
          "after:scale-100": isOnline,
        },
        className,
      )}
    >
      <AvatarRoot className="h-full w-full">
        <AvatarImage src={src ?? undefined} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
