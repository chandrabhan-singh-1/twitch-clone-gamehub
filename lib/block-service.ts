import { db } from "./db";
import { getSelf } from "./auth-service";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error(`User not found!`);
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockingId_blockedById: {
          blockingId: self.id,
          blockedById: otherUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch (error) {
    return false;
  }
};

export const isBlockingUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found!");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const blocking = await db.block.findUnique({
      where: {
        blockingId_blockedById: {
          blockingId: id,
          blockedById: self.id,
        },
      },
    });

    return !!blocking;
  } catch (error) {
    console.log(`[isBlockingUser Error]: ${error}`);
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot block yourself!");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockingId_blockedById: {
        blockingId: otherUser.id,
        blockedById: self.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error(`'${otherUser.username}' is already blocked!`);
  }

  const blocked = await db.block.create({
    data: {
      blockingId: otherUser.id,
      blockedById: self.id,
    },
    include: {
      blocking: true,
    },
  });

  return blocked;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("Cannot unblock yourself!");
  }

  const otherUser = await db.user.findUnique({
    where: { id },
  });

  if (!otherUser) {
    throw new Error("User not found!");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockingId_blockedById: {
        blockingId: otherUser.id,
        blockedById: self.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error(`'${otherUser.username}' already unblocked!`);
  }

  const unblocked = await db.block.delete({
    where: { id: existingBlock.id },
    include: {
      blocking: true,
    },
  });

  return unblocked;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockedUsers = await db.block.findMany({
    where: {
      blockedById: self.id,
    },
    include: {
      blocking: true,
    },
  });

  return blockedUsers;
};
