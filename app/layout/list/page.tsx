/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import LayoutLevel from '@/components/layout-level';
import LayoutType from '@/components/layout-type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useModalExpandImage } from '@/hooks/use-expand-image-modal';
import { LoaderIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { api } from "@/convex/_generated/api"
import { usePaginatedQuery } from "convex/react"
import { cn } from '@/lib/utils';
import { HeaderBar } from '@/components/header-bar';
import { LogoLoader } from '@/components/logo-loader';
import { useCreateFavoriteLayouts } from '@/app/features/favoriteLayouts/api/use-create-favorite-layouts';
import { Id } from '@/convex/_generated/dataModel';
import { useGeAllFavoritetLayouts } from '@/app/features/favoriteLayouts/api/use-get-favorite-layouts';
import { useRemoveFavoriteLayout } from '@/app/features/favoriteLayouts/api/use-remove-favorite-layout';
import { useCurrentUser } from '@/app/features/auth/api/use-current-user';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const LayoutList = () => {
    const BATCH_SIZE = 10;

    const handleModalExpandImage = useModalExpandImage();
    const [layoutLevel, setLayoutLevel] = useState<string>("18");
    const [layoutType, setLayoutType] = useState<string>("farm");
    const { mutate: createFavoriteLayout } = useCreateFavoriteLayouts();
    const dataIds = useGeAllFavoritetLayouts();
    const { mutate: removeFavoriteLayout } = useRemoveFavoriteLayout();
    const { data } = useCurrentUser();
    const { toast } = useToast();

    const { results, status, loadMore } = usePaginatedQuery(
        api.layout.get as any,
        { layoutCv: layoutLevel, layoutType: layoutType },
        { initialNumItems: BATCH_SIZE }
    );

    if (!results || !dataIds) {
        return (
            <div className='w-full mb-5'>
                <div className='mt-[0.4rem] ml-[0.6rem]'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        )
    }

    const starColor = (id: string) => {
        //@ts-ignore
        for (let i = 0; i < dataIds?.data?.ids?.length as any; i++) {
            //@ts-ignore
            if (id === dataIds?.data?.ids[i]?.layoutId) {
                return true
            }
        }
        return false;
    };

    const favoriteLayout = (layoutId: Id<"layout">, layoutLink: string, layoutCv: string, layoutType: string, image: Id<"_storage">) => {
        if (starColor(layoutId)) {
            removeFavoriteLayout({
                id: layoutId
            }, {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "Certo!.",
                        description: "Layout removido dos favoritos.",
                        action: <ToastAction altText="Fechar" className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                    })
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Oops!.",
                        description: "Tivemos um problema.",
                        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
                    })
                },
            })
        } else {
            createFavoriteLayout({
                layoutId,
                layoutLink,
                layoutCv,
                layoutType,
                image,
            }, {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: `Certo!`,
                        description: "Layout adicionado aos favoritos.",
                        action: <ToastAction altText="Fechar" className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                    })
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Oops!.",
                        description: "Tivemos um problema.",
                        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
                    })
                },
            });
        }
    };

    return (
        <div className='w-full min-h-screen pb-10'>
            <div>
                <HeaderBar />
            </div>

            <div className="px-2">
                {/* Linha de Filtros de CV incluindo o novo CV 18 */}
                <div className='flex items-center justify-center flex-wrap mb-3 gap-2 max-w-xl mx-auto'>
                    <Button onClick={() => { setLayoutLevel("18") }} size='sm' className={cn('border bg-red-950 rounded-lg text-red-200 border-red-400/50 opacity-25 hover:opacity-70 font-semibold', layoutLevel === "18" && 'opacity-100 border-red-400 bg-red-900/80')}>18</Button>
                    <Button onClick={() => { setLayoutLevel("17") }} size='sm' className={cn('border bg-slate-900 rounded-lg text-slate-300 border-slate-300 opacity-25 hover:opacity-70', layoutLevel === "17" && 'opacity-100')}>17</Button>
                    <Button onClick={() => { setLayoutLevel("16") }} size='sm' className={cn('border bg-orange-900 rounded-lg text-orange-300 border-orange-300 opacity-25 hover:opacity-70', layoutLevel === "16" && 'opacity-100')}>16</Button>
                    <Button onClick={() => { setLayoutLevel("15") }} size='sm' className={cn('border bg-purple-900 rounded-lg text-purple-300 border-purple-300 opacity-25 hover:opacity-70', layoutLevel === "15" && 'opacity-100')}>15</Button>
                    <Button onClick={() => { setLayoutLevel("14") }} size='sm' className={cn('border bg-green-900 rounded-lg text-green-300 border-green-300 opacity-25 hover:opacity-70', layoutLevel === "14" && 'opacity-100')}>14</Button>
                    <Button onClick={() => { setLayoutLevel("13") }} size='sm' className={cn('border bg-blue-900 rounded-lg text-blue-300 border-blue-300 opacity-25 hover:opacity-70', layoutLevel === "13" && 'opacity-100')}>13</Button>
                    <Button onClick={() => { setLayoutLevel("12") }} size='sm' className={cn('border bg-sky-700 rounded-lg text-sky-300 border-sky-300 opacity-25 hover:opacity-70', layoutLevel === "12" && 'opacity-100')}>12</Button>
                    <Button onClick={() => { setLayoutLevel("11") }} size='sm' className={cn('border bg-slate-300 rounded-lg text-black border-white opacity-25 hover:opacity-70', layoutLevel === "11" && 'opacity-100')}>11</Button>
                </div>

                {/* Linha de Filtros de Categoria */}
                <div className='flex items-center justify-center flex-wrap mb-3 gap-2'>
                    <Button onClick={() => { setLayoutType("farm") }} size='sm' className={cn("border text-lime-200 bg-lime-700 border-lime-200 opacity-25 hover:opacity-70", layoutType === "farm" && 'opacity-100')}>Farm</Button>
                    <Button onClick={() => { setLayoutType("push") }} size='sm' className={cn("border text-violet-300 bg-violet-700 border-violet-300 opacity-25 hover:opacity-70", layoutType === "push" && 'opacity-100')}>Push</Button>
                    <Button onClick={() => { setLayoutType("war") }} size='sm' className={cn("border text-orange-600 bg-orange-900 border-orange-600 opacity-25 hover:opacity-70", layoutType === "war" && 'opacity-100')}>War</Button>
                    <Button onClick={() => { setLayoutType("troll") }} size='sm' className={cn("border text-pink-600 bg-pink-900 border-pink-600 opacity-25 hover:opacity-70", layoutType === "troll" && 'opacity-100')}>Troll</Button>
                </div>
            </div>

            <Separator className='mb-5 w-5/6 mx-auto' />

            {/* Mudança aqui: de flex-wrap para um Grid de 2 colunas no mobile e comportamento original em telas maiores (sm:) */}
            <div className='grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 px-4 max-w-4xl mx-auto'>
                {results?.map((layout: any, index: any) => (
                    <div key={layout._id || index} className='w-full sm:w-44 sm:flex-shrink-0'>
                        <div className='shine-border-green p-0.5 rounded-lg h-full'>
                            {/* Removido o 'w-44' fixo do Card para ele herdar a largura da coluna no grid */}
                            <Card className='w-full p-0 overflow-hidden flex flex-col bg-black border-zinc-800 h-full justify-between'>
                                <CardContent className='p-0 relative'>
                                    {data && (
                                        <div className='absolute top-2 right-2 z-10'>
                                            <div
                                                className={cn('border border-slate-300 rounded-full p-1 cursor-pointer gradient-background-yellow-star transition-transform active:scale-95',
                                                    starColor(layout._id) && 'shine-border-green'
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    favoriteLayout(
                                                        layout._id,
                                                        layout.layoutLink,
                                                        layout.layoutCv,
                                                        layout.layoutType,
                                                        layout.imageId
                                                    );
                                                }}
                                            >
                                                <Image
                                                    src={starColor(layout._id) ? "/star.png" : "/black-star.png"}
                                                    alt='star'
                                                    width={20}
                                                    height={20}
                                                    className={cn('text-white', starColor(layout._id) && 'animate-bounce')}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        onClick={() => { handleModalExpandImage.onOpen(layout.image) }}
                                        className='cursor-pointer overflow-hidden relative w-full h-[120px] sm:h-[140px]'
                                    >
                                        <Image
                                            alt='layout'
                                            src={layout.image}
                                            fill
                                            sizes="(max-width: 640px) 50vw, 176px"
                                            className='object-cover hover:scale-105 transition-transform duration-200 rounded-t-md'
                                            priority={index < 4}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className='p-2 bg-zinc-950 flex flex-col gap-2 mt-auto'>
                                    <div className='flex w-full items-center justify-between gap-1'>
                                        <div className='flex items-center gap-1 flex-wrap min-w-0'>
                                            <LayoutLevel cv={layout.layoutCv} />
                                            <LayoutType type={layout.layoutType} />
                                        </div>
                                        <Button
                                            className='shine-border-green font-bold text-black px-2 h-7 text-[11px] sm:text-xs flex-shrink-0'
                                            variant='ghost'
                                            size='sm'
                                            asChild
                                        >
                                            <Link href={layout.layoutLink} target="_blank" rel="noopener noreferrer">
                                                Usar
                                            </Link>
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loader do Infinite Scroll */}
            {status === "LoadingMore" && (
                <div className="text-center my-6 relative max-w-xs mx-auto">
                    <hr className="absolute top-3 left-0 right-0 border-t border-green-500/30" />
                    <span className="relative inline-block bg-green-950 px-4 py-1 rounded-full text-xs border border-green-500/50 shadow-sm z-10">
                        <LoaderIcon className="size-4 animate-spin text-green-400" />
                    </span>
                </div>
            )}

            {/* Alvo do Observer */}
            <div
                className='h-2 w-full mt-4'
                ref={(el) => {
                    if (!el) return;
                    const observer = new IntersectionObserver(
                        ([entry]) => {
                            if (entry.isIntersecting && status === "CanLoadMore") {
                                loadMore(BATCH_SIZE);
                            }
                        },
                        { threshold: 0.5, rootMargin: "100px" }
                    );
                    observer.observe(el);
                    return () => observer.disconnect();
                }}
            />
        </div>
    )
}

export default LayoutList;