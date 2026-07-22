'use client';

import React from 'react';
import { Button } from './ui/button';
import { PanelLeftOpen, PanelRightOpen, SkipBack } from 'lucide-react';
import { useSidebar } from './ui/sidebar';
import UserButton from '@/app/features/auth/components/user-button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const HeaderBar = () => {
    const { toggleSidebar, open } = useSidebar();
    const path = usePathname();

    return (
        <header className="w-full p-2 sm:p-4 flex justify-center select-none">
            {/* Moldura do Header Estilo Painel de Madeira CoC */}
            <div className="flex items-center justify-between h-20 w-full max-w-5xl px-4 sm:px-8 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950 border-4 border-amber-800/80 rounded-2xl shadow-[0_6px_0_0_#291e0a,0_10px_20px_rgba(0,0,0,0.8)] relative overflow-hidden">

                {/* Brilho Superior Metálico Sutil */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none" />

                {/* Lado Esquerdo: Botão Toggle Sidebar (Estilo Botão Amarelo CoC) */}
                <div className="flex items-center">
                    <Button
                        onClick={() => toggleSidebar()}
                        className="group relative bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-amber-950 font-black border-2 border-amber-950 rounded-xl px-3.5 py-2 h-11 shadow-[0_4px_0_0_#451a03] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer"
                    >
                        <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                            {!open ? (
                                <PanelLeftOpen className="w-6 h-6 stroke-[2.5]" />
                            ) : (
                                <PanelRightOpen className="w-6 h-6 stroke-[2.5]" />
                            )}
                        </span>
                    </Button>
                </div>

                {/* Lado Direito: UserButton ou Botão Voltar */}
                <div className="flex items-center">
                    {path !== '/auth' ? (
                        /* Envolvente do Avatar / UserButton em nicho de pedra */
                        <div className="p-1.5 bg-stone-950/90 border-2 border-amber-900/60 rounded-xl shadow-inner flex items-center justify-center">
                            <UserButton />
                        </div>
                    ) : (
                        /* Botão Voltar (Estilo Botão Cinza/Pedra CoC) */
                        <Link href="/">
                            <Button
                                size="icon"
                                className="bg-gradient-to-b from-stone-600 via-stone-700 to-stone-800 hover:from-stone-500 hover:to-stone-700 text-stone-100 border-2 border-stone-950 rounded-xl h-11 w-11 shadow-[0_4px_0_0_#0c0a09] active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center"
                            >
                                <SkipBack className="w-6 h-6 stroke-[2.5] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                            </Button>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    );
};