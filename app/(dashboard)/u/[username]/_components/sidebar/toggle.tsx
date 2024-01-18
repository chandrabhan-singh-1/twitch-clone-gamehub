"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useDashboardSidebar } from "@/store/use-dashboard-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export const Toggle = () => {
  const { isExpanded, collapse, expand } = useDashboardSidebar(
    (state) => state
  );

  const label = isExpanded ? "Collapse" : "Expand";

  return (
    <>
      {isExpanded ? (
        <div className="p-3 pl-6 mb-2 hidden lg:flex items-center w-full">
          <p className="font-semibold text-primary">Dashboard</p>
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
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button onClick={expand} variant={"ghost"} className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4 text-sky-400" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
