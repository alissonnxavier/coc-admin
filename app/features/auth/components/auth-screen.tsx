"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";
import Image from "next/image";


const AuthScreen = () => {

  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="w-full flex  justify-center bg-[#0a021c]">
      <div className="md:h-auto md:w-[420px]">
        <div className="flex justify-center mt-10 mb-8 ">
          <div className="shine-border p-1 rounded-lg ">
            <Image
              className="rounded-lg animate-pulse"
              width={200}
              height={200}
              alt="team-logo"
              src="/barbaro.jpg"
            />
          </div>
        </div>
        <div>
          {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
        </div>
      </div>
    </div>
  )
}

export default AuthScreen;