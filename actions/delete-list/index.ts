"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
import { redirect } from "next/navigation";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();
  if (!userId) {
    return {
      error: "Unauthorized.",
    };
  }

  const { id, boardId } = data;
  let boardToDelete = await db.board.findFirst({
    where:{
      id:id
    }
  })
  let boardOrgId = boardToDelete?.orgId
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
      },
    });

    // await createAuditLog({
    //   entityTitle: list.title,
    //   entityId: list.id,
    //   entityType: ENTITY_TYPE.LIST,
    //   action: ACTION.DELETE,
    // })
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};
  
export const deleteList = createSafeAction(DeleteList, handler);