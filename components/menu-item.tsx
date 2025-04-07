import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Image from 'next/image';

interface MenuItemProps {
    title: string;
    description: string;
    image: string;
};

export const MenuItem = ({
    title,
    description,
    image
}: MenuItemProps) => {
    return (
        <>
            <Alert className="mb-2">
                <AlertTitle className="font-bold">{title}</AlertTitle>
                <AlertDescription className="flex justify-between">
                    <div className="flex items-center justify-between w-full">
                        <span className=" flex justify-between ">
                            {description}
                        </span>
                        <div className="">
                            <Image
                                className=""
                                alt="logo"
                                src={image}
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
        </>
    )
};
