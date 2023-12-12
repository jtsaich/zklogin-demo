// "use client";

import { authOptions } from "@/lib/auth";
// import prisma from "@/lib/prisma";
import { deriveUserSalt } from "@/lib/salt";
import { Place } from "@/types";
import { jwtToAddress } from "@mysten/zklogin";
import { getServerSession } from "next-auth/next";
import { gql } from "graphql-request";
import graphQLRequest from "@/lib/graphql";

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  const isLoggedIn = () => session !== null;

  console.log("isLoggedIn", isLoggedIn());

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
      console.log("address", address);
    } catch (error) {
      console.log("Error GraphQL", error);
    }
  }

  const places: Place[] = [
    {
      id: "safdsafawe",
      types: [
        "seafood_restaurant",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      formattedAddress:
        "PIER 1 1/2 The Embarcadero N, San Francisco, CA 94105, USA",
      websiteUri: "http://lamarsf.com/",
      displayName: {
        text: "La Mar Cocina Peruana",
        languageCode: "en",
      },
    },
    {
      id: "1fjsdak",
      types: [
        "greek_restaurant",
        "meal_takeaway",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      formattedAddress: "200 Jackson St, San Francisco, CA 94111, USA",
      websiteUri: "https://kokkari.com/",
      displayName: {
        text: "Kokkari Estiatorio",
        languageCode: "en",
      },
    },
  ];

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        {isLoggedIn() && (
          <>
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-4xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              {`Welcome back, ${session?.user?.name}`}
            </h1>
            <div className="border-[1px] border-slate-300 rounded-lg px-3 py-4 flex flex-col gap-2 w-full">
              <p
                className="animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-lg"
                style={{
                  animationDelay: "0.25s",
                  animationFillMode: "forwards",
                }}
              >
                Your Sui address is:
              </p>
              <p
                className="font-mono text-sm text-gray-700 animate-fade-up text-center opacity-0 [text-wrap:balance]"
                style={{
                  animationDelay: "0.25s",
                  animationFillMode: "forwards",
                }}
              >
                {address}
              </p>
            </div>
          </>
        )}

        <div className="flex flex-col items-center gap-4">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="input w-full max-w-lg"
            />
          </div>

          {places.map(({ id, displayName, formattedAddress }) => (
            <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
              {/* <figure>
                <img src={websiteUri} alt={displayName.text} />
              </figure> */}
              <div className="card-body">
                <h2 className="card-title">{displayName.text}</h2>
                <p>{formattedAddress}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Detail</button>
                </div>
              </div>
            </div>
          ))}

          <p
            className="animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-md mt-2"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            Powered by{" "}
            <a
              href="https://docs.sui.io/testnet/build/zk_login"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Sui zkLogin
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
