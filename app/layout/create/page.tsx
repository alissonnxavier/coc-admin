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
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Tip } from "@/components/ui/tip"
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useGenerateUploadUrl } from "@/app/features/upload/api/use-generate-upload-url";
import { useCreateLayout } from "@/app/features/layout/api/use-create-layout";
import { toast } from "sonner";
import { Menu } from "@/components/menu";


const CreateLayout = () => {

    const [images, setImages] = useState<any | []>([]);
    const [layoutCv, setLayoutCv] = useState<string>("");
    const [layoutLink, setLayoutLink] = useState<string>("");
    const { mutate: generateUploadUrl, isPending: isUploading } = useGenerateUploadUrl();
    const { mutate: createLayout, isPending: isPendingCreatingLayout } = useCreateLayout();

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
                image: storageId,
            },
                {
                    onSuccess: () => {
                        toast.success("Layout criado!");
                        setImages([]);
                        setLayoutLink("");
                        setLayoutCv("")
                    },
                    onError: () => {
                        toast.error("Error, verifique todos os campos")
                    }
                },
            )
        }
    }

    return (
        <div>
            <Menu
                clanName=""
            />
            <div className="flex justify-center items-center h-screen ">
                <div className="shine-border-green p-0.5 rounded-2xl">
                    <form onSubmit={onSubmit}>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Adicionar novo layout</CardTitle>
                                <CardDescription>Insira todas as informaçoẽs.</CardDescription>
                            </CardHeader>
                            <CardContent>

                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Centro de vila</Label>
                                        <Input
                                            required
                                            id="name"
                                            placeholder="Insira o nivel do CV que o layout pertence"
                                            value={layoutCv}
                                            onChange={(e) => { setLayoutCv(e.target.value) }}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Link</Label>
                                        <Input
                                            required
                                            id="link"
                                            placeholder="Insira o link"
                                            value={layoutLink}
                                            onChange={(e) => { setLayoutLink(e.target.value) }}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Imagem</Label>
                                        <div className='pt-'>
                                            <section
                                                className="
                                            flex
                                            justify-around
                                            border-dashed 
                                            border-2 
                                            p-3
                                            border-green-500
                                            rounded-lg
                                            shadow-lg shadow-green-900/50
                                            hover:shadow-md hover:shadow-lime-300/50
                                        ">
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <div className='flex justify-center align-middle items-center'>
                                                        <Tip
                                                            message='Carregar imagens'
                                                            content={
                                                                <ImagePlus size={46} className='animate-pulse' />
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <aside>
                                                    <ul className='flex justify-center align-middle items-center'>
                                                        {images[0] != undefined && (
                                                            <>
                                                                <div >
                                                                    <Image
                                                                        className='m-1 aspect-square object-cover rounded hover:scale-150 transition'
                                                                        src={URL.createObjectURL(images[0])}
                                                                        height={38}
                                                                        width={38}
                                                                        alt='uploaded image'
                                                                    />
                                                                </div>
                                                            </>
                                                        )}

                                                    </ul>
                                                </aside>
                                            </section>
                                        </div>
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" disabled={isPendingCreatingLayout}>
                                    <Link href='/'>
                                        Cancelar
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPendingCreatingLayout}
                                >
                                    Criar
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

