/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { useCurrentUser } from "@/app/features/auth/api/use-current-user"
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role"

interface NavigationMenuMainProps {
    clanName: string;
}

const NavigationMenuMain = ({ clanName }: NavigationMenuMainProps) => {

    const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole({ email: currentUser?.email as any });

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="flex justify-center items-center h-full">
                                            <Image
                                                alt="clanLogo"
                                                src='/logo.png'
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                        <div className="">
                                            <div className="mb-2 mt-4 text-lg font-medium m-x-auto">
                                                {clanName}
                                            </div>
                                        </div>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/layout/list" title="Layouts">
                                <div className="flex justify-between">
                                    <div className="flex justify-center items-center m-x-2 w-28 text-xs">
                                        Escolha entre layouts de farm, guerra e push
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Image
                                            alt="human-rigths"
                                            src='/layout.png'
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                </div>
                            </ListItem>
                            {
                                //@ts-ignore
                                memberRole?.role === "admin" && (
                                    <>
                                        <ListItem href="/layout/create" title="Criar layout">
                                            <div className="flex justify-between">
                                                <div className="flex justify-center items-center m-x-2 w-28 text-xs">
                                                    Crie novos layouts para o clan
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        alt="human-rigths"
                                                        src='/create-layout.png'
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </div>
                                        </ListItem>
                                        <ListItem href="/shadowwar" title="ShAdOw'$ WAR">
                                            <div className="flex justify-between">
                                                <div className="flex justify-center items-center m-x-2 w-28 text-xs">
                                                    Escale ou remova membros
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        alt="human-rigths"
                                                        src='/human-rights.png'
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </div>
                                        </ListItem>
                                        <ListItem href="/7knights" title="7KniGht$ WAR">
                                            <div className="flex justify-between">
                                                <div className="flex justify-center items-center m-x-2 w-28 text-xs">
                                                    Escale ou remova membros
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        alt="human-rigths"
                                                        src='/human-rights.png'
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </div>
                                        </ListItem>
                                    </>
                                )}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem";

export default NavigationMenuMain;
