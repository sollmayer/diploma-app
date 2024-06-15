"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
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

  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {

          },
        },
      },
    });


    // await createAuditLog({
    //   entityTitle: card.title,
    //   entityId: card.id,
    //   entityType: ENTITY_TYPE.CARD,
    //   action: ACTION.CREATE,
    // })
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};
  
export const deleteCard = createSafeAction(DeleteCard, handler);