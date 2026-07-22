'use client';

import Image from "next/image";
import { DotLoader } from "react-spinners";

export const LogoLoader = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-[350px] select-none py-8">

            {/* Container com Perspectiva 3D */}
            <div className="relative group flex flex-col items-center justify-center [perspective:1000px]">

                {/* Glow / Aura Dourada do Fundo */}
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-amber-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

                {/* Anel Externo Giratório (Estilo Elixir/Escudo) */}
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 border-4 border-dashed border-amber-500/40 rounded-full animate-[spin_12s_linear_infinite] pointer-events-none" />

                {/* Avatar 3D com Flutuação e Inclinação */}
                <div className="relative z-10 animate-[coc-float_3s_ease-in-out_infinite]">
                    {/* Moldura do Escudo estilo CoC */}
                    <div className="p-2.5 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-950 rounded-full border-4 border-amber-950 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-transform duration-300">

                        <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-amber-950 bg-stone-900 shadow-inner">
                            <Image
                                alt="Bárbaro Clash of Clans"
                                width={300}
                                height={300}
                                src={'/barbaro.png'}
                                className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Sombra 3D Projetada no Chão */}
                <div className="w-48 h-5 bg-black/60 rounded-[100%] blur-md mt-4 animate-[coc-shadow_3s_ease-in-out_infinite]" />

                {/* Caixa de Texto de Carregamento Estilo Banner CoC */}
                <div className="mt-6 flex flex-col items-center gap-3 z-10">
                    <div className="px-6 py-2 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 border-2 border-amber-950 rounded-2xl shadow-[0_4px_0_0_#451a03] flex items-center gap-3">
                        <span className="text-amber-950 font-black tracking-widest uppercase text-sm sm:text-base drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                            Carregando
                        </span>
                        <DotLoader color="#451a03" size={20} />
                    </div>
                </div>

            </div>

            {/* Animações CSS embutidas via chave de animação keyframes */}
            <style jsx global>{`
        @keyframes coc-float {
          0%, 100% {
            transform: translateY(0px) rotateX(4deg) rotateY(-2deg) scale(1);
          }
          50% {
            transform: translateY(-16px) rotateX(-4deg) rotateY(2deg) scale(1.03);
          }
        }
        @keyframes coc-shadow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.75);
            opacity: 0.25;
          }
        }
      `}</style>
        </div>
    );
};