/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { HeaderBar } from '@/components/header-bar';
import { LogoLoader } from '@/components/logo-loader';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useGetMemberRole } from '../features/memberRole/api/use-get-member-role';
import { useGetSecondaryClanData } from '../features/secondaryClanData/api/use-get-secondary-clan-data';
import { useUpadateSecondaryClanData } from '../features/secondaryClanData/api/use-update-secondary-clan-data';

const Page = () => {
    const { data: clanData, isLoading: isLoadingClanData } = useGetSecondaryClanData();
    const { mutate: updateClanData } = useUpadateSecondaryClanData();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();
    const { toast } = useToast();


    const onDragEnd = (event: any) => {
        if (!event.destination) return;

        if (event.destination.droppableId === "holder" && event.source.droppableId === "reserve") {
            clanData![0].data.clanData.memberList[event.source.index].previousClanRank = 100;
        }

        if (event.destination.droppableId === "reserve" && event.source.droppableId === "holder") {
            clanData![0].data.clanData.memberList[event.source.index].previousClanRank = 200;
        }

        updateClanData(
            {
                id: clanData![0]._id,
                data: clanData![0].data
            },
            {
                onSuccess: () => {
                    toast({
                        variant: "success",
                        title: "Certo!",
                        description: "Membro alterado com sucesso.",
                        action: (
                            <ToastAction altText="Fechar" className='bg-green-600 hover:bg-green-700 border-stone-800 text-white font-bold'>
                                Fechar
                            </ToastAction>
                        ),
                    });
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: "Oops!",
                        description: "Tivemos um problema ao salvar.",
                        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
                    });
                },
            }
        );
    };

    //@ts-ignore
    if (!clanData || memberRole?.role !== "admin" || isLoadingClanData || isLoadingMemberRole) {
        return (
            <div className='w-full min-h-screen bg-stone-900'>
                <div className='pt-2 pl-2'>
                    <HeaderBar />
                </div>
                <div className='flex justify-center items-center mt-44'>
                    <LogoLoader />
                </div>
            </div>
        );
    }

    const memberList = clanData[0]?.data?.clanData?.memberList || [];
    const countEscalados = memberList.filter((m: any) => m.previousClanRank === 100).length;
    const countReserva = memberList.filter((m: any) => m.previousClanRank !== 100).length;


    return (
        <div className="w-full min-h-screen bg-stone-950 text-amber-50 select-none pb-10">
            <div className="h-20">
                <HeaderBar />
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex flex-wrap justify-center gap-8 p-4 mt-4'>

                    {/* COLUNA: ESCALADOS */}
                    <div className='flex flex-col items-center'>
                        <div className='mb-3 px-6 py-1.5 bg-gradient-to-b from-amber-400 to-amber-600 border-2 border-amber-950 rounded-xl shadow-[0_4px_0_0_#451a03] flex items-center gap-2'>
                            <span className='text-amber-950 font-black tracking-wider uppercase text-sm drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]'>
                                Escalados:
                            </span>
                            <span className='bg-amber-950 text-amber-300 px-2.5 py-0.5 rounded-lg text-xs font-black shadow-inner'>
                                {countEscalados}
                            </span>
                        </div>

                        <Droppable droppableId='holder'>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col gap-2.5 w-72 sm:w-80 min-h-[350px] p-3 rounded-2xl border-4 transition-all duration-200 ${snapshot.isDraggingOver
                                        ? 'bg-emerald-950/70 border-emerald-500/80 shadow-[inset_0_0_20px_rgba(16,185,129,0.3)]'
                                        : 'bg-stone-900/90 border-amber-800/40 shadow-inner'
                                        }`}
                                >
                                    {memberList.map((member: any, index: number) => {
                                        if (member.previousClanRank === 100) {
                                            return (
                                                <Draggable key={`escalado-${index}`} draggableId={`draggable-0-${index}`} index={index}>
                                                    {(provided, dragSnapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`transition-transform ${dragSnapshot.isDragging ? 'scale-105 rotate-1 z-50' : ''}`}
                                                        >
                                                            <Alert className="relative bg-gradient-to-b from-emerald-600 to-teal-800 border-2 border-emerald-950 rounded-xl p-2.5 shadow-[0_4px_0_0_#064e3b] hover:brightness-110 active:translate-y-1 active:shadow-none cursor-grab active:cursor-grabbing">
                                                                <div className="flex items-center justify-between">
                                                                    <AlertTitle className="m-0 p-0">
                                                                        <span className="text-white font-extrabold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-sm">
                                                                            {member.name}
                                                                        </span>
                                                                    </AlertTitle>

                                                                    {/* BADGE CV ESTILO COC */}
                                                                    <div className="flex items-center justify-center bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-950 rounded-md px-1.5 py-0.5 shadow-[0_2px_0_0_#451a03]">
                                                                        <span className="text-[10px] font-black text-amber-950 uppercase tracking-tighter mr-0.5">CV</span>
                                                                        <span className="text-xs font-black text-amber-950 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                                                                            {member.townHallLevel}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                        return null;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    {/* COLUNA: RESERVA */}
                    <div className='flex flex-col items-center'>
                        <div className='mb-3 px-6 py-1.5 bg-gradient-to-b from-stone-600 to-stone-800 border-2 border-stone-950 rounded-xl shadow-[0_4px_0_0_#0c0a09] flex items-center gap-2'>
                            <span className='text-stone-200 font-black tracking-wider uppercase text-sm drop-shadow-[0_1px_0_rgba(0,0,0,0.8)]'>
                                Reserva
                            </span>
                            <span className='bg-stone-700 text-stone-300 px-2.5 py-0.5 rounded-lg text-xs font-black shadow-inner'>
                                {countReserva}
                            </span>
                        </div>

                        <Droppable droppableId='reserve'>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`flex flex-col gap-2.5 w-72 sm:w-80 min-h-[350px] p-3 rounded-2xl border-4 transition-all duration-200 ${snapshot.isDraggingOver
                                        ? 'bg-rose-950/70 border-rose-600/80 shadow-[inset_0_0_20px_rgba(225,29,72,0.3)]'
                                        : 'bg-stone-900/90 border-stone-800/40 shadow-inner'
                                        }`}
                                >
                                    {memberList.map((member: any, index: number) => {
                                        if (member.previousClanRank !== 100) {
                                            return (
                                                <Draggable key={`reserva-${index}`} draggableId={`draggable-1-${index}`} index={index}>
                                                    {(provided, dragSnapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`transition-transform ${dragSnapshot.isDragging ? 'scale-105 -rotate-1 z-50' : ''}`}
                                                        >
                                                            <Alert className="relative bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-stone-950 rounded-xl p-2.5 shadow-[0_4px_0_0_#0c0a09] hover:brightness-125 active:translate-y-1 active:shadow-none cursor-grab active:cursor-grabbing">
                                                                <div className="flex items-center justify-between">
                                                                    <AlertTitle className="m-0 p-0">
                                                                        <span className="text-stone-300 font-extrabold tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] text-sm">
                                                                            {member.name}
                                                                        </span>
                                                                    </AlertTitle>

                                                                    {/* BADGE CV RESERVA */}
                                                                    <div className="flex items-center justify-center bg-stone-700 border border-stone-950 rounded-md px-1.5 py-0.5 shadow-[0_2px_0_0_#0c0a09]">
                                                                        <span className="text-[10px] font-black text-stone-400 uppercase tracking-tighter mr-0.5">CV</span>
                                                                        <span className="text-xs font-black text-stone-200">
                                                                            {member.townHallLevel}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Alert>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                        return null;
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </div>
            </DragDropContext>
        </div>
    );
};

export default Page;