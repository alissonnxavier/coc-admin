/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUpadateSecondaryClanData } from "../features/secondaryClanData/api/use-update-secondary-clan-data";
import { useGetSecondaryClanData } from "../features/secondaryClanData/api/use-get-secondary-clan-data";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpadateClanData } from "../features/clanData/api/use-update-clan-data";
import { useGetClanData } from "../features/clanData/api/use-get-clan-data";
import { HeaderBar } from "@/components/header-bar";
import { ClipboardCopy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useGetThirdClanData } from "../features/thirdClanData/api/use-get-third-clan-data";
import { useUpdateThirdClanData } from "../features/thirdClanData/api/use-update-third-clan-data";

const ClanData = () => {
    const [mainData, setMainClanData] = useState<string>("");
    const [secondaryData, setSecondaryData] = useState<string>("");
    const [thirdData, setThirdData] = useState<string>("");

    const { mutate: updateMainClanData, isPending: isUpdatingMainClanData } =
        useUpadateClanData();
    const {
        mutate: updateSecondaryClanData,
        isPending: isUpdatingsecondaryClanData,
    } = useUpadateSecondaryClanData();
    const { mutate: updateThirdClanData, isPending: isUpdatingthirdClanData } =
        useUpdateThirdClanData();

    const { data: mainClanData } = useGetClanData();
    const { data: secondaryClanData } = useGetSecondaryClanData();
    const { data: thirdClanData } = useGetThirdClanData();

    const { toast } = useToast();

    const handleUpdateClan = async (
        rawInput: string,
        targetId: string | undefined,
        updateFn: Function,
        resetState: () => void
    ) => {
        if (!targetId) {
            toast({
                variant: "destructive",
                title: "Erro",
                description: "ID do clã não encontrado para atualização.",
            });
            return;
        }

        try {
            // Remove quebras de linha e faz o parse com segurança
            const cleanedInput = rawInput.replace(/[\r\n]+/g, "");
            const parsedJson = JSON.parse(cleanedInput);

            const newData = {
                clanData: parsedJson,
            };

            await updateFn(
                {
                    id: targetId,
                    data: newData,
                },
                {
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            title: "Certo!",
                            description: "Dados atualizados!",
                            action: (
                                <ToastAction
                                    altText="Fechar"
                                    className="bg-green-500 border-green-500"
                                >
                                    Fechar
                                </ToastAction>
                            ),
                        });
                        resetState();
                    },
                    onError: () => {
                        toast({
                            variant: "destructive",
                            title: "Oops!",
                            description: "Não foi possível atualizar os dados.",
                            action: (
                                <ToastAction
                                    altText="Fechar"
                                    className="bg-green-500 border-green-500"
                                >
                                    Fechar
                                </ToastAction>
                            ),
                        });
                    },
                }
            );
        } catch (error) {
            toast({
                variant: "destructive",
                title: "JSON Inválido",
                description:
                    "Verifique o formato do texto inserido na caixa de texto.",
            });
        }
    };

    const copyToClipboard = (tag: string) => {
        navigator.clipboard.writeText(tag);
        toast({
            variant: "info",
            title: "Certo!",
            description: `Tag ${tag} copiada para a área de transferência!`,
            action: (
                <ToastAction altText="Fechar" className="bg-sky-500 border-green-500">
                    Fechar
                </ToastAction>
            ),
        });
    };

    return (
        <div className="w-full">
            <div>
                <HeaderBar />
            </div>
            <div className="flex flex-col justify-center m-auto w-5/6 pb-12">
                {/* Clan Principal */}
                <div>
                    <div className="mb-4">
                        <Label className="text-2xl text-indigo-500 flex items-center gap-2">
                            TAG:
                            <Button
                                size="default"
                                variant="outline"
                                onClick={() => copyToClipboard("#292rgory0")}
                            >
                                <ClipboardCopy />
                            </Button>
                        </Label>
                        <Textarea
                            onChange={(e) => setMainClanData(e.target.value)}
                            value={mainData}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() =>
                                handleUpdateClan(
                                    mainData,
                                    mainClanData?.[0]?._id,
                                    updateMainClanData,
                                    () => setMainClanData("")
                                )
                            }
                            disabled={isUpdatingMainClanData || !mainData.trim()}
                        >
                            Atualizar dados do clan principal
                        </Button>
                    </div>
                </div>

                <Separator className="mb-10 mt-10" />

                {/* Clan Secundário */}
                <div>
                    <div className="mb-4">
                        <Label className="text-2xl text-yellow-500 flex items-center gap-2">
                            TAG:
                            <Button
                                size="default"
                                variant="outline"
                                onClick={() => copyToClipboard("#2qg98c9vc")}
                            >
                                <ClipboardCopy />
                            </Button>
                        </Label>
                        <Textarea
                            onChange={(e) => setSecondaryData(e.target.value)}
                            value={secondaryData}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() =>
                                handleUpdateClan(
                                    secondaryData,
                                    secondaryClanData?.[0]?._id,
                                    updateSecondaryClanData,
                                    () => setSecondaryData("")
                                )
                            }
                            disabled={isUpdatingsecondaryClanData || !secondaryData.trim()}
                        >
                            Atualizar dados do clan secundario
                        </Button>
                    </div>
                </div>

                <Separator className="mb-10 mt-10" />

                {/* Clan Terciário */}
                <div>
                    <div className="mb-4">
                        <Label className="text-2xl text-pink-500 flex items-center gap-2">
                            TAG:
                            <Button
                                size="default"
                                variant="outline"
                                onClick={() => copyToClipboard("#2ROUY8RJU")}
                            >
                                <ClipboardCopy />
                            </Button>
                        </Label>
                        <Textarea
                            onChange={(e) => setThirdData(e.target.value)}
                            value={thirdData}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() =>
                                handleUpdateClan(
                                    thirdData,
                                    thirdClanData?.[0]?._id,
                                    updateThirdClanData,
                                    () => setThirdData("")
                                )
                            }
                            disabled={isUpdatingthirdClanData || !thirdData.trim()}
                        >
                            Atualizar dados do clan terciario
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClanData;