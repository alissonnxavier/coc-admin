import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";


interface SignInCardProps {
  setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {

  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .then(() => {
        setPending(false);
      })
  }

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .then(() => {
        setPending(false);
      });
  };

  return (
    <Card
      className="w-full h-full p-8 border-indigo-600 bg-[#000401]">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-indigo-600">
          Fazer login
        </CardTitle>
        <CardDescription className="text-indigo-800">
          use o seu email ou outro provedor para continuar
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-5">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input
            disabled={false}
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email"
            type="email"
            required
            className="focus:border-indigo-400 bg-indigo-400 border-[#000401]"
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="Password"
            type="password"
            required
            className="focus:border-indigo-400 bg-indigo-400 border-[#000401]"
          />
          <Button
            type="submit"
            className="w-full"
            size='lg'
            disabled={pending}
            variant='quality'
          >
            Continue
          </Button>
        </form>
        <Separator className="bg-indigo-300"/>
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant='qualityLight'
            size="lg"
            className="w-full relative"          >
            <FcGoogle className="size-8 absolute left-2.5 top-auto" />
            Continue com o Google
          </Button>
  
        </div>
        <p className="text-indigo-300 text-xs text-muted-foreground">
          Não tem uma conta? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Registrar</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard