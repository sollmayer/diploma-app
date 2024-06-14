import { db } from "@/lib/db";
interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}
export const updateBoard = async (orgId:string) => {
    return await db.board.updateMany({
        where: {
          orgId:"Test3",
        },
        data: {
            orgId: orgId,
        },
    });
}