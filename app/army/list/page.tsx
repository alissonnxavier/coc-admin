/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetArmyData } from '@/app/features/army/api/use-get-army-data';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
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
        <div className='w-full '>
            <div>
                <HeaderBar />
            </div>
            <div className='xl:w-5/6 md:w-5/6 lg:w-5/6 sm:w-full flex flex-wrap justify-start m-auto gap-y-4 mb-3'>
                {data.map((army, index) => (
                    <>
                        <ScrollArea className=''>
                            <div className='border border-indigo-200 rounded-lg p-5 bg-indigo-600'>
                                <div
                                    className='flex bg-indigo-900 rounded-lg h-36 mb-2'
                                    key={index}>
                                    <div className='flex h-36 w-12'>
                                        <img
                                            src='/sword.png'
                                            alt='sword'
                                            className='h-16 w-14 m-auto'
                                        />
                                    </div>
                                    <div className='flex justify-start h-36 items-center'>
                                        {army.data.army.troops.map((trop: any, tropIndex: number) => (
                                            <div key={tropIndex} >
                                                {trop.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border ml-1 flex flex-row gradient-background-trop-card rounded-lg shadow-md shadow-blue-300'
                                                            key={tropIndex}>
                                                            <div className='h-26 w-24'>
                                                                <p className='text-lg font-bold'
                                                                >
                                                                    {trop.amount}x
                                                                </p>
                                                                <img
                                                                    src={`/army/${trop.name}.png`}
                                                                    alt={trop.name}
                                                                    className='flex justify-center items-center m-auto h-[5.5rem] w-[5.8rem] rounded-b-lg shadow-xl'
                                                                />
                                                            </div>

                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex justify-start h-36 items-center'>
                                        {army.data.army.spells.map((spell: any, spellsIndex: number) => (
                                            <div key={spellsIndex} >
                                                {spell.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border ml-1 flex flex-row gradient-background-trop-card rounded-lg shadow-md shadow-blue-300'
                                                            key={spellsIndex}>

                                                            <div className='h-26 w-24'>
                                                                <p className='text-lg font-bold'
                                                                >
                                                                    {spell.amount}x
                                                                </p>
                                                                <img
                                                                    src={`/army/${spell.name}.png`}
                                                                    alt={spell.name}
                                                                    className='flex justify-center items-center m-auto h-[5.5rem] w-[5.8rem] rounded-b-lg shadow-xl'
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='bg-indigo-900 rounded-lg flex flex-row justify-start items-center gap-2 h-36 '>
                                    <div className='flex justify-center items-center h-36 w-12'>
                                        <img
                                            src='/crown.png'
                                            alt='sword'
                                            className='h-14 w-14 flex justify-center items-center'
                                        />
                                    </div>
                                    {army.data.army.hero.map((hero: any, heroIndex: number) => (
                                        <>
                                            <div className='flex flex-row gap-1'>
                                                {hero.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border h-[7.3rem] w-24 relative gradient-background-hero-card rounded-lg shadow-md shadow-green-300'
                                                            key={heroIndex}>
                                                            <img
                                                                src={`/hero/${hero.name}.png`}
                                                                alt={hero.name}
                                                                className='h-[7.3rem] w-28 rounded-b-lg shadow-xl object-cover'
                                                            />
                                                        </div>
                                                        <div className=''>
                                                            <div className='flex flex-row gap-1 mb-1'>
                                                                {hero.equipaments.map((equipament: any, equipamentIndex: number) => (
                                                                    <>
                                                                        {equipament.amount > 0 && (
                                                                            <div
                                                                                className='border h-14 w-12 relative gradient-background-equipament-card rounded-lg shadow-md shadow-blue-300'
                                                                                key={equipamentIndex}>
                                                                                <Image
                                                                                    alt={equipament.name}
                                                                                    src={`/equipaments/${equipament.name}.png`}
                                                                                    className={`rounded-b-lg`}
                                                                                    sizes="(min-width: 80px) 5vw, 10vw"
                                                                                    fill
                                                                                    style={{
                                                                                        objectFit: 'contain', // cover, contain, none
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </div>
                                                            <div className='flex justify-center items-center'>
                                                                {hero.pets.map((pet: any, petIndex: number) => (
                                                                    <>
                                                                        {pet.amount > 0 && (
                                                                            <div
                                                                                className='border h-14 w-24 relative gradient-background-pet-card rounded-lg shadow-md shadow-amber-500'
                                                                                key={petIndex}
                                                                            >

                                                                                <img
                                                                                    src={`/pets/${pet.name}.png`}
                                                                                    alt={pet.name}
                                                                                    className={`m-auto mt-1 h-12 w-14 rounded-b-lg shadow-xl object-cover`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    ))}
                                    <div className='bg-indigo-900 rounded-lg flex flex-row justify-start items-center h-36 '>
                                        <div className='flex h-36 w-12'>
                                            <img
                                                src='/castle.png'
                                                alt='castle'
                                                className='h-12 w-12 m-auto'
                                            />
                                        </div>
                                        {army.data.army.castleTroops.map((castleTrop: any, castleTropIndex: number) => (
                                            <div key={castleTropIndex} >
                                                {castleTrop.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border ml-1 flex flex-row gradient-background-trop-card rounded-lg shadow-md shadow-blue-300'>

                                                            <div className='w-24'>
                                                                <p className='text-lg font-bold'
                                                                >
                                                                    {castleTrop.amount}x
                                                                </p>
                                                                <img
                                                                    src={`/army/${castleTrop.name}.png`}
                                                                    alt={castleTrop.name}
                                                                    className='flex justify-center items-center m-auto h-[5.5rem] w-[5.8rem] rounded-b-lg shadow-xl'
                                                                />
                                                            </div>

                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        ))}
                                        {army.data.army.castleSpells.map((castleSpel: any, castleSpelIndex: number) => (
                                            <div key={castleSpelIndex} >
                                                {castleSpel.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border ml-1 flex flex-row gradient-background-trop-card rounded-lg shadow-md shadow-blue-300'>

                                                            <div className='w-24'>
                                                                <p className='text-lg font-bold'
                                                                >
                                                                    {castleSpel.amount}x
                                                                </p>
                                                                <img
                                                                    src={`/army/${castleSpel.name}.png`}
                                                                    alt={castleSpel.name}
                                                                    className='flex justify-center items-center m-auto h-[5.5rem] w-[5.8rem] rounded-b-lg shadow-xl'
                                                                />
                                                            </div>

                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        ))}
                                        {army.data.army.castleMachines.map((castleMachine: any, castleMachineIndex: number) => (
                                            <div key={castleMachineIndex} >
                                                {castleMachine.amount > 0 && (
                                                    <>
                                                        <div
                                                            className='border ml-1 flex flex-row gradient-background-trop-card rounded-lg shadow-md shadow-blue-300'>

                                                            <div className='w-24'>
                                                                <p className='text-lg font-bold'
                                                                >
                                                                    {castleMachine.amount}x
                                                                </p>
                                                                <img
                                                                    src={`/machines/${castleMachine.name}.png`}
                                                                    alt={castleMachine.name}
                                                                    className='flex justify-center items-center m-auto h-[5.5rem] w-[5.8rem] rounded-b-lg shadow-xl'
                                                                />
                                                            </div>

                                                        </div>
                                                    </>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <ScrollBar orientation='horizontal' />
                        </ScrollArea >
                        <div className='flex flex-row items-center p-2 w-full'>
                            <Link href={army.data.army.link}>
                                <Button className='mr-5 gradient-background-variation-button text-white border-4 border-indigo-500'>
                                    Usar
                                </Button>
                            </Link>
                            <p className='text-white font-bold text-2xl'>{army.data.army.armyName}</p>

                        </div>
                    </>
                ))}
            </div>
        </div>
    )
};

export default ArmyList;
