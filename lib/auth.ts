import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { HasuraAdapter } from "next-auth-hasura-adapter";
import * as jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  adapter: HasuraAdapter({
    endpoint: process.env.HASURA_PROJECT_ENDPOINT!,
    adminSecret: process.env.HASURA_ADMIN_SECRET!,
  }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ["nonce"],
      idToken: true,
      authorization: {
        params: {
          prompt: "select_account",
          scope: "openid email profile",
        },
      },
    }),
  ],
  // Use JWT strategy so we can forward them to Hasura
  session: { strategy: "jwt" },
  // Encode and decode your JWT with the HS256 algorithm
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(token!, secret, {
        algorithm: "HS256",
      });
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret, {
        algorithms: ["HS256"],
      });
      return decodedToken as JWT;
    },
  },
  callbacks: {
    // Add the required Hasura claims
    // https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#the-spec
    async jwt({ token }) {
      return {
        ...token,
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-default-role": "user",
          "x-hasura-role": "user",
          "x-hasura-user-id": token.sub,
        },
      };
    },
    // Add user ID to the session
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
    };
  } | null>;
}
