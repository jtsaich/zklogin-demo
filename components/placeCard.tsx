"use client";

import { Place } from "@/types";
import { useRouter } from "next/navigation";

export default function PlaceCard({
  id,
  displayName,
  formattedAddress,
}: Place) {
  const router = useRouter();
  return (
    <div key={id} className="card lg:card-side w-full bg-base-100 shadow-xl">
      {/* <figure>
                <img src={websiteUri} alt={displayName.text} />
              </figure> */}
      <div className="card-body">
        <h2 className="card-title">{displayName.text}</h2>
        <p>{formattedAddress}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/places/${id}`)}
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
