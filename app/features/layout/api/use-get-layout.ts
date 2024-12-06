/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/convex/_generated/api"
import { usePaginatedQuery, useQuery } from "convex/react"

const BATCH_SIZE = 10;

/* export type GetMessagesTeturnType = typeof api.layout.get._returnType["toString"]; */

interface useGetLayoutProps {
    layoutCv: string;
    layoutType: string;
}

export const useGetLayout = () => {
    const { results, status, loadMore } = usePaginatedQuery(
        api.layout.get as any,
        { layoutCv: "16", layoutType: "push" },
        { initialNumItems: BATCH_SIZE }
    );

    return {
        results,
        status,
        loadMore: () => loadMore(BATCH_SIZE),
    }
};