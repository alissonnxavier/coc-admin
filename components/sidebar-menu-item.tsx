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
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role";
import { useSidebar } from "./ui/sidebar";
import { HeaderBar } from "./header-bar";
import { LogoLoader } from "./logo-loader";


export const SidebarNavigationMenuItem = () => {

    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();

    const {
        toggleSidebar,
    } = useSidebar();

    if (isLoadingMemberRole) {
        return (
            <div className='w-full '>
                <div className='mt-[0.4rem] ml-[0.6rem]'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        )
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <Image
                        className="rounded-lg"
                        alt="logo"
                        src='/barbaro.jpg'
                        width={30}
                        height={30}
                    />
                    ShAdOw&apos;$ WAR
                </AccordionTrigger>
                <AccordionContent>
                    <Link
                        href='/layout/list'
                        onClick={() => { toggleSidebar() }}
                    >
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
                    <Link
                        href='/army/list'
                        onClick={() => { toggleSidebar() }}
                    >
                        <Alert className="mb-2">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Variaçoẽs</AlertTitle>
                            <AlertDescription className="flex justify-between">
                                <span className=" flex justify-between w-32">
                                    Decks das melhores variaçoẽs de ataque
                                </span>
                                <div className="flex h-full items-center justify-center">
                                    <Image
                                        className=""
                                        alt="logo"
                                        src='/cards.png'
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
                            <AlertTitle>Loja clash of clans</AlertTitle>
                            <AlertDescription className="flex justify-between">
                                <span className=" flex justify-center items-center w-32">
                                    Compre itens e resgate recompensas
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
                            <Link
                                href='/shadowwar'
                                onClick={() => { toggleSidebar() }}
                            >
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
                            <Link
                                href='/7knights'
                                onClick={() => { toggleSidebar() }}
                            >
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
                            <Link
                                href='/layout/create'
                                onClick={() => { toggleSidebar() }}
                            >
                                <Alert className="hover:bg-muted-foreground/10 mb-2">
                                    <Terminal className="h-4 w-4" />
                                    <AlertTitle>Criar layout</AlertTitle>
                                    <AlertDescription className="flex justify-between">
                                        <span className=" flex justify-center items-center w-32">
                                            Adicione novos layout
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
                            {
                                //@ts-ignore
                                memberRole._id === "jx7f6xfn2y72xvv5pas8cfdq5h73kyq5" && memberRole?.role === "admin" && (
                                    <Link
                                        href='/clandata'
                                        onClick={() => { toggleSidebar() }}
                                    >
                                        <Alert className="hover:bg-muted-foreground/10 mb-2">
                                            <Terminal className="h-4 w-4" />
                                            <AlertTitle>Dados</AlertTitle>
                                            <AlertDescription className="flex justify-between">
                                                <span className=" flex justify-center items-center w-32">
                                                    Adicione ou altere os dados dos clans
                                                </span>
                                                <div className="flex h-full items-center justify-center">
                                                    <Image
                                                        className=""
                                                        alt="logo"
                                                        src='/data.png'
                                                        width={55}
                                                        height={55}
                                                    />
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    </Link>
                                )}
                            {
                                //@ts-ignore
                                memberRole._id === "k973teb2g9zj9qv8vvd02r3zk175w247" && memberRole?.role === "admin" && (
                                    <Link
                                        href='/army/create'
                                        onClick={() => { toggleSidebar() }}
                                    >
                                        <Alert className="hover:bg-muted-foreground/10 mb-2">
                                            <Terminal className="h-4 w-4" />
                                            <AlertTitle>Variaçoes</AlertTitle>
                                            <AlertDescription className="flex justify-between">
                                                <span className=" flex justify-center items-center w-32">
                                                    Adicione decks de ataque
                                                </span>
                                                <div className="flex h-full items-center justify-center">
                                                    <Image
                                                        className=""
                                                        alt="logo"
                                                        src='/army.png'
                                                        width={55}
                                                        height={55}
                                                    />
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    </Link>
                                )}
                        </AccordionContent>
                    </AccordionItem>
                )}
        </Accordion>
    )
};

