"use client";

import PlacesComponent from "@/components/placeComponent";
import { useState } from "react";

export default function Home() {
  const [textQuery, setTextQuery] = useState("");

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="input w-full max-w-lg"
              value={textQuery}
              onChange={(e) => setTextQuery(e.target.value)}
            />
          </div>
          <PlacesComponent q={textQuery} />

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
