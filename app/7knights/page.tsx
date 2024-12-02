/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useCreateClanData } from '../features/clanData/api/use-create-clan-data';
import { record } from '@/utils/clan-data';
import { useGetClanData } from '../features/clanData/api/use-get-clan-data';
import { PacmanLoader } from 'react-spinners';
import { useUpadateClanData } from '../features/clanData/api/use-update-clan-data';
import { getClanInfo } from '@/actions/get-clan-info';
import { Menu } from '@/components/menu';
import { useGetMemberRole } from '../features/memberRole/api/use-get-member-role';
import { useCurrentUser } from '../features/auth/api/use-current-user';
import { useCreateMemberRole } from '../features/memberRole/api/use-create-member-role';
import { toast } from 'sonner';
import Image from 'next/image';
import { useGetSecondaryClanData } from '../features/secondaryClanData/api/use-get-secondary-clan-data';
import { useUpadateSecondaryClanData } from '../features/secondaryClanData/api/use-update-secondary-clan-data';


const Page = () => {

    const { mutate } = useCreateClanData();
    const { data: clanData, isLoading: isLoadingClanData } = useGetSecondaryClanData();
    const { mutate: updateClanData, isPending: isUpdatingClanData } = useUpadateSecondaryClanData();
    const [count, setCount] = useState<number>(0);
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [updatedData, setUpdatedData] = useState<any>({});

    const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
    const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole({ email: currentUser?.email as any });


    let allData;
    allData = clanData;
    let lenght = 0;

    const updateDataAndResetHolders = async () => {
        let data;
        const newData = await getClanInfo().then((res) => {

            data = {
                "clanData": res
            }
            setUpdatedData(data);
        });

        /*  updateClanData({
             id: allData![0]._id,
             data: data
         }
         ); */
    }

    const onDragEnd = (event: any) => {
        //console.log(event)

        if (event.destination.droppableId === "holder" && event.source.droppableId === "reserve") {
            allData![0].data.clanData.memberList[event.source.index].previousClanRank = 100
        };

        if (event.destination.droppableId === "reserve" && event.source.droppableId === "holder") {
            allData![0].data.clanData.memberList[event.source.index].previousClanRank = 200
        };

        updateClanData({
            id: allData![0]._id,
            data: allData![0].data
        },
            {
                onSuccess: () => {
                    toast.success("Membro alterado!");

                },
            }
        );
    };

    //@ts-ignore
    if (!clanData || memberRole?.role !== "admin") {
        return (
            <div className="w-full flex justify-center items-center h-screen animate-bounce">
                <Image
                    alt="barbaro photo"
                    width={400}
                    height={400}
                    src={'/barbaro.jpg'}
                    className="rounded-full"
                    priority
                />
            </div>
        )
    }

    return (
        <div className='w-full'>
            {/* <div className='flex justify-center p-5'>
                <Button
                    onClick={updateDataAndResetHolders}
                    variant='destructive'>
                    Resetar escala e atualizar membros
                </Button>
            </div> */}
            <div className='h-20'>
                <Menu
                    clanName={clanData![0].data.clanData.name}
                />
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
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            key={index}
                                                            className='w-28'>
                                                            <Alert variant="destructive" className="bg-green-700 border-lime-200">
                                                                <AlertTitle className="flex justify-between">
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
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}

                                                            key={index}
                                                            className='w-28'>
                                                            <Alert variant="destructive" className="bg-black">
                                                                <AlertTitle className="flex justify-between">
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
