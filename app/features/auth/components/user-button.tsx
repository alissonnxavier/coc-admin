/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";


import React from 'react'
import { useCurrentUser } from "../api/use-current-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

const UserButton = () => {

    const {
        setOpen,
    } = useSidebar();

    console.log(open);

    const router = useRouter();

    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />
    };

    if (!data) {
        return (
            <div>
                <Link href='/auth'>
                    <Button
                        variant='quality'>
                        Login
                    </Button>
                </Link>
            </div>
        );
    };

    const { name, image, email } = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="rounded-md size-10 hover:opacity-75 transition">
                    <AvatarImage className="rounded-md" alt={name} src={image ? image : "/barbaro.jpg"} />
                    <AvatarFallback className="rounded-md bg-sky-500 text-white">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem
                    onClick={
                        () => {
                            signOut()
                            setOpen(false);
                        }
                    }
                    className="h-10">
                    <LogOut className="size-4 mr-2" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton