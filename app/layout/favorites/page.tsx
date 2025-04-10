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
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { api } from "@/convex/_generated/api"
import { usePaginatedQuery } from "convex/react"
import { cn } from '@/lib/utils';
import { HeaderBar } from '@/components/header-bar';
import { LogoLoader } from '@/components/logo-loader';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { useGeAllFavoritetLayouts } from '@/app/features/favoriteLayouts/api/use-get-favorite-layouts';
import { useRemoveFavoriteLayout } from '@/app/features/favoriteLayouts/api/use-remove-favorite-layout';

const FavoriteLayoutList = () => {
    const BATCH_SIZE = 10;

    const handleModalExpandImage = useModalExpandImage();
    const [layoutLevel, setLayoutLevel] = useState<string>("17");
    const [layoutType, setLayoutType] = useState<string>("farm");
    const dataIds = useGeAllFavoritetLayouts();
    const { mutate: removeFavoriteLayout } = useRemoveFavoriteLayout();
    

    const { results, status, loadMore } = usePaginatedQuery(
        api.favoriteLayouts.get as any,
        { layoutCv: layoutLevel, layoutType: layoutType },
        { initialNumItems: BATCH_SIZE }
    );

    if (!results || !dataIds) {
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
    };

    if (!dataIds) return;
    const starColor = (id: string) => {
        //@ts-ignore
        for (let i = 0; i < dataIds?.data?.ids?.length as any; i++) {
            //@ts-ignore
            if (id === dataIds?.data?.ids[i]?.layoutId) {
                return true
            }
        }
    };

    const favoriteLayout = (layoutId: Id<"layout">) => {
        if (starColor(layoutId)) {
            removeFavoriteLayout({
                id: layoutId
            },
                {
                    onSuccess: () => {
                        toast.success("Layout removido dos favoritos");
                    },
                    onError: (error) => {
                        toast.error("Erro ao remover layout dos favoritos");
                    },
                })
        } 
    };

    return (
        <div className='w-full '>
            <div>
                <HeaderBar />
            </div>
            <div>
                <div className=' flex items-center justify-center mb-3 gap-2'>
                    <Button onClick={() => { setLayoutLevel("17") }} size='sm' className={cn('border bg-slate-900 rounded-lg text-slate-300 border-slate-300 opacity-25 hover:opacity-70', layoutLevel === "17" && 'opacity-100')}>17</Button>
                    <Button onClick={() => { setLayoutLevel("16") }} size='sm' className={cn('border bg-orange-900 rounded-lg text-orange-300 border-orange-300 opacity-25 hover:opacity-70', layoutLevel === "16" && 'opacity-100')}>16</Button>
                    <Button onClick={() => { setLayoutLevel("15") }} size='sm' className={cn('border bg-purple-900 rounded-lg text-purple-300 border-purple-300 opacity-25 hover:opacity-70', layoutLevel === "15" && 'opacity-100')}>15</Button>
                    <Button onClick={() => { setLayoutLevel("14") }} size='sm' className={cn('border bg-green-900 rounded-lg text-green-300 border-green-300 opacity-25 hover:opacity-70', layoutLevel === "14" && 'opacity-100')}>14</Button>
                    <Button onClick={() => { setLayoutLevel("13") }} size='sm' className={cn('border bg-blue-900 rounded-lg text-blue-300 border-blue-300 opacity-25 hover:opacity-70', layoutLevel === "13" && 'opacity-100')}>13</Button>
                    <Button onClick={() => { setLayoutLevel("12") }} size='sm' className={cn('border bg-sky-700 rounded-lg text-sky-300 border-sky-300 opacity-25 hover:opacity-70', layoutLevel === "12" && 'opacity-100')}>12</Button>
                    <Button onClick={() => { setLayoutLevel("11") }} size='sm' className={cn('border bg-slate-300 rounded-lg text-black border-white opacity-25 hover:opacity-70', layoutLevel === "11" && 'opacity-100')}>11</Button>
                </div>
                <div className=' flex items-center justify-center mb-3 gap-2'>
                    <Button onClick={() => { setLayoutType("farm") }} size='sm' className={cn("border text-lime-200 bg-lime-700 border-lime-200 mt-1 opacity-25 hover:opacity-70", layoutType === "farm" && 'opacity-100')}>Farm</Button>
                    <Button onClick={() => { setLayoutType("push") }} size='sm' className={cn("border text-violet-300 bg-violet-700 border-violet-300  mt-1 opacity-25 hover:opacity-70", layoutType === "push" && 'opacity-100')}>Push</Button>
                    <Button onClick={() => { setLayoutType("war") }} size='sm' className={cn("border text-orange-600 bg-orange-900 border-orange-600 mt-1 opacity-25 hover:opacity-70", layoutType === "war" && 'opacity-100')}>War</Button>
                    <Button onClick={() => { setLayoutType("troll") }} size='sm' className={cn("border text-pink-600 bg-pink-900 border-pink-600 mt-1 opacity-25 hover:opacity-70", layoutType === "troll" && 'opacity-100')}>Troll</Button>
                </div>
            </div>
            <Separator className='mb-5 w-5/6 mx-auto' />
            <div className='flex justify-center items-center flex-wrap gap-2'>
                {results && Array.from(results).map((layout: any, index: any) => (
                    <div key={index}>
                        <div className='shine-border-green p-0.5 rounded-lg'>
                            <Card className='w-44 p-0  '>
                                <CardContent className='p-0'>
                                    <div className='flex justify-center items-center relative'>
                                        <div
                                            className={cn('border border-slate-300 absolute top-2 right-2 rounded-full p-1 gradient-background-yellow-star',
                                                starColor(layout.layoutId) && 'shine-border-green '
                                            )}
                                            onClick={() => {
                                                favoriteLayout(
                                                    layout.layoutId,
                                                                                                    );
                                            }}
                                        >
                                            <Image
                                                src={starColor(layout.layoutId) ? "/star.png" : "/black-star.png"}
                                                alt={'star'}
                                                width={25}
                                                height={25}
                                                className={cn(' text-white top-2 left-2 ',
                                                    starColor(layout.layoutId) && 'animate-bounce'
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => { handleModalExpandImage.onOpen(layout.image) }}
                                        className=''>
                                        <Image
                                            alt='layout'
                                            src={layout.image}
                                            width={300}
                                            height={200}
                                            className='rounded-md'
                                            priority
                                            style={{
                                                height: '180px',
                                            }}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className='p-0 pb-1'>
                                    <div className='flex w-full justify-around mt-2 '>
                                        <div className='flex justify-center items-center m-auto'>
                                            <div className='flex flex-row items-center text-muted-foreground text-xs m-auto'>
                                                <LayoutLevel
                                                    cv={layout.layoutCv}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center text-muted-foreground ml-2'>
                                                <LayoutType
                                                    type={layout.layoutType}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button className=' mr-2 shine-border-green font-bold text-black' variant='ghost' size='sm'>
                                                <Link href={layout.layoutLink}>
                                                    Usar
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
            {status === "LoadingMore" && (
                <div className="text-center my-2 relative">
                    <hr className="absolute top-3 left-0 right-0 border-t border-green-300" />
                    <span className="relative inline-block bg-green-900 px-4 py-1 rounded-full text-xs border border-green-300 shadow-sm">
                        <LoaderIcon className="size-4 animate-spin text-green-100" />
                    </span>
                </div>
            )}
            <div
                className='h-1'
                ref={(el) => {
                    if (el) {
                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (entry.isIntersecting && status === "CanLoadMore") {
                                    loadMore(BATCH_SIZE);
                                }
                            },
                            { threshold: 1.0 }
                        );
                        observer.observe(el);
                        return () => observer.disconnect();
                    }
                }}
            />
        </div>
    )
}

export default FavoriteLayoutList;
