import { NEXT_AUTH } from "@/lib/auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { signIn } from "next-auth/react";

// // const handler = NextAuth(NEXT_AUTH);
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   pages: {
//     signIn: "./signin",
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

const handler = NextAuth(NEXT_AUTH);

export { handler as GET, handler as POST };
