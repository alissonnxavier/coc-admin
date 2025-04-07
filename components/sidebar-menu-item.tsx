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
import { MenuItem } from "./menu-item";


export const SidebarNavigationMenuItem = () => {

    const { data: memberRole } = useGetMemberRole();

    const {
        toggleSidebar,
    } = useSidebar();

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
                        <MenuItem
                            title="Layouts"
                            description="Escolha entre layouts de farm, guerra ou push"
                            image="/layout.png"
                        />
                    </Link>
                    <Link
                        href='/army/list'
                        onClick={() => { toggleSidebar() }}
                    >
                        <MenuItem
                            title="Variaçoẽs"
                            description="Decks das melhores variaçoẽs de ataque"
                            image="/cards.png"
                        />
                    </Link>
                    <Link href='https://store.supercell.com/clashofclans'>
                        <MenuItem
                            title="Loja clash of clan"
                            description="compre itens e resgate recompensas"
                            image="/shop.png"
                        />
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
                                <MenuItem
                                    title={`ShAdOw'$ WAR`}
                                    description="Escale ou remova membros"
                                    image="/human-rights.png"
                                />
                            </Link>
                            <Link
                                href='/7knights'
                                onClick={() => { toggleSidebar() }}
                            >
                                <MenuItem
                                    title={`7KniGht$ WAR`}
                                    description="Escale ou remova membros"
                                    image="/human-rights.png"
                                />
                            </Link>
                            <Link
                                href='/layout/create'
                                onClick={() => { toggleSidebar() }}
                            >
                                <MenuItem
                                    title={`Criar layout`}
                                    description="Adicione novos layout"
                                    image="/create-layout.png"
                                />
                            </Link>
                            {
                                //@ts-ignore
                                memberRole._id === "k57awxemhpkd2446k8hz579px573mtvg" && memberRole?.role === "admin" && (
                                    <Link
                                        href='/clandata'
                                        onClick={() => { toggleSidebar() }}
                                    >
                                        <MenuItem
                                            title="Dados"
                                            description="Adicione ou altere os dados dos clans"
                                            image="/data.png"
                                        />
                                    </Link>
                                )}
                            {
                                //dev k973teb2g9zj9qv8vvd02r3zk175w247
                                //prod k57awxemhpkd2446k8hz579px573mtvg
                                //@ts-ignore
                                memberRole._id === "k57awxemhpkd2446k8hz579px573mtvg" && memberRole?.role === "admin" && (
                                    <Link
                                        href='/army/create'
                                        onClick={() => { toggleSidebar() }}
                                    >
                                        <MenuItem
                                            title="Variaçoes"
                                            description="Adicione decks de ataque"
                                            image="/army.png"
                                        />
                                    </Link>
                                )}
                        </AccordionContent>
                    </AccordionItem>
                )}
        </Accordion>
    )
};

