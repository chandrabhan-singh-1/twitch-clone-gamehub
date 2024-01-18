import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const existingFollow = await db.follow.findUnique({
      where: {
        followingId_followedById: {
          followingId: otherUser.id,
          followedById: self.id,
        },
      },
    });

    return !!existingFollow;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself!");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followingId_followedById: {
        followingId: otherUser.id,
        followedById: self.id,
      },
    },
  });

  if (existingFollow) {
    throw new Error("Already following this user!");
  }

  const follow = await db.follow.create({
    data: {
      followingId: otherUser.id,
      followedById: self.id,
    },
    include: {
      following: true,
      followedBy: true,
    },
  });

  return follow;
};

export const unfollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  if (otherUser.id === self.id) {
    throw new Error("Cannot unfollow yourself!");
  }

  const existingFollow = await db.follow.findUnique({
    where: {
      followingId_followedById: {
        followingId: otherUser.id,
        followedById: self.id,
      },
    },
  });

  if (!existingFollow) {
    throw new Error("Already unfollowed this user!");
  }

  const follow = await db.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  });

  return follow;
};

export const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const users = db.follow.findMany({
      where: {
        followedById: self.id,
        following: {
          OR: [
            {
              blocking: {
                none: {
                  blockingId: self.id,
                },
              },
            },
            {
              blockedBy: {
                none: {
                  blockedById: self.id,
                },
              },
            },
          ],
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};
