import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface useGetWorkspaceProps {
    email: string;
}

export const useGetMemberRole = ({ email }: useGetWorkspaceProps) => {

    const data = useQuery(api.memberRole.get, { email });
    const isLoading = data === undefined;

    return { data, isLoading };
};