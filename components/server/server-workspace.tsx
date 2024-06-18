"use client"
import { Server } from "http";
import { useRouter } from "next/navigation";

interface ServerWorkspaceProps {
    serverId: string;
}


export const ServerWorkspace = ({serverId}:ServerWorkspaceProps) => {
    const router = useRouter();
    const redirectToWorkspace = () => {
        router.push(`/servers/${serverId}/organization`);
    };
    return (
        <button 
            onClick={redirectToWorkspace} 
            className="font-semibold text-sm group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 text-zinc-500 dark:text-zinc-400 transition mb-1">
            Workspace
        </button>
    )
}