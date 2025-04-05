import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export const useGetMemberRole = () => {

    const data = useQuery(api.memberRole.get);
    const isLoading = data === undefined;

    return { data, isLoading };
};