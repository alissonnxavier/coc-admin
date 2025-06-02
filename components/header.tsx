/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
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
            <Link href={`https://link.clashofclans.com/pt?action=OpenClanProfile&tag=${clanData.data.clanData.tag}`}>
                <div className="flex justify-start items-center text-muted-foreground text-xs gap-x-2 text-sky-400">
                    {clanData.data.clanData.tag} <ExternalLink size={12} />
                </div>
            </Link>
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
