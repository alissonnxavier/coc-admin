"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "../api/use-current-user";
import { DotLoader } from "react-spinners";
import { HeaderBar } from "@/components/header-bar";



const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  const { isLoading } = useCurrentUser();

  return (
    <div className="w-full h-screen bg-[#0a021c]">
      <HeaderBar />
      <div className="w-full flex justify-center">
        <div className="md:h-auto md:w-[420px]">
          <div className="flex justify-center mt-10 mb-8 ">
            {isLoading
              ? <div className="flex h-52 justify-center items-center ">
                <DotLoader
                  color="#732e06"
                />
              </div>
              : <Link href='/'>
                <div className="shine-border p-1 rounded-lg ">
                  <Image
                    className="rounded-lg"
                    width={200}
                    height={200}
                    alt="team-logo"
                    src="/barbaro.jpg"
                    priority
                  />
                </div>
              </Link>
            }
          </div>
          <div>
            {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen;