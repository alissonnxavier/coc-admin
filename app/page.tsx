'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from "react";
import { getClanInfo } from "@/actions/get-clan-info";
import { clanData } from "@/utils/clan-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import UserButton from "./features/auth/components/user-button";

interface PlayerProps {
  playerData: any;
}

export default function Home() {

  const [data, setData] = useState<any>();

  /*  const handleData = async () => {
     await getClanInfo().then((res)=>{setData(res)})
       
   }
 
   useEffect(() => {
     handleData();
   }, []) */

  console.log(clanData.name)


  return (
    <div>
      <div className="flex justify-center items-center">
        <UserButton/>
        <div className="mr-5">
          <Image
            alt="clan badge"
            src={clanData.badgeUrls.medium}
            width={350}
            height={350}
          />
        </div>
        <div className="flex flex-col">
          <div className="text-3xl font-bold">
            {clanData.name}
          </div>
          <div className="text-muted-foreground text-xs">
            {clanData.tag}
          </div>
          <div className="text-muted-foreground text-xs">
            {clanData.type}
          </div>
          <div className="text-muted-foreground text-xs">
            {clanData.description}
          </div>
          <div className="text-muted-foreground text-xs">
            Pais {clanData.location.name}
          </div>
          <div className="text-muted-foreground text-xs">
            Clan lever {clanData.clanLevel}
          </div>
          <div className="text-muted-foreground text-xs">
            Pontos do clan {clanData.clanPoints}
          </div>
          <div className="text-muted-foreground text-xs">
            Frequencia de guerra {clanData.warFrequency}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras ganhas {clanData.warWins}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras empatadas {clanData.warTies}
          </div>
          <div className="text-muted-foreground text-xs">
            Guerras perdidas {clanData.warLosses}
          </div>
          <div className="text-muted-foreground text-xs">
            Liga {clanData.warLeague.name}
          </div>
          <div className="text-muted-foreground text-xs">
            Membros {clanData.members}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row flex-wrap justify-center items-center gap-1">
          {clanData.memberList.map((memeber, index) => (
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
          ))}

        </div>
      </div>
    </div>
  )
}
