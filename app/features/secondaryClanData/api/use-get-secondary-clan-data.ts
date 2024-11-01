import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"


export const useGetSecondaryClanData = () => {
    const data = useQuery(api.secondaryClanData.get);
    const isLoading = data === undefined;

    return { data, isLoading };
};