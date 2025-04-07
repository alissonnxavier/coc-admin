/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetArmyData } from '@/app/features/army/api/use-get-army-data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

    if (!data) return;

    return (
        <div className='w-full'>
            <div>
                <HeaderBar />
            </div>
            <div className='w-full mt-10 items-center justify-center mx-auto'>
                <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                    {data.map((army, index) => (
                        <div
                            className='flex flex-row flex-wrap'
                            key={index}>
                            <Card className='w-80'>
                                <CardHeader className='w-full'>
                                    <CardTitle className='text-indigo-200'>{army.data.army.armyName}</CardTitle>
                                </CardHeader>
                                <CardContent className=''>
                                    <ScrollArea className='h-52'>
                                        <div className='flex flex-wrap'>
                                            {Array.from(army.data.army.troops).map((trop: any, index: any) => (
                                                <div
                                                    className='flex justify-start rounded'
                                                    key={index}
                                                >
                                                    {trop.amount > 0 && (
                                                        <div >
                                                            <p className='flex justify-center text-xs font-bold bg-sky-400 rounded-t-lg'>
                                                                x{trop.amount}
                                                            </p>
                                                            <Image
                                                                className={`h-16 w-16 rounded-b-lg shadow-xl`}
                                                                width={60}
                                                                height={60}
                                                                alt={trop.name}
                                                                src={`/army/${trop.name}.png`}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {Array.from(army.data.army.spells).map((spel: any, index: any) => (
                                                <div
                                                    className=''
                                                    key={index}
                                                >
                                                    {spel.amount > 0 && (
                                                        <div>
                                                            <p className='flex justify-center rounded-t-lg text-xs font-bold bg-yellow-700'>
                                                                x{spel.amount}
                                                            </p>
                                                            <Image
                                                                className={`h-16 w-16 rounded-b-lg shadow-xl`}
                                                                width={60}
                                                                height={60}
                                                                alt={spel.name}
                                                                src={`/army/${spel.name}.png`}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                                <CardFooter className='w-full justify-end'>
                                    <Link href={army.data.army.link}>
                                        <Button className='gradient-background-use-button font-bold' variant='ghost'>
                                            Usar
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )


};

export default ArmyList;
