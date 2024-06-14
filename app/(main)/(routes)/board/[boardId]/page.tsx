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
    // const { orgId } = auth();

    // if (!orgId) {
    //   redirect("/select-org");
    // }
    const { boardId } = params;
    const lists = await db.list.findMany({
        where: {
          boardId: boardId,
        //   board: {
        //     orgId,
        //   },
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