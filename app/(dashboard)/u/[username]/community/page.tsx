import { getBlockedUsers } from "@/lib/block-service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

export default async function CommunityPage() {
  const blockedUsers = await getBlockedUsers();

  const formattedData = blockedUsers.map((block) => ({
    ...block,
    userId: block.blocking.id,
    imageUrl: block.blocking.imageUrl,
    username: block.blocking.username,
    createdAt: format(new Date(block.blocking.createdAt), "dd/mm/yy"),
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community</h1>
      </div>
      <DataTable columns={columns} data={formattedData} />
    </div>
  );
}
