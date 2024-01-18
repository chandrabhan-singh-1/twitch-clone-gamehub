import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  Icon: LucideIcon;
  isActive: boolean;
}
export const NavItem = ({ label, href, Icon, isActive }: NavItemProps) => {
  const { isExpanded } = useDashboardSidebar((state) => state);

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "w-full h-12",
        isExpanded ? "justify-start" : "justify-center",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon
            className={cn("h-4 w-4 text-sky-400", isExpanded ? "mr-2" : "mr-0")}
          />
          {isExpanded && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemsSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[40px] min-w-[40px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
