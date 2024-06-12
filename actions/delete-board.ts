"use server"

import {db} from "@/lib/db";
import { revalidatePath } from "next/cache";
export async function deleteBoard(id:string){
    await db.board.delete({
        where:{
            id
        }
    })
    revalidatePath("servers/7753a444-c52c-4b57-b047-2be032d581dd/board")
}