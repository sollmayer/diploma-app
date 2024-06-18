import { FormPopover } from "@/components/form/form-popover"
import Hint from "@/components/hint"
import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react"
import { db } from "@/lib/db";
import { createBoard } from "@/actions/create-board";
import { updateBoard } from "@/actions/create-board/update-board";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}

export const BoardList = async ({params}:ServerIdPageProps) => {
    const orgId = params?.serverId;
    await updateBoard(orgId)
    const boards = await db.board.findMany({
        where: {
          orgId,
        },
        orderBy: {
          createdAt: "desc",
        },
    });
    
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                <Link
                    href={`/board/${board.id}`}
                    key={board.id}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                    style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                    <p className="relative font-semibold text-white">{board.title}</p>
                </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                    className="aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    role="button">
                        <p className="text-base">Create new board</p>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}

BoardList.Skeleton = function BoardListSkeleton() {
    return (
      <div>
        <Skeleton className="aspect-video h-7 w-60 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
          <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
      </div>
    );
  };