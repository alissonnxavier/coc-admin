/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useCreateClanData } from '../features/clanData/api/use-create-clan-data';
import { record } from '@/utils/clan-data';
import { useGetClanData } from '../features/clanData/api/use-get-clan-data';
import { PacmanLoader } from 'react-spinners';
import { useUpadateClanData } from '../features/clanData/api/use-update-clan-data';


const Page = () => {

    const { mutate } = useCreateClanData();
    const { data: clanData, isLoading: isLoadingClanData } = useGetClanData();
    const { mutate: updateClanData, isPending: isUpdatingClanData } = useUpadateClanData();

    let allData;
    allData = clanData;
    let a = clanData





    const onDragEnd = (event: any) => {
        console.log(allData![0].data)
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
        })

    }

    if (!clanData) {
        return (
            <div className='flex justify-center items-center h-screen animate-bounce '>
                <PacmanLoader size={100} color='#220452' className='' />
            </div>
        )
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='flex justify-center'>
                    <div>
                        <div className='flex justify-center m-5 font-bold'>
                            Escalado
                        </div>
                        <Droppable droppableId='holder'>
                            {(provided, snapshot) => (
                                <div
                                    className='flex justify-center items-center flex-wrap w-96 m-5 border border-lime-400 rounded-md p-3'
                                    style={{ backgroundColor: snapshot.isDraggingOver ? 'green' : 'white' }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {clanData![0].data.clanData.memberList.map((member: any, index: any) => {
                                        if (member.previousClanRank === 100) {
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
                                    className='flex justify-center items-center flex-wrap w-96 m-5 border border-rose-400 rounded-md p-3'
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
