/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { useUpadateSecondaryClanData } from '../features/secondaryClanData/api/use-update-secondary-clan-data';
import { useGetSecondaryClanData } from "../features/secondaryClanData/api/use-get-secondary-clan-data";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpadateClanData } from "../features/clanData/api/use-update-clan-data";
import { useGetClanData } from "../features/clanData/api/use-get-clan-data";
import { Menu } from "@/components/menu";


export const ClanData = () => {

    const [mainData, setMainClanData] = useState<any>(undefined);
    const [secondaryData, setSecondaryData] = useState<any>(undefined);
    const { mutate: updateSecondaryClanData, isPending: isUpdatingsecondaryClanData } = useUpadateSecondaryClanData();
    const { mutate: updateMainClanData, isPending: isUpdatingMainClanData } = useUpadateClanData();
    const { data: mainClanData, isLoading: isLoadingMainClanData } = useGetClanData();
    const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();

    const updateDataAndResetHoldersOdMainClan = async () => {
        const newData = {
            "clanData": await JSON.parse(mainData.replace("/n", ""))
        };
        if (mainClanData?.[0]._id) {
            await updateMainClanData({
                id: mainClanData?.[0]._id,
                data: newData
            },
                {
                    onSuccess: () => {
                        toast.success("Dados atualizados!");
                        setMainClanData("");
                    },
                    onError: () => {
                        toast.error("Nao foi possivel atualizar os dados!");
                    }
                }
            );
        }
    };

    const updateDataAndResetHoldersOdSecondaryClan = async () => {
        const newData = {
            "clanData": await JSON.parse(secondaryData.replace("/n", ""))
        };
        if (secondaryClanData?.[0]._id) {
            await updateSecondaryClanData({
                id: secondaryClanData?.[0]._id,
                data: newData
            },
                {
                    onSuccess: () => {
                        toast.success("Dados atualizados!");
                        setSecondaryData("");
                    },
                    onError: () => {
                        toast.error("Nao foi possivel atualizar os dados!");
                    }
                }
            );
        }
    };

    return (
        <div className="w-full">
            <div className='h-20'>
                <Menu
                    clanName="Shadow"
                />
            </div>
            <div className="flex flex-col justify-center  m-auto w-5/6 h-screen">
                <div className="">
                    <div className="mb-4">
                        <Label className="text-2xl text-indigo-500">
                            TAG: #292rgory0
                        </Label>
                        <Textarea
                            className="h-56"
                            //@ts-ignore
                            onChange={(e) => { setMainClanData(e.target.value) }}
                            value={mainData}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => { updateDataAndResetHoldersOdMainClan() }}
                            disabled={isUpdatingMainClanData || mainData === undefined}
                        >
                            Update main clan data
                        </Button>
                    </div>
                </div>
                <Separator className="mb-10 mt-10" />
                <div>
                    <div className="mb-4">
                        <Label className="text-2xl text-yellow-500">
                            TAG: #2qg98c9vc
                        </Label>
                        <Textarea
                            className="h-56"
                            //@ts-ignore
                            onChange={(e) => { setSecondaryData(e.target.value) }}
                            value={secondaryData}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => { updateDataAndResetHoldersOdSecondaryClan() }}
                            disabled={isUpdatingsecondaryClanData || secondaryData === undefined}
                        >
                            Update secondary clan data
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ClanData;
