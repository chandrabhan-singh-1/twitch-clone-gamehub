"use client";

import { cn } from "@/lib/utils";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { isExpanded, collapse, expand } = useDashboardSidebar(
    (state) => state
  );

  useEffect(() => {
    if (matches) {
      collapse();
    } else {
      expand();
    }
  }, [matches, collapse, expand]);

  return (
    <div
      className={cn("flex-1", isExpanded ? "ml-[70px] lg:ml-60" : "ml-[70px]")}
    >
      {children}
    </div>
  );
};
