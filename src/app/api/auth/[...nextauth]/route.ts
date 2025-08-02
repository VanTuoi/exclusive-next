import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authApi } from "~/services";

import { filterUser } from "~/utils/auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const { data } = await authApi("public").login({
            email: credentials?.email,
            password: credentials?.password
          });

          if (data?.data?.accessToken && data?.data?.user) {
            return { ...filterUser(data?.data?.user), accessToken: data?.data?.accessToken };
          }

          throw new Error("Invalid credentials");
        } catch (err) {
          throw new Error(`Invalid credentials ${err}`);
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return user ? { ...token, ...user } : token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { ...token };
      return session;
    }
  },
  pages: {
    signIn: "/auth/login"
  },
  secret: process.env.NEXT_AUTH_SECRET
});

export { handler as GET, handler as POST };
