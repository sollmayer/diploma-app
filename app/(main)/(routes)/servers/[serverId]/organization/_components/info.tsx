"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export const Info = () => {
    const { organization, isLoaded } = useOrganization();
    const params = useParams();
    if (!isLoaded) {
        return <Info.Skeleton />;
    }

    return (
        <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          {/* <Image
            fill
            alt="Organization"
            src={organization?.imageUrl!}
            className="rounded-md object-cover"
          /> */}
          <LayoutDashboard className="rounded-md object-cover w-12 h-12 relative top-2 left-4"/>
        </div>
        <div className="space-y-1">
        <p className="font-semibold text-xl">{params?.serverId}</p>
        {/* <p className="font-semibold text-xl">{organization?.name}</p> */}
        {/* <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1 " />
          Free
        </div> */}
      </div>
      </div>
    )
}
Info.Skeleton = function SkeletonInfo() {
    return (
      <div className="flex items-center gap-x-4">
        <div className="w-[60px] h-[60px] relative">
          <Skeleton className="w-12 h-12 relative left-4 top-2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-[200px]" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-2" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
      </div>
    );
  };