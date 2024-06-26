"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoardSchema } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();
    if (!userId) {
      return {
        error: "Unauthorized.",
      };
    }
  
    const { id } = data;
    let boardToDelete = await db.board.findFirst({
      where:{
        id:id
      }
    })
    let boardOrgId = boardToDelete?.orgId
    let board;
    try {
      board = await db.board.delete({
        where: {
          id,
        }
      });
      await createAuditLog({
        entityId: board.id,
        entityTitle: board.title,
        action: ACTION.DELETE,
        entityType: ENTITY_TYPE.BOARD,
      });
    } catch (error) {
      return {
        error: "Failed to delete.",
      };
    }
    revalidatePath(`/servers/${boardOrgId}/organization`);
    redirect(`/servers/${boardOrgId}/organization`)
  };
  
  export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);