"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {z} from "zod";

export type State = {
    errors?: {
        title?: string[]
    },
    message: string | null
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letters is required"
    })
});

export async function create(formData: FormData) {
    const {title} = CreateBoard.parse({
        title: formData.get("title")
    })

    await db.board.create({
        data:{
           title 
        }
    })

    revalidatePath("servers/7753a444-c52c-4b57-b047-2be032d581dd/board")
}
