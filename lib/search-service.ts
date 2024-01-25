import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    userId = null;
  }

  let streams = [];

  if (userId) {
    // TODO
    streams = await db.stream.findMany({
      where: {
        NOT: {
          user: {
            blocking: {
              some: {
                blockingId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              search: term,
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  username: {
                    contains: term,
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              search: term,
            },
          },
          {
            user: {
              OR: [
                {
                  name: {
                    contains: term,
                  },
                },
                {
                  username: {
                    contains: term,
                  },
                },
              ],
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
