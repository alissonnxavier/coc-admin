/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useModalExpandImage } from "@/hooks/use-expand-image-modal";

const ModalExpandImage = () => {

    const handleModalExpandImage = useModalExpandImage();

    return (
        <Dialog
            open={handleModalExpandImage.isOpen}
            onOpenChange={handleModalExpandImage.onClose}
        >
            <DialogContent
                className='w-full border-none bg-transparent p-0 shadow-none'
            >
                {handleModalExpandImage.image === undefined ? (
                    <div>loading</div>
                ) : (
                    <img
                        src={handleModalExpandImage.image}
                        alt='Message image'
                        className='rounded-md object-cover size-full'
                    />
                )}

            </DialogContent>
        </Dialog>
    )
};

export default ModalExpandImage;