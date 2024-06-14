import { useParams } from "next/navigation";

export const GetOrg = () => {
    const params = useParams();

    return (params?.serverId)
}