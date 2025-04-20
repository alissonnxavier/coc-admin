/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useCreateArmy } from "@/app/features/army/api/use-create-army";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role";
import { HeaderBar } from "@/components/header-bar";
import { LogoLoader } from "@/components/logo-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { army } from "@/utils/army-data";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const CreateArmy = () => {

    const { mutate: createArmy, isPending: isCreatingArmy } = useCreateArmy();
    const [armyTitle, setArmyTitle] = useState<undefined | string>(undefined);
    const [armyLink, setArmyLink] = useState<undefined | string>(undefined);

    const { isLoading: isLoadingCurrentUser } = useCurrentUser();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();

    //@ts-ignore
    if (isLoadingMemberRole || memberRole?.role !== "admin" || isLoadingCurrentUser) {
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

    const newArmy = army;

    const handleCreateNewArmy = async () => {
        await createArmy({
            data: newArmy
        },
            {
                onSuccess: () => {
                    toast.success("Army created!")
                    setArmyLink(undefined)
                    setArmyTitle(undefined)
                },
                onError: () => {
                    toast.error("something went wrong!")
                }
            }
        );
    };

    return (
        <div className="w-full">
            <div className="">
                <HeaderBar />
            </div>
            <div className="flex justify-center items-center flex-wrap gap-2 w-5/6 m-auto mt-5">
                {army.army.troops.map((trop, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={trop.name}
                            src={`/army/${trop.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.troops[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                {army.army.spells.map((spel, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={spel.name}
                            src={`/army/${spel.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.spells[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                {army.army.machines.map((machine, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={machine.name}
                            src={`/machines/${machine.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.machines[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                <Separator />
                <div className="flex flex-row flex-wrap items-center justify-center">
                    {army.army.hero.map((hero, index) => (
                        <div key={index}>
                            <div className="flex justify-center items-center h-72 mt-2">
                                <Image
                                    className={`rounded-lg`}
                                    width={200}
                                    height={100}
                                    alt={hero.name}
                                    src={`/hero/${hero.name}.png`}
                                />
                                <div className="flex items-center justify-center">
                                    <Input
                                        onChange={(e) => {
                                            newArmy.army.hero[index].amount = parseInt(e.target.value)
                                        }}
                                        className="w-16"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <Separator />
                            <div className="flex h-80">
                                <div>
                                    {hero.equipaments.map((equipament, equipamentIndex) => (
                                        <div key={index} className="flex items-center justify-center">
                                            <Image
                                                className={`rounded-lg`}
                                                width={50}
                                                height={50}
                                                alt={typeof equipament === "string" ? equipament : equipament.name}
                                                src={`/equipaments/${typeof equipament === "string" ? equipament : equipament.name}.png`}
                                            />
                                            <Input
                                                onChange={(e) => {
                                                    newArmy.army.hero[index].equipaments[equipamentIndex].amount = parseInt(e.target.value)
                                                }}
                                                className="w-16"
                                                type="number"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    {hero.pets.map((pet, equipamentIndex) => (
                                        <div key={index} className="flex items-center justify-center">
                                            <Image
                                                className={`rounded-lg`}
                                                width={50}
                                                height={50}
                                                alt={typeof pet === "string" ? pet : pet.name}
                                                src={`/pets/${typeof pet === "string" ? pet : pet.name}.png`}
                                            />
                                            <Input
                                                onChange={(e) => {
                                                    newArmy.army.hero[index].pets[equipamentIndex].amount = parseInt(e.target.value)
                                                }}
                                                className="w-16"
                                                type="number"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Separator className="mt-72" />
                {army.army.castleTroops.map((trop, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={trop.name}
                            src={`/army/${trop.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.castleTroops[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                {army.army.castleSpells.map((spel, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={spel.name}
                            src={`/army/${spel.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.castleSpells[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                {army.army.castleMachines.map((machine, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg`}
                            width={60}
                            height={60}
                            alt={machine.name}
                            src={`/machines/${machine.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.castleMachines[index].amount = parseInt(e.target.value)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                <Separator />
            </div>
            <div className="flex flex-col items-center justify-center mt-10">
                <Label>
                    Name
                </Label>
                <Input
                    onChange={(e) => {
                        newArmy.army.armyName = e.target.value
                        setArmyTitle(e.target.value)
                    }}
                    className="w-44 mb-3"
                />
                <Label>
                    Link
                </Label>
                <Input
                    onChange={(e) => {
                        newArmy.army.link = e.target.value
                        setArmyLink(e.target.value)
                    }}
                    className="w-44"
                />
            </div>
            <div className="m-auto flex items-center justify-center mt-10 gap-2">
                <Button
                    className="shadow-xl shadow-red-400"
                    onClick={() => { window.location.reload() }}
                    variant='deleteButton' size='default'>
                    <Trash2 />
                </Button>
                <Button
                    disabled={armyLink === undefined || armyTitle === undefined}
                    onClick={() => { handleCreateNewArmy() }}
                    className="shadow-xl shadow-neutral-400"
                    variant='quality'
                >
                    Create
                </Button>
            </div>
        </div>
    )
};

export default CreateArmy;
