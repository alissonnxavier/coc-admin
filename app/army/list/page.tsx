/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetArmyData } from '@/app/features/army/api/use-get-army-data';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Image from "next/image";
import Link from 'next/link';
import { HeaderBar } from '@/components/header-bar';
import { LogoLoader } from '@/components/logo-loader';

const ArmyList = () => {
    const { data, isLoading } = useGetArmyData();

    if (isLoading) {
        return (
            <div className='w-full mb-5 '>
                <div className='mt-[0.4rem] ml-[0.6rem]'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        )
    }

    if (!data) return null;

    return (
        <div className='w-full min-h-screen bg-slate-950 pb-10'>
            <div >
                <HeaderBar />
            </div>

            {/* Grid principal organizando as cartas do deck */}
            <div className='xl:w-5/6 md:w-5/6 lg:w-5/6 sm:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-6 p-4'>
                {data.map((army, index) => {
                    {/* Recupera o nome da primeira tropa válida para aplicar o mesmo gradiente dinâmico do código antigo */ }
                    const firstTroopName = army.data.army.troops.find((t: any) => t.amount > 0)?.name || 'default';
                    const gradientClass = `gradient-background-trop-card-${firstTroopName}`;

                    return (
                        <div
                            key={index}
                            className={`relative flex flex-col justify-between border-4 border-amber-600 rounded-2xl p-4 ${gradientClass} shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/20 group`}
                            style={{ minHeight: '520px' }}
                        >
                            {/* Detalhe estético de borda interna de Carta TCG */}
                            <div className="absolute inset-2 border border-amber-700/40 rounded-xl pointer-events-none" />

                            {/* Topo da Carta: Título do Exército */}
                            <div className='relative z-10 flex justify-between items-center bg-gradient-to-r from-amber-700 to-amber-900 border-2 border-amber-500 rounded-lg px-3 py-2 shadow-inner mb-4'>
                                <p className='text-amber-100 font-extrabold text-lg tracking-wide truncate max-w-[80%] uppercase drop-shadow-md'>
                                    {army.data.army.armyName || "Exército Invencível"}
                                </p>
                                <div className='bg-amber-900/80 p-1 rounded-full border border-amber-400/60 flex items-center justify-center w-8 h-8'>
                                    <img src='/sword.png' alt='sword' className='h-5 w-5 object-contain' />
                                </div>
                            </div>

                            {/* Conteúdo da Carta (Corpo) */}
                            <div className='relative z-10 flex-1 flex flex-col gap-3 overflow-hidden rounded-lg bg-slate-950/60 p-2 border border-amber-900/20 backdrop-blur-sm'>

                                {/* Seção 1: Tropas & Feitiços */}
                                <div className='flex-1 min-h-[110px]'>
                                    <div className='flex items-center gap-1 mb-1 text-xs font-semibold text-amber-200 uppercase tracking-wider px-1'>
                                        <span>Tropas & Feitiços</span>
                                    </div>
                                    <ScrollArea className='w-full whitespace-nowrap bg-slate-950/60 rounded-lg border border-slate-800 p-2'>
                                        <div className='flex gap-2 pb-1'>
                                            {/* Renderização de Tropas */}
                                            {army.data.army.troops.map((trop: any, tropIndex: number) => trop.amount > 0 && (
                                                <div className='relative inline-block w-16 bg-slate-900 border border-amber-600/30 rounded-lg overflow-hidden shadow-md' key={`trop-${tropIndex}`}>
                                                    <span className='absolute top-0.5 left-1 z-10 text-xs font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]'>
                                                        {trop.amount}x
                                                    </span>
                                                    <img src={`/army/${trop.name}.png`} alt={trop.name} className='h-14 w-full object-cover mt-1' />
                                                </div>
                                            ))}

                                            {/* Renderização de Feitiços */}
                                            {army.data.army.spells.map((spell: any, spellsIndex: number) => spell.amount > 0 && (
                                                <div className='relative inline-block w-16 bg-slate-900 border border-purple-500/30 rounded-lg overflow-hidden shadow-md' key={`spell-${spellsIndex}`}>
                                                    <span className='absolute top-0.5 left-1 z-10 text-xs font-black text-purple-200 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]'>
                                                        {spell.amount}x
                                                    </span>
                                                    <img src={`/army/${spell.name}.png`} alt={spell.name} className='h-14 w-full object-cover mt-1' />
                                                </div>
                                            ))}
                                        </div>
                                        <ScrollBar orientation='horizontal' className="h-1.5" />
                                    </ScrollArea>
                                </div>

                                {/* Seção 2: Heróis, Equipamentos e Pets */}
                                <div className='bg-slate-950/60 rounded-lg p-2 border border-slate-800/60'>
                                    <div className='text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1 px-1'>
                                        <img src='/crown.png' alt='hero icon' className='h-3.5 w-3.5 object-contain' />
                                        <span>Herois e Pets</span>
                                    </div>

                                    {army.data.army.hero.map((hero: any, heroIndex: number) => hero.amount > 0 && (
                                        <div className='flex gap-2' key={`hero-${heroIndex}`}>
                                            {/* Miniatura do Herói */}
                                            <div className='w-16 h-20 bg-slate-900 border border-emerald-600/30 rounded-lg overflow-hidden relative shadow-md flex-shrink-0'>
                                                <img src={`/hero/${hero.name}.png`} alt={hero.name} className='h-full w-full object-cover' />
                                            </div>

                                            {/* Equipamentos & Pets */}
                                            <div className='flex flex-col gap-1.5 flex-1 justify-center overflow-hidden'>
                                                {/* Equipamentos */}
                                                <div className='flex gap-1 overflow-x-auto pb-0.5 scrollbar-none'>
                                                    {hero.equipaments.map((equipament: any, equipamentIndex: number) => equipament.amount > 0 && (
                                                        <div className='w-8 h-8 relative bg-slate-900 border border-blue-500/20 rounded shadow-sm flex-shrink-0' key={`equip-${equipamentIndex}`}>
                                                            <Image alt={equipament.name} src={`/equipaments/${equipament.name}.png`} fill style={{ objectFit: 'contain' }} sizes="32px" />
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* Pets */}
                                                <div className='flex gap-1 overflow-x-auto scrollbar-none'>
                                                    {hero.pets.map((pet: any, petIndex: number) => pet.amount > 0 && (
                                                        <div className='w-14 h-8 bg-slate-900 border border-amber-500/20 rounded overflow-hidden flex-shrink-0 relative' key={`pet-${petIndex}`}>
                                                            <img src={`/pets/${pet.name}.png`} alt={pet.name} className='h-full w-full object-cover' />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Seção 3: Castelo de Clã */}
                                <div className='bg-slate-950/60 rounded-lg p-2 border border-slate-800/60'>
                                    <div className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 px-1'>
                                        <img src='/castle.png' alt='castle icon' className='h-3.5 w-3.5 object-contain' />
                                        <span>Reforços do Castelo</span>
                                    </div>
                                    <ScrollArea className='w-full whitespace-nowrap bg-slate-950/40 rounded-lg p-1'>
                                        <div className='flex gap-1.5 pb-1'>
                                            {army.data.army.castleTroops.map((castleTrop: any, idx: number) => castleTrop.amount > 0 && (
                                                <div className='relative inline-block w-12 bg-slate-900 border border-slate-800 rounded overflow-hidden' key={`cc-trop-${idx}`}>
                                                    <span className='absolute top-0 left-0.5 z-10 text-[10px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{castleTrop.amount}x</span>
                                                    <img src={`/army/${castleTrop.name}.png`} alt={castleTrop.name} className='h-10 w-full object-cover mt-0.5' />
                                                </div>
                                            ))}
                                            {army.data.army.castleSpells.map((castleSpel: any, idx: number) => castleSpel.amount > 0 && (
                                                <div className='relative inline-block w-12 bg-slate-900 border border-purple-950 rounded overflow-hidden' key={`cc-spell-${idx}`}>
                                                    <span className='absolute top-0 left-0.5 z-10 text-[10px] font-bold text-purple-300 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{castleSpel.amount}x</span>
                                                    <img src={`/army/${castleSpel.name}.png`} alt={castleSpel.name} className='h-10 w-full object-cover mt-0.5' />
                                                </div>
                                            ))}
                                            {army.data.army.castleMachines.map((castleMachine: any, idx: number) => castleMachine.amount > 0 && (
                                                <div className='relative inline-block w-12 bg-slate-900 border border-amber-950 rounded overflow-hidden' key={`cc-mach-${idx}`}>
                                                    <span className='absolute top-0 left-0.5 z-10 text-[10px] font-bold text-amber-400 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{castleMachine.amount}x</span>
                                                    <img src={`/machines/${castleMachine.name}.png`} alt={castleMachine.name} className='h-10 w-full object-cover mt-0.5' />
                                                </div>
                                            ))}
                                        </div>
                                        <ScrollBar orientation='horizontal' className="h-1" />
                                    </ScrollArea>
                                </div>

                            </div>

                            {/* Rodapé da Carta: Botão de Ação */}
                            <div className='relative z-10 mt-4 pt-2 border-t border-amber-700/20 flex justify-center w-full'>
                                <Link href={army.data.army.link} className="w-full">
                                    <Button className='w-full font-bold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 border-2 border-amber-300 rounded-xl shadow-lg transition-transform active:scale-95 group-hover:animate-pulse'>
                                        Mandar Pro Combate
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
};

export default ArmyList;