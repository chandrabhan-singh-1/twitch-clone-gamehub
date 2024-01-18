"use server";

import { revalidatePath } from "next/cache";
import { Stream } from "@prisma/client";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({
      where: { userId: self.id },
    });

    if (!selfStream) {
      throw new Error("Stream not found!");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = db.stream.update({
      where: { id: selfStream.id },
      data: {
        ...validData,
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
