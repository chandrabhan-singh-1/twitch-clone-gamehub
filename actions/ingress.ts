"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  try {
    const self = await getSelf();
    console.log("[number 1]");
    // Reset Previous Ingress
    await resetIngresses(self.id);
    console.log("[number 2]");

    const options: CreateIngressOptions = {
      name: self.username,
      roomName: self.id,
      participantName: self.name,
      participantIdentity: self.id,
    };
    console.log("[number 3]");

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }
    console.log("[number 4]");

    const ingress = await ingressClient.createIngress(ingressType, options);

    console.log("[number 5]");
    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error(`Failed to create ingress!`);
    }
    console.log("[number 6]");

    await db.stream.update({
      where: { userId: self.id },
      data: {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
    });

    console.log("[number 7]");
    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
  } catch (error: any) {
    console.error(`[createIngress ERROR]: ${error}`);
    return error;
  }
};
