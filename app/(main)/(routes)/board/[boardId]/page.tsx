import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface IBoardIdPageProps {
    params: {
      boardId: string;
    };
}
interface IBoardIdPageProps {
    params: {
      boardId: string;
    };
}
const BoardIdPage = async ({ params }: IBoardIdPageProps) => {

    const { boardId } = params;
    const lists = await db.list.findMany({
        where: {
          boardId: boardId,
        },
        include: {
          cards: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });
    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer data={lists} boardId={params.boardId} />
        </div>
    )
}

export default BoardIdPage;