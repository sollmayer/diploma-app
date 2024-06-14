"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoardSchema } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();
    if (!userId) {
      return {
        error: "Unauthorized.",
      };
    }
  
    const { title, id } = data;
  
    let board;
    try {
      board = await db.board.update({
        where: {
          id,
        },
        data: {
          title,
        },
      });
    //   await createAuditLog({
    //     action: ACTION.UPDATE,
    //     entityId: board.id,
    //     entityTitle: board.title,
    //     entityType: ENTITY_TYPE.BOARD,
    //   });
    } catch (error) {
      return {
        error: "Failed to update board.",
      };
    }
    revalidatePath(`/board/${board.id}`);
    return {
      data: board,
    };
  };
  
  export const updateBoard = createSafeAction(UpdateBoardSchema, handler);