"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession(); // Only for client
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Button variant={"outline"} size={"lg"} onClick={() => signIn()}>
          Sign In
        </Button>
        <Button variant={"outline"} size={"lg"} onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
      <div>{JSON.stringify(session.data?.user)}</div>
    </main>
  );
}
