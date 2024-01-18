"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { isExpanded, expand, collapse } = useSidebar((state) => state);

  const label = isExpanded ? "Collapse" : "Expand";

  return (
    <div>
      {isExpanded ? (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For You</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={collapse}
              variant={"ghost"}
              className="h-auto p-2 ml-auto"
            >
              <ArrowLeftFromLine className="h-4 w-4 text-sky-400" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint side="right" label={label} asChild>
            <Button onClick={expand} variant={"ghost"} className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4 text-sky-400" />
            </Button>
          </Hint>
        </div>
      )}
    </div>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-3 hidden lg:flex items-center jusitfy-between w-full">
      <Skeleton className="w-20 h-6" />
      <Skeleton className="h-6 w-6 ml-auto" />
    </div>
  );
};
