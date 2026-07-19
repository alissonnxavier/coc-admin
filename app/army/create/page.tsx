/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react";
import Image from "next/image";
import { Trash2, Shield, Zap, Swords, Sparkles, Home, Sliders } from "lucide-react";
import { toast } from "sonner";

import { useCreateArmy } from "@/app/features/army/api/use-create-army";
import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
import { useGetMemberRole } from "@/app/features/memberRole/api/use-get-member-role";
import { HeaderBar } from "@/components/header-bar";
import { LogoLoader } from "@/components/logo-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { army as initialArmyData } from "@/utils/army-data";

export default function CreateArmy() {
  const { mutate: createArmy, isPending: isCreatingArmy } = useCreateArmy();
  const { isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { data: memberRole, isLoading: isLoadingMemberRole } = useGetMemberRole();

  // Estado local contendo a estrutura profunda do exército de forma reativa
  const [armyState, setArmyState] = useState(() => JSON.parse(JSON.stringify(initialArmyData)));
  const [armyTitle, setArmyTitle] = useState("");
  const [armyLink, setArmyLink] = useState("");

  // Proteção de rota / Loading administrada de forma limpa
  if (isLoadingMemberRole || memberRole?.role !== "admin" || isLoadingCurrentUser) {
    return (
      <div className="w-full mb-5">
        <div className="mt-[0.4rem] ml-[0.6rem]">
          <HeaderBar />
        </div>
        <div className="flex justify-center items-center mt-44">
          <LogoLoader />
        </div>
      </div>
    );
  }

  // Atualizador imutável genérico para listas simples (troops, spells, machines, etc.)
  const updateAmount = (category: string, index: number, value: number) => {
    setArmyState((prev: any) => {
      const updated = { ...prev };
      if (updated.army[category]?.[index]) {
        updated.army[category][index].amount = isNaN(value) ? 0 : value;
      }
      return updated;
    });
  };

  // Atualizador específico para os heróis e seus sub-itens (equipamentos e pets)
  const updateHeroSubItem = (heroIndex: number, subCategory: "equipaments" | "pets", subIndex: number, value: number) => {
    setArmyState((prev: any) => {
      const updated = { ...prev };
      const hero = updated.army.hero[heroIndex];
      if (hero && hero[subCategory]?.[subIndex]) {
        hero[subCategory][subIndex].amount = isNaN(value) ? 0 : value;
      }
      return updated;
    });
  };

  const handleCreateNewArmy = () => {
    if (!armyTitle || !armyLink) {
      toast.error("Por favor, preencha o nome e o link do exército!");
      return;
    }

    // Mescla o nome e link definidos no formulário final antes de enviar
    const finalArmyData = {
      ...armyState,
      army: {
        ...armyState.army,
        armyName: armyTitle,
        link: armyLink,
      },
    };

    createArmy(
      { data: finalArmyData },
      {
        onSuccess: () => {
          toast.success("Exército criado com sucesso!");
          setArmyState(JSON.parse(JSON.stringify(initialArmyData)));
          setArmyTitle("");
          setArmyLink("");
        },
        onError: () => {
          toast.error("Algo deu errado ao salvar o exército.");
        },
      }
    );
  };

  const handleReset = () => {
    setArmyState(JSON.parse(JSON.stringify(initialArmyData)));
    setArmyTitle("");
    setArmyLink("");
    toast.info("Campos resetados");
  };

  // Renderizador de Grid reaproveitável para manter o código limpo (Troops, Spells, etc.)
  const renderItemGrid = (category: string, folder: string) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-2">
      {armyState.army[category]?.map((item: any, index: number) => (
        <Card key={`${category}-${index}`} className="flex flex-col items-center p-3 gap-2 bg-secondary/20 hover:bg-secondary/40 transition">
          <div className="relative h-14 w-14 group">
            <Image
              className="rounded-lg object-cover"
              fill
              sizes="56px"
              alt={item.name}
              src={`/${folder}/${item.name}.png`}
            />
          </div>
          <div className="flex flex-col items-center w-full gap-1">
            <span className="text-xs font-medium truncate w-full text-center block text-muted-foreground">
              {item.name}
            </span>
            <Input
              value={item.amount || 0}
              onChange={(e) => updateAmount(category, index, parseInt(e.target.value))}
              className="w-16 h-8 text-center"
              type="number"
              min={0}
            />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-background pb-10">
      <HeaderBar />

      <div className="max-w-6xl mx-auto px-4 mt-6">
        {/* Bloco Superior: Metadados do Exército */}
        <Card className="mb-6">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="armyName">Nome da Variação</Label>
              <Input
                id="armyName"
                value={armyTitle}
                placeholder="Ex: Laloon Avançado CV16"
                onChange={(e) => setArmyTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="armyLink">Link do Layout/Exército</Label>
              <Input
                id="armyLink"
                value={armyLink}
                placeholder="https://link.clashofclans.com/..."
                onChange={(e) => setArmyLink(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sistema de Abas Organizado por Categorias */}
        <Tabs defaultValue="main-army" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:flex md:justify-start gap-1 bg-muted p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="main-army" className="gap-2 py-2">
              <Swords className="h-4 w-4" /> Principal
            </TabsTrigger>
            <TabsTrigger value="heroes" className="gap-2 py-2">
              <Sparkles className="h-4 w-4" /> Heróis
            </TabsTrigger>
            <TabsTrigger value="castle" className="gap-2 py-2">
              <Home className="h-4 w-4" /> Castelo do Clã
            </TabsTrigger>
          </TabsList>

          {/* ABA 1: EXÉRCITO PRINCIPAL */}
          <TabsContent value="main-army" className="space-y-6 mt-4">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Shield className="h-4 w-4" /> Tropas</h3>
              <Separator className="my-2" />
              {renderItemGrid("troops", "army")}
            </div>

            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Zap className="h-4 w-4" /> Feitiços</h3>
              <Separator className="my-2" />
              {renderItemGrid("spells", "army")}
            </div>

            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Sliders className="h-4 w-4" /> Máquinas de Cerco</h3>
              <Separator className="my-2" />
              {renderItemGrid("machines", "machines")}
            </div>
          </TabsContent>

          {/* ABA 2: HERÓIS E EQUIPAMENTOS */}
          <TabsContent value="heroes" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {armyState.army.hero?.map((hero: any, heroIdx: number) => (
                <Card key={`hero-${heroIdx}`} className="overflow-hidden border-2">
                  <CardContent className="p-4 space-y-4">
                    {/* Linha do Herói */}
                    <div className="flex items-center gap-4 bg-muted/50 p-3 rounded-xl">
                      <div className="relative h-16 w-16 bg-background rounded-lg border">
                        <Image
                          className="object-cover rounded-lg"
                          fill
                          alt={hero.name}
                          src={`/hero/${hero.name}.png`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-base capitalize">{hero.name}</h4>
                        <p className="text-xs text-muted-foreground">Nível / Presença na variação</p>
                      </div>
                      <Input
                        value={hero.amount || 0}
                        onChange={(e) => {
                          setArmyState((prev: any) => {
                            const updated = { ...prev };
                            updated.army.hero[heroIdx].amount = parseInt(e.target.value) || 0;
                            return updated;
                          });
                        }}
                        className="w-20 text-center font-bold"
                        type="number"
                        min={0}
                      />
                    </div>

                    {/* Equipamentos & Pets organizados em sub-seções */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {/* Coluna Equipamentos */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground block border-b pb-1">Equipamentos</span>
                        {hero.equipaments?.map((equip: any, eqIdx: number) => {
                          const name = typeof equip === "string" ? equip : equip.name;
                          const amount = typeof equip === "string" ? 0 : equip.amount;
                          return (
                            <div key={`eq-${eqIdx}`} className="flex items-center gap-2 justify-between bg-secondary/10 p-1.5 rounded-lg">
                              <Image width={32} height={32} className="rounded" alt={name} src={`/equipaments/${name}.png`} />
                              <Input
                                value={amount || 0}
                                onChange={(e) => updateHeroSubItem(heroIdx, "equipaments", eqIdx, parseInt(e.target.value))}
                                className="w-12 h-7 p-1 text-center text-xs"
                                type="number"
                                min={0}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Coluna Pets */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-muted-foreground block border-b pb-1">Pets</span>
                        {hero.pets?.map((pet: any, petIdx: number) => {
                          const name = typeof pet === "string" ? pet : pet.name;
                          const amount = typeof pet === "string" ? 0 : pet.amount;
                          return (
                            <div key={`pet-${petIdx}`} className="flex items-center gap-2 justify-between bg-secondary/10 p-1.5 rounded-lg">
                              <Image width={32} height={32} className="rounded" alt={name} src={`/pets/${name}.png`} />
                              <Input
                                value={amount || 0}
                                onChange={(e) => updateHeroSubItem(heroIdx, "pets", petIdx, parseInt(e.target.value))}
                                className="w-12 h-7 p-1 text-center text-xs"
                                type="number"
                                min={0}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ABA 3: CASTELO DO CLÃ */}
          <TabsContent value="castle" className="space-y-6 mt-4">
            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Shield className="h-4 w-4" /> Tropas do Castelo</h3>
              <Separator className="my-2" />
              {renderItemGrid("castleTroops", "army")}
            </div>

            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Zap className="h-4 w-4" /> Feitiços do Castelo</h3>
              <Separator className="my-2" />
              {renderItemGrid("castleSpells", "army")}
            </div>

            <div>
              <h3 className="text-sm font-semibold flex items-center gap-2 px-2 text-primary"><Sliders className="h-4 w-4" /> Máquinas do Castelo</h3>
              <Separator className="my-2" />
              {renderItemGrid("castleMachines", "machines")}
            </div>
          </TabsContent>
        </Tabs>

        {/* Rodapé de Ações Flutuante / Centralizado */}
        <div className="flex items-center justify-center mt-10 gap-4">
          <Button
            type="button"
            className="shadow-md hover:bg-destructive/10 transition"
            onClick={handleReset}
            variant="outline"
          >
            <Trash2 className="h-4 w-4 mr-2" /> Limpar Tudo
          </Button>
          <Button
            disabled={!armyLink || !armyTitle || isCreatingArmy}
            onClick={handleCreateNewArmy}
            className="shadow-lg min-w-[140px]"
            variant="default"
          >
            {isCreatingArmy ? "Criando..." : "Criar Exército"}
          </Button>
        </div>
      </div>
    </div>
  );
}