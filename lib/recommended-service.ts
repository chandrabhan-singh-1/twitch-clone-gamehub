import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommended = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followedById: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockingId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blockedBy: {
                some: {
                  blockedById: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
