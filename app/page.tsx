'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGetClanData } from "./features/clanData/api/use-get-clan-data";
import { Header } from "@/components/header";
import { MainMemberPrimaryClan } from "@/components/main-members-primary-clan";
import { useGetSecondaryClanData } from "./features/secondaryClanData/api/use-get-secondary-clan-data";
import { MainMemberSecondaryClan } from "@/components/main-members-secondary-clan";
import { cn } from "@/lib/utils";
import { HeaderBar } from "@/components/header-bar";
import { LogoLoader } from "@/components/logo-loader";
import { useGetThirdClanData } from "./features/thirdClanData/api/use-get-third-clan-data";
import { MainMemberThirdClan } from "@/components/main-members-third-clan";

type ClanType = "shadow" | "7knights" | "third";

export default function Home() {
  const [streamClan, setStreamClan] = useState<ClanType>("shadow");
  // Estado que mantém a ordem visual dos 3 clãs para permitir a troca circular
  const [clansOrder, setClansOrder] = useState<ClanType[]>(["shadow", "7knights", "third"]);

  const { data: mainClanData, isLoading: isLoadingClanData } = useGetClanData();
  const { data: secondaryClanData, isLoading: isLoadingSecondaryClanData } = useGetSecondaryClanData();
  const { data: thirdClanData, isLoading: isLoadingThirdClanData } = useGetThirdClanData();

  if (!mainClanData || !secondaryClanData || !thirdClanData) {
    return <LogoLoader />;
  }

  // Função para rotacionar as bandeiras ao clicar
  const handleSelectClan = (selectedClan: ClanType) => {
    setStreamClan(selectedClan);

    setClansOrder((prevOrder) => {
      const currentIndex = prevOrder.indexOf(selectedClan);
      if (currentIndex === -1 || currentIndex === 1) return prevOrder;

      // Se clicar no da esquerda (índice 0), traz ele para o meio
      if (currentIndex === 0) {
        return [prevOrder[2], prevOrder[0], prevOrder[1]];
      }
      // Se clicar no da direita (índice 2), traz ele para o meio
      return [prevOrder[1], prevOrder[2], prevOrder[0]];
    });
  };

  // Helper para obter os dados do clã selecionado para o Header
  const getSelectedClanData = () => {
    switch (streamClan) {
      case "shadow":
        return mainClanData[0];
      case "7knights":
        return secondaryClanData[0];
      case "third":
        return thirdClanData[0];
    }
  };

  // Mapeamento centralizado dos dados dos clãs
  const clansMap = {
    shadow: {
      id: "shadow" as ClanType,
      label: "Clan Shadow",
      badgeUrl: mainClanData[0]?.data?.clanData?.badgeUrls?.medium,
    },
    "7knights": {
      id: "7knights" as ClanType,
      label: "Clan 7Knights",
      badgeUrl: secondaryClanData[0]?.data?.clanData?.badgeUrls?.medium,
    },
    third: {
      id: "third" as ClanType,
      label: "Terceiro Clan",
      badgeUrl: thirdClanData[0]?.data?.clanData?.badgeUrls?.medium,
    },
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground antialiased">
      {/* Barra de navegação/topo */}
      <div className="w-full">
        <HeaderBar />
      </div>

      {/* Container Principal dos Emblemas + Header */}
      <main className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-between gap-6">

        {/* Container dos Emblemas (Badges) com Animação Layout */}
        <div className="flex w-full lg:w-1/2 justify-center items-center gap-4 sm:gap-8 md:gap-10 min-h-[160px]">
          {clansOrder.map((clanKey) => {
            const clan = clansMap[clanKey];
            const isSelected = streamClan === clan.id;

            return (
              <motion.button
                key={clan.id}
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                onClick={() => handleSelectClan(clan.id)}
                className="focus:outline-none cursor-pointer select-none"
                aria-label={`Selecionar ${clan.label}`}
              >
                <Image
                  alt={`clan badge ${clan.id}`}
                  src={clan.badgeUrl}
                  width={150}
                  height={150}
                  className={cn(
                    "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain transition-all duration-300 opacity-50 scale-90",
                    isSelected &&
                    "opacity-100 scale-110 filter drop-shadow-[0_0_16px_rgba(99,102,241,0.4)]"
                  )}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Componente Header Dinâmico */}
        <div className="w-full lg:w-1/2 max-w-xl content-center">
          <Header clanData={getSelectedClanData()} />
        </div>
      </main>

      {/* Seção de Membros do Clan */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 flex justify-center items-center">
        {streamClan === "shadow" && (
          <MainMemberPrimaryClan data={mainClanData[0]} />
        )}
        {streamClan === "7knights" && (
          <MainMemberSecondaryClan data={secondaryClanData[0]} />
        )}
        {streamClan === "third" && (
          <MainMemberThirdClan data={thirdClanData[0]} />
        )}
      </section>
    </div>
  );
}