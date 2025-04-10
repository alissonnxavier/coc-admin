/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/convex/_generated/api"
import { usePaginatedQuery, useQuery } from "convex/react"

const BATCH_SIZE = 10;

interface useGetLayoutProps {
    layoutCv: string;
    layoutType: string;
}

export const useGetFavoritesLayout = () => {
    const { results, status, loadMore } = usePaginatedQuery(
        api.favoriteLayouts.get as any,
        { layoutCv: "16", layoutType: "push" },
        { initialNumItems: BATCH_SIZE }
    );

    return {
        results,
        status,
        loadMore: () => loadMore(BATCH_SIZE),
    }
};

export const useGeAllFavoritetLayouts = () => {
    const data = useQuery(api.favoriteLayouts.getAll);
    const isLoading = data === undefined;

    return { data, isLoading }
};