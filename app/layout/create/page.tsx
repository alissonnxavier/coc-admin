/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Tip } from "@/components/ui/tip"
import { ImagePlus, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useGenerateUploadUrl } from "@/app/features/upload/api/use-generate-upload-url";
import { useCreateLayout } from "@/app/features/layout/api/use-create-layout";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeaderBar } from "@/components/header-bar";
import { LogoLoader } from "@/components/logo-loader";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const CreateLayout = () => {
    const [images, setImages] = useState<any | []>([]);
    const [layoutCv, setLayoutCv] = useState<string>("");
    const [layoutType, setLayoutType] = useState<string>("");
    const [layoutLink, setLayoutLink] = useState<string>("");
    const { mutate: generateUploadUrl, isPending: isUploading } = useGenerateUploadUrl();
    const { mutate: createLayout, isPending: isPendingCreatingLayout } = useCreateLayout();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();
    const { toast } = useToast();

    const handleDrop = useCallback(async (files: any) => {
        setImages(files);
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        disabled: false,
        accept: {
            'image/jpeg': [],
            'image/jpg': [],
            'image/png': [],
        },
        maxFiles: 1,
    });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (images) {
            const url = await generateUploadUrl({}, { throwError: true });

            if (!url) {
                throw new Error("URL not found!")
            };

            const result = await fetch(url, {
                method: "POST",
                headers: { "Content-type": images[0]!.type },
                body: images[0],
            });

            const { storageId } = await result.json();

            createLayout({
                layoutLink: layoutLink,
                layoutCv: layoutCv,
                layoutType: layoutType,
                image: storageId,
            },
                {
                    onSuccess: () => {
                        toast({
                            variant: "success",
                            title: "Feito!",
                            description: "Layout criado com sucesso.",
                            action: <ToastAction
                                altText="Fechar"
                                className='bg-green-600 hover:bg-green-700 text-white font-bold border-2 border-green-950 shadow-md'>Fechar</ToastAction>,
                        })
                        setImages([]);
                        setLayoutLink("");
                        setLayoutCv("")
                        setLayoutType("")
                    },
                    onError: () => {
                        toast({
                            variant: "destructive",
                            title: "Oops!",
                            description: "Tivemos um problema ao criar o layout.",
                            action: <ToastAction altText="Fechar">Fechar</ToastAction>,
                        })
                    }
                },
            )
        }
    };

    //@ts-ignore
    if (isLoadingMemberRole || memberRole?.role !== "admin") {
        return (
            <div className='w-full mb-5 min-h-screen bg-stone-950 text-amber-50'>
                <div className='mt-[0.4rem] ml-[0.6rem]'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-stone-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-950 to-stone-950 text-amber-50 pb-12 select-none">
            <div>
                <HeaderBar />
            </div>

            <div className="flex justify-center items-center mt-12 px-4">
                {/* Moldura Externa Estilo Painel de Madeira/Metal CoC */}
                <div className="p-1.5 rounded-2xl bg-gradient-to-b from-amber-600 via-amber-800 to-amber-950 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-amber-950">
                    <form onSubmit={onSubmit}>
                        <Card className="w-full max-w-[400px] sm:w-[380px] bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 border-2 border-stone-800 rounded-xl text-amber-50 shadow-inner overflow-hidden">

                            {/* Cabeçalho de Painel de Guerra */}
                            <CardHeader className="bg-gradient-to-b from-amber-700 to-amber-900 border-b-2 border-amber-950 text-center relative py-4 shadow-md">
                                <div className="absolute top-2 left-3 text-amber-300 opacity-30 text-xs tracking-widest font-mono">CoC BUILDER</div>
                                <CardTitle className="text-2xl font-black tracking-wide text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
                                    Adicionar Layout
                                </CardTitle>
                                <CardDescription className="text-amber-200/80 text-xs font-semibold">
                                    Insira as informações do seu mapa de vila
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-4">
                                <div className="grid w-full items-center gap-4">

                                    {/* Select Centro de Vila */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="text-amber-300 font-bold text-sm tracking-wide flex items-center gap-1 drop-shadow-sm">
                                            Centro de Vila (CV)
                                        </Label>
                                        <Select
                                            required
                                            onValueChange={(e) => { setLayoutCv(e) }}
                                            value={layoutCv}
                                        >
                                            <SelectTrigger className="w-full bg-stone-950 border-2 border-amber-900/60 focus:border-amber-500 text-amber-100 font-bold rounded-lg shadow-inner h-11">
                                                <SelectValue placeholder="Selecione o CV" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-stone-900 border-2 border-amber-800 text-amber-100 font-bold">
                                                <SelectGroup>
                                                    {["18", "17", "16", "15", "14", "13", "12", "11"].map((cv) => (
                                                        <SelectItem key={cv} value={cv} className="focus:bg-amber-600 focus:text-white cursor-pointer my-0.5 rounded">
                                                            CV {cv}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Select Tipo de Layout */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="text-amber-300 font-bold text-sm tracking-wide drop-shadow-sm">
                                            Tipo do Layout
                                        </Label>
                                        <Select
                                            required
                                            onValueChange={(e) => { setLayoutType(e) }}
                                            value={layoutType}
                                        >
                                            <SelectTrigger className="w-full bg-stone-950 border-2 border-amber-900/60 focus:border-amber-500 text-amber-100 font-bold rounded-lg shadow-inner h-11">
                                                <SelectValue placeholder="Selecione a categoria" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-stone-900 border-2 border-amber-800 text-amber-100 font-bold">
                                                <SelectGroup>
                                                    <SelectItem value="farm" className="focus:bg-amber-600 focus:text-white cursor-pointer my-0.5 rounded">🌾 Farm (Recursos)</SelectItem>
                                                    <SelectItem value="push" className="focus:bg-amber-600 focus:text-white cursor-pointer my-0.5 rounded">🏆 Push (Troféus)</SelectItem>
                                                    <SelectItem value="war" className="focus:bg-amber-600 focus:text-white cursor-pointer my-0.5 rounded">⚔️ War (Guerra)</SelectItem>
                                                    <SelectItem value="troll" className="focus:bg-amber-600 focus:text-white cursor-pointer my-0.5 rounded">Troll / Layout Divertido</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Input do Link */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="link" className="text-amber-300 font-bold text-sm tracking-wide drop-shadow-sm">
                                            Link do Layout
                                        </Label>
                                        <Input
                                            required
                                            id="link"
                                            placeholder="https://link.clashofclans.com/..."
                                            value={layoutLink}
                                            onChange={(e) => { setLayoutLink(e.target.value) }}
                                            className="bg-stone-950 border-2 border-amber-900/60 focus:border-amber-500 text-amber-100 placeholder:text-stone-600 font-medium rounded-lg shadow-inner h-11"
                                        />
                                    </div>

                                    {/* Upload de Imagem Dropzone */}
                                    <div className="flex flex-col space-y-1.5">
                                        <Label className="text-amber-300 font-bold text-sm tracking-wide drop-shadow-sm">
                                            Print / Imagem do Layout
                                        </Label>
                                        <div className="pt-1">
                                            <section
                                                className="
                                                flex justify-center items-center
                                                border-2 border-dashed border-amber-600/70 hover:border-amber-400
                                                p-4 bg-stone-950/80 rounded-xl
                                                shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]
                                                transition-all cursor-pointer group hover:bg-stone-900/50
                                            ">
                                                <div {...getRootProps({ className: 'dropzone w-full flex flex-col items-center justify-center' })}>
                                                    <input {...getInputProps()} />
                                                    <Tip
                                                        message='Clique ou arraste a imagem'
                                                        content={
                                                            <div className="flex flex-col items-center gap-1">
                                                                <ImagePlus size={36} className='text-amber-400 group-hover:scale-110 transition-transform animate-pulse' />
                                                                <span className="text-xs text-amber-200/70 font-semibold mt-1">Carregar Screenshot</span>
                                                            </div>
                                                        }
                                                    />
                                                </div>

                                                {images[0] !== undefined && (
                                                    <div className="ml-3 border-2 border-amber-500 rounded-lg overflow-hidden shadow-md shadow-amber-950/50 bg-stone-900">
                                                        <Image
                                                            className='aspect-square object-cover hover:scale-110 transition duration-300'
                                                            src={URL.createObjectURL(images[0])}
                                                            height={48}
                                                            width={48}
                                                            alt='uploaded image'
                                                        />
                                                    </div>
                                                )}
                                            </section>
                                        </div>
                                    </div>

                                </div>
                            </CardContent>

                            {/* Rodapé com Botões 3D */}
                            <CardFooter className="flex justify-between gap-3 pt-2 pb-6 px-6">
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isPendingCreatingLayout}
                                    asChild
                                    className="w-1/2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border-2 border-stone-950 font-bold shadow-[0_4px_0_#1c1917] active:translate-y-1 active:shadow-none transition-all rounded-lg"
                                >
                                    <Link href='/' className="flex items-center justify-center">
                                        Cancelar
                                    </Link>
                                </Button>

                                {/* Botão Verde Clássico do Clash of Clans */}
                                <Button
                                    type="submit"
                                    disabled={isPendingCreatingLayout}
                                    className="w-1/2 bg-gradient-to-b from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 text-amber-950 font-black text-base uppercase tracking-wider border-2 border-green-950 shadow-[0_4px_0_#14532d] active:translate-y-1 active:shadow-none transition-all rounded-lg drop-shadow-sm"
                                >
                                    {isPendingCreatingLayout ? "Criando..." : "Criar"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default CreateLayout;