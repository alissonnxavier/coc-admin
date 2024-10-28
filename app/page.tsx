'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from "react";
import { getClanInfo } from "@/actions/get-clan-info";
import { staticClanData } from "@/utils/clan-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import UserButton from "./features/auth/components/user-button";
import { useGetClanData } from "./features/clanData/api/use-get-clan-data";

interface PlayerProps {
  playerData: any;
}

export default function Home() {

  const [data, setData] = useState<any>();

  const { data: clanData, isLoading: isLoadingClanData } = useGetClanData();

  if (!clanData) {
    return (
      <div>
        loading
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <UserButton />
        <div className="mr-5">
          <Image
            alt="clan badge"
            src={staticClanData.badgeUrls.medium}
            width={350}
            height={350}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            {staticClanData.name}
          </div>
          <div className="text-muted-foreground text-xs">
            {staticClanData.tag}
          </div>
          <div className="text-muted-foreground text-xs">
            {staticClanData.type}
          </div>
          <div className="text-muted-foreground text-xs">
            {staticClanData.description}
          </div>
          <div className="text-muted-foreground text-xs">
            Pais {staticClanData.location.name}
          </div>
          <div className="text-muted-foreground text-xs">
            Clan lever {staticClanData.clanLevel}
          </div>
          <div className="text-muted-foreground text-xs">
            Pontos do clan {staticClanData.clanPoints}
          </div>
          <div className="text-muted-foreground text-xs">
            Frequencia de guerra {staticClanData.warFrequency}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras ganhas {staticClanData.warWins}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras empatadas {staticClanData.warTies}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras perdidas {staticClanData.warLosses}
          </div>
          <div className="text-muted-foreground text-xs">
            Liga {staticClanData.warLeague.name}
          </div>
          <div className="text-muted-foreground text-xs">
            Membros {staticClanData.members}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row flex-wrap justify-center items-center gap-1">
          {clanData![0].data.clanData.memberList.map((memeber: any, index: any) => {
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
      </div>
    </div>
  )
}
