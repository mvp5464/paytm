import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  const session = getServerSession();
  await client.user.create({
    data: {
      email: "oasdj",
      number: 233,
      password: "121212",
    },
  });
  return NextResponse.json({ message: JSON.stringify(session) });
};
