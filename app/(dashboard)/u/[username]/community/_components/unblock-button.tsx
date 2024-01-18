"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => {
          toast.success(
            `User ${data.blocking.username} Unblocked successfully!`
          );
        })
        .catch((e) => toast.error(e.message || "Something went wrong!"));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant={"link"}
      size={"sm"}
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
