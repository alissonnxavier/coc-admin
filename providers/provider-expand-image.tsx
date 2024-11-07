"use client";

import ModalExpandImage from "@/components/modal/modal-expand-image";
import { useEffect, useState } from "react";

export const ProviderExpandImage = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ModalExpandImage />
        </>
    )
};