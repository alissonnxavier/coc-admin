/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useCreateArmy } from "@/app/features/army/api/use-create-army";
import { Menu } from "@/components/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { army } from "@/utils/army-data";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export const CreateArmy = () => {

    const { mutate: createArmy, isPending: isCreatingArmy } = useCreateArmy();
    const [armyTitle, setArmyTitle] = useState<undefined | string>(undefined);
    const [armyLink, setArmyLink] = useState<undefined | string>(undefined);

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
    }

    return (
        <div className="w-full">
            <div><Menu clanName="" /></div>
            <div className="flex justify-center items-center flex-wrap gap-2 w-5/6 m-auto mt-10">
                {army.army.troops.map((trop, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg shadow-xl shadow-${trop.color}-400`}
                            width={60}
                            height={60}
                            alt={trop.name}
                            src={`/army/${trop.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.troops[index].amount = parseInt(e.target.value)
                                console.log(newArmy)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
                {army.army.spells.map((spel, index) => (
                    <div key={index}>
                        <Image
                            className={`h-16 w-16 rounded-lg shadow-xl shadow-${spel.color}-400`}
                            width={60}
                            height={60}
                            alt={spel.name}
                            src={`/army/${spel.name}.png`}
                        />
                        <Input
                            onChange={(e) => {
                                newArmy.army.spells[index].amount = parseInt(e.target.value)
                                console.log(newArmy)
                            }}
                            className="w-16"
                            type="number"
                        />
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center flex-col mt-10">
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
