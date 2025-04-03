'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import { staticClanData } from "@/utils/clan-data";
import { useGetClanData } from "./features/clanData/api/use-get-clan-data";
import { Menu } from "@/components/menu";
import { Header } from "@/components/header";
import { MainMemberPrimaryClan } from "@/components/main-members-primary-clan";
import { useGetSecondaryClanData } from "./features/secondaryClanData/api/use-get-secondary-clan-data";
import { MainMemberSecondaryClan } from "@/components/main-members-secondary-clan";
import { cn } from "@/lib/utils";
import { DotLoader } from "react-spinners";


export default function Home() {
  const [streamClan, setStreamClan] = useState<"shadow" | "7knights">("shadow");
  const { data: mainClanData, isLoading: isLoadingClanData } = useGetClanData();
  const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();

  if (!mainClanData || !secondaryClanData) {
    return (
      <div className="flex justify-center items-center w-full" >
        <div className="animate-pulse">
          <Image
            alt="barbaro photo"
            width={300}
            height={300}
            src={'/barbaro.jpg'}
            className="rounded-full"
            priority
          />
          <div className="flex justify-center items-center ">
            <DotLoader
              color="#732e06"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="h-20">
        <Menu
          clanName={mainClanData![0].data.clanData.name}
        />
      </div>
      <div className="flex justify-around items-center flex-wrap md:flex-nowrap xl:flex-nowrap xl:w-4/6 xl:m-auto">
        <div className="flex xl:w-2/5 md:w-1/5 sm:w-4/5 justify-around">
          <div
            onClick={() => { setStreamClan("shadow") }}
            className="">
            <Image
              alt="clan badge"
              src={mainClanData![0].data.clanData.badgeUrls.medium}
              width={500}
              height={500}
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
              src={secondaryClanData![0].data.clanData.badgeUrls.medium}
              width={500}
              height={500}
              className={cn("scale-50 transition w-36 ",
                streamClan === "7knights" && "scale-100 "
              )}
            />
          </div>
        </div>
        <div className="w-[25rem]">
          <Header
            clanData={streamClan === "shadow" ? mainClanData![0] : secondaryClanData[0]}
          />
        </div>
      </div>
      <div className="flex justify-center items-center">
        {streamClan === "shadow" ? (
          <MainMemberPrimaryClan
            data={mainClanData[0]}
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
