/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';


import { useGetLayout } from '@/app/features/layout/api/use-get-layout';
import LayoutLevel from '@/components/layout-level';
import LayoutType from '@/components/layout-type';
import { Menu } from '@/components/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LayoutList = () => {

    const { results, status, loadMore } = useGetLayout();

    if (!results) {
        return (
            <div className="flex justify-center items-center h-screen animate-bounce">
                <Image
                    alt="barbaro photo"
                    width={400}
                    height={400}
                    src={'/barbaro.jpg'}
                    className="rounded-full "
                    priority
                />
            </div>
        )
    }

    return (
        <div>
            <Menu
                clanName=''
            />
            <div className='flex justify-center items-center flex-wrap gap-2'>
                {results && Array.from(results).map((layout: any, index: any) => (
                    <div key={index}>
                        <div className='shine-border-green p-0.5 rounded-lg'>
                            <Card className='w-44 p-0  '>
                                <CardContent className='p-0'>
                                    <div className='hover:scale-110 transition'>
                                        <Image
                                            alt='lay'
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
                                <CardFooter className='p-0 pb-5'>
                                    <div className='flex w-full justify-between mt-2 pb-2'>
                                        <div className='flex justify-center items-center flex-col m-auto mt-2'>
                                            <div className='flex flex-row items-center text-muted-foreground text-xs m-auto'>
                                                <LayoutLevel
                                                    cv={layout.layoutCv}
                                                />
                                            </div>
                                            <div className='flex flex-row items-center text-muted-foreground text-xs m-auto'>
                                                <LayoutType
                                                    type={layout.layoutType}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button className='game-button mr-2' variant='quality' size='sm'>
                                                <Link href={layout.layoutLink}>
                                                    Copiar | Usar
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
            <div
                className='h-1'
                ref={(el) => {
                    if (el) {
                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (entry.isIntersecting && status === "CanLoadMore") {
                                    loadMore();
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

export default LayoutList;
