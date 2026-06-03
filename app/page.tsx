'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import { useGetClanData } from "./features/clanData/api/use-get-clan-data";
import { Header } from "@/components/header";
import { MainMemberPrimaryClan } from "@/components/main-members-primary-clan";
import { useGetSecondaryClanData } from "./features/secondaryClanData/api/use-get-secondary-clan-data";
import { MainMemberSecondaryClan } from "@/components/main-members-secondary-clan";
import { cn } from "@/lib/utils";
import { HeaderBar } from "@/components/header-bar";
import { LogoLoader } from "@/components/logo-loader";

export default function Home() {
  const [streamClan, setStreamClan] = useState<"shadow" | "7knights">("shadow");
  const { data: mainClanData, isLoading: isLoadingClanData } = useGetClanData();
  const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();

  if (!mainClanData || !secondaryClanData) {
    return <LogoLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground antialiased">
      {/* Barra de navegação/topo */}
      <div className="w-full">
        <HeaderBar />
      </div>

      {/* Container Principal dos Emblemas + Header */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Container dos Emblemas (Badges) */}
        <div className="flex w-full lg:w-1/2 justify-center gap-8 sm:gap-12 md:gap-16">
          {/* Badge Clan Shadow */}
          <button
            onClick={() => setStreamClan("shadow")}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
            aria-label="Selecionar Clan Shadow"
          >
            <Image
              alt="clan badge shadow"
              src={mainClanData[0].data.clanData.badgeUrls.medium}
              width={150}
              height={150}
              className={cn(
                "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain transition-all duration-300 opacity-50 scale-90",
                streamClan === "shadow" && "opacity-100 scale-110 filter drop-shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              )}
            />
          </button>

          {/* Badge Clan 7Knights */}
          <button
            onClick={() => setStreamClan("7knights")}
            className="focus:outline-none transition-transform active:scale-95 cursor-pointer"
            aria-label="Selecionar Clan 7Knights"
          >
            <Image
              alt="clan badge 7knights"
              src={secondaryClanData[0].data.clanData.badgeUrls.medium}
              width={150}
              height={150}
              className={cn(
                "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain transition-all duration-300 opacity-50 scale-90",
                streamClan === "7knights" && "opacity-100 scale-110 filter drop-shadow-[0_0_12px_rgba(0,0,0,0.2)]"
              )}
            />
          </button>
        </div>

        {/* Componente Header Dinâmico */}
        <div className="w-full lg:w-1/2 max-w-xl content-center">
          <Header
            clanData={streamClan === "shadow" ? mainClanData[0] : secondaryClanData[0]}
          />
        </div>
      </main>

      {/* Seção de Membros do Clan */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        {streamClan === "shadow" ? (
          <MainMemberPrimaryClan data={mainClanData[0]} />
        ) : (
          <MainMemberSecondaryClan data={secondaryClanData[0]} />
        )}
      </section>
    </div>
  );
}