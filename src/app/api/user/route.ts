import { NEXT_AUTH } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  const session = await getServerSession(NEXT_AUTH);
  console.log(session.user);
  if (session.user) {
    return NextResponse.json({ user: session.user });
  }
  return NextResponse.json(
    { message: "You are not logged in" },
    { status: 403 }
  );
  // await client.user.create({
  //   data: {
  //     email: "oasdj",
  //     number: 233,
  //     password: "121212",
  //   },
  // });
  return NextResponse.json({ message: JSON.stringify(session) });
};
