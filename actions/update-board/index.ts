"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


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
      await createAuditLog({
        entityId: board.id,
        entityTitle: board.title,
        action: ACTION.UPDATE,
        entityType: ENTITY_TYPE.BOARD,
      });
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