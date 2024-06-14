import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";
interface ServerIdPageProps {
  params: {
      serverId: string;
  }
}

const OrganizationIdPage = async ({params}:ServerIdPageProps) => {
    return (
      <div className="w-full mb-20">
        <Info/>
        <Separator className="my-4" />
        <div className="px-2 md:px-4 ">
            <Suspense fallback={<BoardList.Skeleton />}>
              <BoardList params={params}/>
            </Suspense>
        </div>

      </div>
    );
  };

export default OrganizationIdPage;