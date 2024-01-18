import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-rose-500 text-center text-[10px] p--[1px] px-1.5 rounded-md uppercase border border-background font-semibold tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
};
