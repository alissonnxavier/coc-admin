/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Terminal } from "lucide-react"
import Link from "next/link";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user"
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role"

export const SidebarNavigationMenuItem = () => {

    const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole({ email: currentUser?.email as any });

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Image
                        alt="logo"
                        src='/logo.png'
                        width={30}
                        height={30}
                    />
                    ShAdOw&apos;$ WAR
                </AccordionTrigger>
                <AccordionContent>
                    <Link href='/layout/list'>
                        <Alert className="mb-2">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Layouts</AlertTitle>
                            <AlertDescription className="flex justify-between">
                                <span className=" flex justify-between w-32">
                                    Escolha entre layouts de guerra, farm ou push
                                </span>
                                <div className="flex h-full items-center justify-center">
                                    <Image
                                        className=""
                                        alt="logo"
                                        src='/layout.png'
                                        width={55}
                                        height={55}
                                    />
                                </div>
                            </AlertDescription>
                        </Alert>
                    </Link>
                    <Link href='https://store.supercell.com/clashofclans'>
                        <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Loja clash of clan</AlertTitle>
                            <AlertDescription className="flex justify-between">
                                <span className=" flex justify-between w-32">
                                    Compre itens e regate recompensas
                                </span>
                                <div className="flex h-full items-center justify-center">
                                    <Image
                                        className=""
                                        alt="logo"
                                        src='/shop.png'
                                        width={55}
                                        height={55}
                                    />
                                </div>
                            </AlertDescription>
                        </Alert>
                    </Link>
                </AccordionContent>
            </AccordionItem>
            {
                //@ts-ignore
                memberRole?.role === "admin" && (
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            <Image
                                alt="logo"
                                src='/work-plan.png'
                                width={30}
                                height={30}
                            />
                            Admin funçoẽs
                        </AccordionTrigger>

                        <AccordionContent >
                            <Link href='/selection'>
                                <Alert className="hover:bg-muted-foreground/10 mb-2">
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>ShAdOw&apos;$ WAR</AlertTitle>
                                    <AlertDescription className="flex justify-between">
                                        <span className=" flex justify-center items-center w-32">
                                            Escale ou remova membros
                                        </span>
                                        <div className="flex h-full items-center justify-center">
                                            <Image
                                                className=""
                                                alt="logo"
                                                src='/human-rights.png'
                                                width={55}
                                                height={55}
                                            />
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </Link>
                            <Link href='/7knights'>
                                <Alert className="hover:bg-muted-foreground/10 mb-2">
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>7KniGht$ WAR</AlertTitle>
                                    <AlertDescription className="flex justify-between">
                                        <span className=" flex justify-center items-center w-32">
                                            Escale ou remova membros
                                        </span>
                                        <div className="flex h-full items-center justify-center">
                                            <Image
                                                className=""
                                                alt="logo"
                                                src='/human-rights.png'
                                                width={55}
                                                height={55}
                                            />
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </Link>
                            <Link href='/layout/create'>
                                <Alert className="hover:bg-muted-foreground/10">
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>7KniGht$ WAR</AlertTitle>
                                    <AlertDescription className="flex justify-between">
                                        <span className=" flex justify-center items-center w-32">
                                            Escale ou remova membros
                                        </span>
                                        <div className="flex h-full items-center justify-center">
                                            <Image
                                                className=""
                                                alt="logo"
                                                src='/create-layout.png'
                                                width={55}
                                                height={55}
                                            />
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                )}
        </Accordion>
    )
}