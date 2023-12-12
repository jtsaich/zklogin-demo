// "use client";

import PlacesComponent from "@/components/placeComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="input w-full max-w-lg"
            />
          </div>
          <Suspense fallback="...">
            {/* @ts-expect-error */}
            <PlacesComponent />
          </Suspense>

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
