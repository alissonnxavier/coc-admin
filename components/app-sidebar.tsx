/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Calendar, Home, House, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { SidebarNavigationMenuItem } from "./sidebar-menu-item";
import Image from "next/image"
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";


export function AppSidebar() {

    const {
        toggleSidebar,
    } = useSidebar();

    return (
        <div className="">
            <Sidebar >
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="h-28 m-auto mt-4">
                            <Link
                                href='/'
                                onClick={() => { toggleSidebar() }}
                            >
                                <div className="h-36">
                                    <Image
                                    className="rounded-full"
                                        alt='log'
                                        width={100}
                                        height={100}
                                        src='/barbaro.jpg'
                                    />
                                </div>
                            </Link>
                            {/* <div className="h-36 ml-20 flex justify-start items-start">
                                <SidebarTrigger />
                            </div> */}
                        </SidebarGroupLabel>
                        <Separator />
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarNavigationMenuItem />
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    )
}
