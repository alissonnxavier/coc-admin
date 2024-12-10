import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"


export const useGetArmyData = () => {
    const data = useQuery(api.army.get);
    const isLoading = data === undefined;

    return { data, isLoading };
};