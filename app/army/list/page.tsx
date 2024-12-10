/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetArmyData } from '@/app/features/army/api/use-get-army-data';
import { Menu } from '@/components/menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from "next/image";
import Link from 'next/link';

export const ArmyList = () => {

    const { data, isLoading } = useGetArmyData();

    if (!data) {
        return null;
    }

    return (
        <div className='w-full'>
            <div><Menu clanName='' /></div>
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
                                <CardContent className='w-full flex h-40 justify-start items-center flex-wrap'>
                                    {Array.from(army.data.army.troops).map((trop: any, index: any) => (
                                        <div
                                            className='flex justify-start'
                                            key={index}
                                        >
                                            {trop.amount > 0 && (
                                                <div >
                                                    <span className='absolute drop-shadow-2xl text-2xl font-bold'>x{trop.amount}</span>
                                                    <Image
                                                        className={`h-16 w-16 rounded-lg shadow-xl shadow-${trop.color}-400`}
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
                                                    <span className='absolute drop-shadow-2xl  text-2xl font-bold'>x{spel.amount}</span>
                                                    <Image
                                                        className={`h-16 w-16 rounded-lg shadow-xl shadow-${spel.color}-400`}
                                                        width={60}
                                                        height={60}
                                                        alt={spel.name}
                                                        src={`/army/${spel.name}.png`}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className='w-full justify-end'>
                                    <Link href={army.data.army.link}>
                                        <Button variant='quality'>
                                            Use
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
