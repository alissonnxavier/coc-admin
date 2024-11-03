/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id, Doc } from "../../../../convex/_generated/dataModel";


type RequestType = {
    layoutLink: string,
    layoutCv: string,
    layoutType: string,
    image: Id<"_storage">,
};
type ResponseType = Id<"layout"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};

export const useCreateLayout = () => {

    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.layout.create)
    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);

            setStatus("pending");

            const response = await mutation(values as any);
            options?.onSuccess?.(response as any);
            return response;
        } catch (error) {
            setStatus("error");
            options?.onError?.(error as Error);

            if (options?.throwError) {
                throw error;
            }
        } finally {
            setStatus("settled");
            options?.onSettled?.();
        }
    }, [mutation]);

    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,
    };
}