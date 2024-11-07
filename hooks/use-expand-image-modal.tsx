/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type ExpandImageProps = {
    isOpen: boolean;
    image: string | undefined;
    onOpen: (image: string | undefined) => void;
    onClose: () => void;
};

export const useModalExpandImage = create<ExpandImageProps>((set) => ({
    image: undefined,
    isOpen: false,
    onOpen: (image = undefined) => set({ isOpen: true, image }),
    onClose: () => set({ isOpen: false, image: undefined })
}));