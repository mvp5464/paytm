import Signin from "@/components/Signin";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const SigninPage = async () => {
  const session = await getServerSession(NEXT_AUTH);
  if (session?.user) {
    redirect("/");
  }
  return <Signin />;
};

export default SigninPage;
