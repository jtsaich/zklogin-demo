// "use client";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deriveUserSalt } from "@/lib/salt";
import { Place } from "@/types";
import { jwtToAddress } from "@mysten/zklogin";
import { getServerSession } from "next-auth/next";
import { useRouter } from "next/router";

export default async function PlaceDetail() {
  const router = useRouter();
  const { id } = router.query;

  // query place by id
  const place: Place = {
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
  };
  // query reviews by id
  const reviews = [];

  const session = await getServerSession(authOptions);

  const isLoggedIn = () => session !== null;

  // if the user is logged in, fetch their address
  let address = null;
  if (session !== null) {
    const email = session?.user?.email as string;

    // get the user from the database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // get the account from the database
    const account = await prisma.account.findFirst({
      where: {
        userId: user?.id,
      },
    });

    // get the id_token from the account
    const id_token = account?.id_token;

    // get the salt from the id_token
    const salt = deriveUserSalt(id_token as string);

    // get the address from the id_token and salt
    address = jwtToAddress(id_token as string, salt);
  }

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

          {reviews.map((review) => (
            <div key={id} className="card lg:card-side bg-base-100 shadow-xl">
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
