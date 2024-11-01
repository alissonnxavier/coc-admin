/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Image from 'next/image';

interface MainMemberPrimaryClanProps {
    data: any;
}

export const MainMemberPrimaryClan = ({data}: MainMemberPrimaryClanProps) => {
    return (
        <div className="flex flex-row flex-wrap justify-center items-center gap-1 xl:w-4/6 mb-5">
            {data.data.clanData.memberList.map((memeber: any, index: any) => {
                if (memeber.previousClanRank === 100) {
                    return (
                        <div key={index} className="w-40 shine-border p-1 rounded-md">
                            <div className="">
                                <Alert variant="purple" className="bg-black">
                                    <AlertTitle className="flex justify-between">
                                        <div className="text-white font-bold">
                                            {memeber.name}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                            {memeber.role}
                                        </div>
                                    </AlertTitle>
                                    <AlertDescription>
                                        <div className="flex items-center justify-between">
                                            <div className="text-muted-foreground text-xs text-white">
                                                CV: {memeber.townHallLevel}
                                            </div>
                                            <div>
                                                <Image
                                                    alt="ligue"
                                                    src={memeber.league.iconUrls.tiny}
                                                    width={25}
                                                    height={25}
                                                />
                                            </div>
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
