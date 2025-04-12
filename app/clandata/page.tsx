/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { useUpadateSecondaryClanData } from '../features/secondaryClanData/api/use-update-secondary-clan-data';
import { useGetSecondaryClanData } from "../features/secondaryClanData/api/use-get-secondary-clan-data";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpadateClanData } from "../features/clanData/api/use-update-clan-data";
import { useGetClanData } from "../features/clanData/api/use-get-clan-data";
import { HeaderBar } from "@/components/header-bar";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";


const ClanData = () => {
    const [mainData, setMainClanData] = useState<any>(undefined);
    const [secondaryData, setSecondaryData] = useState<any>(undefined);
    const { mutate: updateSecondaryClanData, isPending: isUpdatingsecondaryClanData } = useUpadateSecondaryClanData();
    const { mutate: updateMainClanData, isPending: isUpdatingMainClanData } = useUpadateClanData();
    const { data: mainClanData, isLoading: isLoadingMainClanData } = useGetClanData();
    const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();
    const { toast } = useToast();

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
                        toast({
                            variant: "success",
                            title: "Certo!.",
                            description: "Dados atualizados!",
                            action: <ToastAction
                                altText="Fechar"
                                className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                        })
                        setMainClanData("");
                    },
                    onError: () => {
                        toast({
                            variant: "destructive",
                            title: "Oops!.",
                            description: "Não foi possivel atualizar os dados.",
                            action: <ToastAction
                                altText="Fechar"
                                className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                        })
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
                        toast({
                            variant: "success",
                            title: "Certo!.",
                            description: "Dados atualizados!",
                            action: <ToastAction
                                altText="Fechar"
                                className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                        })
                        setSecondaryData("");
                    },
                    onError: () => {
                        toast({
                            variant: "destructive",
                            title: "Oops!.",
                            description: "Não foi possivel atualizar os dados.",
                            action: <ToastAction
                                altText="Fechar"
                                className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                        })
                    }
                }
            );
        }
    };

    return (
        <div className="w-full">
            <div className=''>
                <HeaderBar />
            </div>
            <div className="flex flex-col justify-center  m-auto w-5/6 ">
                <div className="">
                    <div className="mb-4">
                        <Label className="text-2xl text-indigo-500">
                            TAG:
                            <Button
                                size='default'
                                variant='outline'
                                onClick={() => {
                                    navigator.clipboard.writeText('#292rgory0')
                                    toast({
                                        variant: "info",
                                        title: "Certo!.",
                                        description: "Tag #292rgory0 copiado para area de transferencia!",
                                        action: <ToastAction
                                            altText="Fechar"
                                            className='bg-sky-500 border-green-500'>Fechar</ToastAction>,
                                    })
                                }}
                            >
                                <ClipboardCopy />
                            </Button>
                        </Label>
                        <Textarea
                            className=""
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
                            TAG:
                            <Button
                                size='default'
                                variant='outline'
                                onClick={() => {
                                    navigator.clipboard.writeText('#2qg98c9vc')
                                    toast({
                                        variant: "info",
                                        title: "Certo!.",
                                        description: "Tag #2qg98c9vc copiado para area de transferencia!",
                                        action: <ToastAction
                                            altText="Fechar"
                                            className='bg-sky-500 border-green-500'>Fechar</ToastAction>,
                                    })
                                }}
                            >
                                <ClipboardCopy />
                            </Button>
                        </Label>
                        <Textarea
                            className=""
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