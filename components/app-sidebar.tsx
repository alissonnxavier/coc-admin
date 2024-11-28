/* eslint-disable @typescript-eslint/no-unused-vars */
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

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <div className="">
            <Sidebar >
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="h-36">
                            <Link href='/'>
                                <div className="h-36">
                                    <Image
                                        alt='logo'
                                        width={100}
                                        height={100}
                                        src='/logo.png'
                                    />
                                </div>
                            </Link>
                            <div className="h-36 ml-20 flex justify-start items-start">
                                <SidebarTrigger />
                            </div>
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
