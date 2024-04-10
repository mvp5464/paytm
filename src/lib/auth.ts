// import db from "@repo/db/client";
import db from "../db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials: any): Promise<any> {
        console.log(credentials);
        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: +credentials.number,
          },
        });
        console.log("existingUser");
        console.log(existingUser);
        if (existingUser) {
          console.log(`Password from DB is ${existingUser.password}`);
          console.log(`Raw user Password is ${credentials.password}`);
          console.log(`hashed user password is ${hashedPassword}`);
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          ); // both are different but the bcrypt.compare can check them both
          console.log(passwordValidation);
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              number: existingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: +credentials.number,
              password: hashedPassword,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
