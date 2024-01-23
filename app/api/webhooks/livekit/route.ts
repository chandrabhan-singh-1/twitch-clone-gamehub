import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if (!authorization) {
      return new NextResponse("No authorization Header", { status: 400 });
    }

    const event = receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: true,
        },
      });
    }

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: false,
        },
      });
    }

    return new NextResponse("Stream Status Updated!", { status: 200 });
  } catch (error) {
    console.error(`[LiveKit WEBHOOK ERROR]: ${error}`);
    return new NextResponse("LiveKit WebHook Error!", { status: 500 });
  }
}
