"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { isExpanded, expand, collapse } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      collapse();
    } else {
      expand();
    }
  }, [matches, expand, collapse]);

  // Solution for Hydration Error in sidebar👇 - It's different from mounting issue

  /**
  {
    const {[isClient, setIsClient] = useState(false)}; 

    useEffect(() => {
      setIsClient(true);
    }, []);
  }
  */

  // or

  const isClient = useIsClient();

  if (!isClient) {
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-20"
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-20",
        isExpanded ? "w-[70px] lg:w-60" : "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
