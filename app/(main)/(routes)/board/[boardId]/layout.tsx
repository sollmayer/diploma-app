import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: (board?.title || "Board") + " | Diploma-app",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  // const { orgId } = auth();
  const { boardId } = params;
  // if (!orgId) {
  //   redirect("/select-org");
  // }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      // orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;