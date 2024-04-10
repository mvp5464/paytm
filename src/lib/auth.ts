import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH = {
  // Add providers here -- Mainly 3 types 1> OAuth (Login with google,fb,github) 2> Email (passwordless email login via email OTP) 3> Credentials (Your own strategy)
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "email", type: "text", placeholder: "Your Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        return {
          id: "user1",
          name: "Mahesh",
          email: credentials.username, // It is showing but
          username: credentials.username, // It is not showing

          //   if I write "n" then it show me name option same for email but not for username (how it knows) -- Ans from type.ts (id,name,email,image)
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  //   // Callbacks are optional
  callbacks: {
    // jwt is not needed
    jwt: ({ token, user }: any) => {
      console.log(token);
      token.userid = token.sub;
      token.name = "mahesh2"; // You can edit it here (any name coming from frontend)

      return token;
    },
    // It will add id to the client side server (so we can see id along with name and email)
    session: ({ session, token, user }: any) => {
      console.log(session);
      if (session && session.user) {
        session.user.idOK1 = token.sub;
      }
      return session;
    },
  },
  pages: {
    // So when any error occures then it goes to custom signin page
    signIn: "/signin",
  },
};
