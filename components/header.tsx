/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface HeaderProps {
    clanData: any;
}

export const Header = ({ clanData }: HeaderProps) => {
    return (
        <div className="flex flex-col m-5 ml-10 h-48 xl:w-full">
            <div className="text-3xl font-bold">
                {clanData.data.clanData.name}
            </div>
            <div className="text-muted-foreground text-xs">
                {clanData.data.clanData.tag}
            </div>
            <div className="text-muted-foreground text-xs">
                {clanData.data.clanData.type}
            </div>
            <div className="text-muted-foreground text-xs">
                {clanData.data.clanData.description}
            </div>
            <div className="text-muted-foreground text-xs">
                Pais {clanData.data.clanData.location.name}
            </div>
            <div className="text-muted-foreground text-xs">
                Frequencia de guerra {clanData.data.clanData.warFrequency}
            </div>
            <div className="text-muted-foreground text-xs">
                Liga {clanData.data.clanData.warLeague.name}
            </div>

        </div>
    )
}
