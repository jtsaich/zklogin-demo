import { authOptions } from "@/lib/auth";
import { deriveUserSalt } from "@/lib/salt";
import { getServerSession } from "next-auth/next";
import { jwtToAddress } from "@mysten/zklogin";
import { gql } from "graphql-request";
import graphQLRequest from "@/lib/graphql";
import Navbar from "./navbar";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  // if the user is logged in, fetch their address
  let address = null;
  if (session) {
    const id = session?.user?.id as string;

    const query = gql`
      query GetAccessToken($userId: uuid) {
        accounts(where: { userId: { _eq: $userId } }) {
          id_token
        }
      }
    `;

    try {
      const accounts = await graphQLRequest(query, {
        userId: id,
      });

      const id_token = accounts?.accounts[0]?.id_token;

      const salt = deriveUserSalt(id_token as string);

      address = jwtToAddress(id_token as string, salt);
    } catch (error) {
      console.log("Error GraphQL", error);
    }
  }
  return <Navbar session={session} address={address} />;
}
