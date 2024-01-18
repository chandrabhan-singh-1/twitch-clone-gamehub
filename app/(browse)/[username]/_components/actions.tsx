"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlocking: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, isBlocking, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`Followed the User: ${data.following.username}`)
        )
        .catch((e) => toast.error(e.message));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast.success(`Unfollowed: ${data.following.username}`))
        .catch((e) => toast.error(e.message));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast.success(`Blocked: ${data.blocking.username}`))
        .catch((e) => toast.error(e.message));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast.success(`Unblocked: ${data.blocking.username}`))
        .catch((e) => toast.error(e.message));
    });
  };

  return (
    <>
      <Button
        variant={"primary"}
        disabled={isPending}
        onClick={isFollowing ? handleUnfollow : handleFollow}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        disabled={isPending}
        onClick={isBlocking ? handleUnblock : handleBlock}
      >
        {isBlocking ? "Unblock" : "Block"}
      </Button>
    </>
  );
};
