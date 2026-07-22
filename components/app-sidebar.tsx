/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarNavigationMenuItem } from "./sidebar-menu-item";
import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
    const { toggleSidebar } = useSidebar();

    return (
        <div className="absolute">
            <Sidebar variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        {/* Ajustada a altura e o padding para comportar a logo compacta */}
                        <SidebarGroupLabel className="h-32 w-full flex justify-center items-center my-2 p-0">
                            <Link
                                href="/"
                                onClick={() => toggleSidebar()}
                                className="flex justify-center items-center w-full"
                            >
                                {/* Container da Logo Redimensionado */}
                                <div className="relative group flex flex-col items-center justify-center [perspective:1000px] select-none py-2">

                                    {/* Glow / Aura Dourada do Fundo (Reduzida) */}
                                    <div className="absolute w-20 h-20 bg-amber-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />

                                    {/* Anel Externo Giratório (Reduzido) */}
                                    <div className="absolute w-20 h-20 border-2 border-dashed border-amber-500/40 rounded-full animate-[spin_12s_linear_infinite] pointer-events-none" />

                                    {/* Avatar 3D com Flutuação (Tamanho Compacto) */}
                                    <div className="relative z-10 animate-[coc-float_3s_ease-in-out_infinite]">
                                        {/* Moldura do Escudo estilo CoC */}
                                        <div className="p-1 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-950 rounded-full border-2 border-amber-950 shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                                            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-amber-950 bg-stone-900 shadow-inner">
                                                <Image
                                                    alt="Bárbaro Clash of Clans"
                                                    width={64}
                                                    height={64}
                                                    src={"/barbaro.png"}
                                                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-300"
                                                    priority
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sombra 3D Projetada no Chão (Reduzida) */}
                                    <div className="w-12 h-1.5 bg-black/60 rounded-[100%] blur-sm mt-1 animate-[coc-shadow_3s_ease-in-out_infinite]" />
                                </div>
                            </Link>
                        </SidebarGroupLabel>

                        {/* Keyframes de animação mantidos */}
                        <style jsx global>{`
              @keyframes coc-float {
                0%, 100% {
                  transform: translateY(0px) rotateX(4deg) rotateY(-2deg) scale(1);
                }
                50% {
                  transform: translateY(-8px) rotateX(-4deg) rotateY(2deg) scale(1.03);
                }
              }
              @keyframes coc-shadow {
                0%, 100% {
                  transform: scale(1);
                  opacity: 0.6;
                }
                50% {
                  transform: scale(0.75);
                  opacity: 0.25;
                }
              }
            `}</style>

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
    );
}