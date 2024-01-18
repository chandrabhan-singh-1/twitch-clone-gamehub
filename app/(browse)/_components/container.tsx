"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { isExpanded } = useSidebar((state) => state);

  return (
    <div className={cn("flex-1", isExpanded ? "ml-60" : "ml-[70px]")}>
      {children}
    </div>
  );
};
