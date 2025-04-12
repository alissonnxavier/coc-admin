/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';


import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useGetClanData } from '../features/clanData/api/use-get-clan-data';
import { useUpadateClanData } from '../features/clanData/api/use-update-clan-data';
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role";
import { HeaderBar } from '@/components/header-bar';
import { LogoLoader } from '@/components/logo-loader';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';


const Page = () => {

    const { data: clanData, isLoading: isLoadingClanData } = useGetClanData();
    const { mutate: updateClanData } = useUpadateClanData();
    const [count, setCount] = useState<number>(0);
    const { toast } = useToast();

    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();
    let lenght = 0;

    const onDragEnd = (event: any) => {
        if (event.destination.droppableId === "holder" && event.source.droppableId === "reserve") {
            clanData![0].data.clanData.memberList[event.source.index].previousClanRank = 100
        };

        if (event.destination.droppableId === "reserve" && event.source.droppableId === "holder") {
            clanData![0].data.clanData.memberList[event.source.index].previousClanRank = 200
        };

        updateClanData({
            id: clanData![0]._id,
            data: clanData![0].data
        },
            {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "Certo!.",
                        description: "Membro alterado.",
                        action: <ToastAction
                            altText="Fechar"
                            className='bg-green-500 border-green-500'>Fechar</ToastAction>,
                    })
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: "Oops!.",
                        description: "Tivemos um problema.",
                        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
                    })
                },
            }
        );
    };

    //@ts-ignore
    if (!clanData || memberRole?.role !== "admin" || isLoadingClanData || isLoadingMemberRole) {
        return (
            <div className='w-full '>
                <div className='mt-[0.4rem] ml-[0.6rem]'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        )
    };

    return (
        <div className='w-full'>
            <div className=''>
                <HeaderBar />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex justify-center'>
                    <div>
                        <div className='flex justify-center m-5 font-bold'>
                            Escalado {count}
                        </div>
                        <Droppable droppableId='holder'>
                            {(provided, snapshot) => (
                                <div
                                    className='flex justify-center items-center flex-wrap xl:w-96 md:w-96 sm:w-52 m-5 border border-lime-400 rounded-md p-3'
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'green' : 'white' }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {clanData![0].data.clanData.memberList.map((member: any, index: any) => {
                                        if (member.previousClanRank === 100) {
                                            setCount(lenght += 1);

                                            return (
                                                <Draggable key={index} draggableId={`draggable-0-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            key={index}
                                                            className='w-28 flex '>
                                                            <Alert
                                                                variant="default"
                                                                className="bg-green-700 border-lime-200 p-1"
                                                            >
                                                                <AlertTitle className="h-6">
                                                                    <div className="text-white font-bold">
                                                                        {member.name}
                                                                    </div>
                                                                </AlertTitle>
                                                                <AlertDescription>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="text-muted-foreground text-xs text-white">
                                                                            cv: {member.townHallLevel}
                                                                        </div>
                                                                    </div>
                                                                </AlertDescription>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div>
                        <div className='flex justify-center m-5 font-bold'>
                            Reserva
                        </div>
                        <Droppable droppableId='reserve'>
                            {(provided, snapshot) => (
                                <div
                                    className='flex justify-center items-center flex-wrap xl:w-96 md:w-96 sm:w-52 m-5 border border-rose-400 rounded-md p-3'
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'black' : 'white' }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {clanData![0].data.clanData.memberList.map((member: any, index: any) => {
                                        if (member.previousClanRank !== 100) {


                                            return (
                                                <Draggable key={index} draggableId={`draggable-1-${index}`} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}

                                                            key={index}
                                                            className='w-28'>
                                                            <Alert variant="destructive" className="bg-black">
                                                                <AlertTitle className="flex justify-between h-6">
                                                                    <div className="text-white font-bold">
                                                                        {member.name}
                                                                    </div>
                                                                </AlertTitle>
                                                                <AlertDescription>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="text-muted-foreground text-xs text-white">
                                                                            cv: {member.townHallLevel}
                                                                        </div>
                                                                        <div>

                                                                        </div>
                                                                    </div>
                                                                </AlertDescription>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            )
                                        }
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
};

export default Page;
