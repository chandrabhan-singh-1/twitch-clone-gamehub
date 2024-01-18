"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/store/use-chat-sidebar";

export const ChatToggle = () => {
  const { isExpanded, expand, collapse } = useChatSidebar((state) => state);

  const Icon = isExpanded ? ArrowRightFromLine : ArrowLeftFromLine;

  const onToggle = () => {
    if (isExpanded) {
      collapse();
    } else {
      expand();
    }
  };

  const label = isExpanded ? "Chat Collapse" : "Chat Expand";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/20 hover:text-primary bg-transparent"
      >
        <Icon className="h-5 w-5 text-sky-400" />
      </Button>
    </Hint>
  );
};
