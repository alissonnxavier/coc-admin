import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"


export const useGetClanData = () => {
    const data = useQuery(api.clandata.get);
    const isLoading = data === undefined;

    return { data, isLoading };
};