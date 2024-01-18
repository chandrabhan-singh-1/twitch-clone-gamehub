"use client";

import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isExpanded } = useDashboardSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full bg-background border border-r border-[#2D2E35] z-20",
        isExpanded ? "w-[70px] lg:w-60" : "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
