/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Image from 'next/image';

interface MainMemberPrimaryClanProps {
    data: any;
}

export const MainMemberPrimaryClan = ({ data }: MainMemberPrimaryClanProps) => {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 xl:w-4/6 mb-5">
            {data?.data?.clanData?.memberList?.map((member: any, index: any) => {
                if (member.previousClanRank === 100) {
                    return (
                        <div key={index} className="w-40 shine-border p-1 rounded-md flex-shrink-0">
                            <Alert variant="purple" className="bg-black p-3 block w-full overflow-hidden">
                                <AlertTitle className="flex flex-col gap-0.5 mb-2">
                                    <div
                                        className="text-white font-bold text-sm truncate w-full"
                                        title={member.name}
                                    >
                                        {member.name}
                                    </div>
                                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider truncate w-full">
                                        {member.role}
                                    </div>
                                </AlertTitle>
                                <AlertDescription>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="text-xs text-white font-medium">
                                            CV: {member.townHallLevel}
                                        </div>
                                     
                                    </div>
                                </AlertDescription>
                            </Alert>
                        </div>
                    )
                }
                return null;
            })}
        </div>
    )
}