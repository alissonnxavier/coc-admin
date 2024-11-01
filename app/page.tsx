'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import { staticClanData } from "@/utils/clan-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useGetClanData } from "./features/clanData/api/use-get-clan-data";
import { Menu } from "@/components/menu";
import { Header } from "@/components/header";


export default function Home() {

  const [data, setData] = useState<any>();
  const { data: clanData, isLoading: isLoadingClanData } = useGetClanData();

  if (!clanData) {
    return (
      <div className="flex justify-center items-center h-screen animate-bounce">
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
    <div>
      <div className="h-20">
        <Menu
          clanName={clanData![0].data.clanData.name}
        />
      </div>
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap xl:flex-nowrap xl:w-4/6 xl:m-auto">
        <div className="mr-5">
          <Image
            alt="clan badge"
            src={staticClanData.badgeUrls.medium}
            width={350}
            height={350}
          />
        </div>
        <Header
          clanData={clanData![0]}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="flex flex-row flex-wrap justify-center items-center gap-1 xl:w-4/6 mb-5">
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
