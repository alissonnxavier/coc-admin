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
import { MainMemberPrimaryClan } from "@/components/main-members-primary-clan";
import { useGetSecondaryClanData } from "./features/secondaryClanData/api/use-get-secondary-clan-data";
import { MainMemberSecondaryClan } from "@/components/main-members-secondary-clan";
import { cn } from "@/lib/utils";


export default function Home() {

  const [streamClan, setStreamClan] = useState<"shadow" | "7knights">("shadow");
  const { data: clanData, isLoading: isLoadingClanData } = useGetClanData();
  const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();


  if (!clanData || !secondaryClanData) {
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
    <div>
      <div className="h-20">
        <Menu
          clanName={clanData![0].data.clanData.name}
        />
      </div>
      <div className="flex justify-center items-center flex-wrap md:flex-nowrap xl:flex-nowrap xl:w-4/6 xl:m-auto">
        <div className="flex xl:w-1/5 md:w-1/5 sm:w-4/5 justify-between">
          <div
            onClick={() => { setStreamClan("shadow") }}
            className="">
            <Image
              alt="clan badge"
              src={staticClanData.badgeUrls.medium}
              width={310}
              height={310}
              className={cn("scale-50 transition w-36",
                streamClan === "shadow" && "scale-100"
              )}
            />
          </div>
          <div
            onClick={() => { setStreamClan("7knights") }}
            className="">
            <Image
              alt="clan badge"
              src='/secondaryClanShield.png'
              width={310}
              height={310}
              className={cn("scale-50 transition w-36 ",
                streamClan === "7knights" && "scale-100 "
              )}
            />
          </div>
        </div>
        <Header
          clanData={streamClan === "shadow" ? clanData![0] : secondaryClanData[0]}
        />
      </div>
      <div className="flex justify-center items-center">
        {streamClan === "shadow" ? (
          <MainMemberPrimaryClan
            data={clanData[0]}
          />
        ) : (
          <MainMemberSecondaryClan
            data={secondaryClanData[0]}
          />
        )}

      </div>
    </div>
  )
}
