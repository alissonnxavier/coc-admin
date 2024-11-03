import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"


export const useGetLayout = () => {
    const data = useQuery(api.layout.get);
    const isLoading = data === undefined;

    return { data, isLoading };
};