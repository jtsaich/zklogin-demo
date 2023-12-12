"use client";

import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import Link from "next/link";
import { Google } from "./icons";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

function truncateAddress(address: string | null) {
  if (!address) {
    return "";
  }
  return `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
}

export default function NavBar({
  session,
  address,
}: {
  session: Session | null;
  address: string | null;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
          <Link href="/" className="flex items-center font-display text-2xl">
            <p>zkPoll</p>
          </Link>
          <div>
            {session ? (
              <>
                <span>{truncateAddress(address)}</span>
                <UserDropdown session={session} />
              </>
            ) : (
              <button
                className="flex gap-2 items-center rounded-full border border-gray-300 p-1.5 px-4 text-sm transition-all bg-gradient-to-tr from-blue-400 via-white to-purple-400 background-animate"
                onClick={() => setShowSignInModal(true)}
              >
                <Google className="h-1 w-1" />
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
