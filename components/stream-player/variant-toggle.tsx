"use client";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessagesSquare,
  Users,
} from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";

export const VariantToggle = () => {
  const { variant, changeVariant } = useChatSidebar((state) => state);

  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessagesSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;

    changeVariant(newVariant);
  };

  const label = isChat ? "Community" : "Go Back to Chat";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/20 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4 " />
      </Button>
    </Hint>
  );
};
