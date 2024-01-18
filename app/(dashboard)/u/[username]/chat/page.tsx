import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { notFound } from "next/navigation";
import { ToggleCard } from "./_components/toggle-card";

interface ChatPageProps {
  params: { username: string };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    console.error(`[STREAM CHAT ERROR]: Stream not Found!`);
    return notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Only followers can Chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
