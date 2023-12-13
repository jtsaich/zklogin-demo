// "use client";

import { PlaceDetail } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";

const fetchPlace = async (id: string): Promise<PlaceDetail | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/places/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return;
  }
};

export default async function PlaceDetail({
  params,
}: {
  params: { id: string };
}) {
  const place = await fetchPlace(params.id as string);
  if (!place) {
    return;
  }
  const { displayName, formattedAddress } = place;

  // query reviews by id
  // const reviews = [];

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <div className="flex flex-col items-center gap-4">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{displayName.text}</h2>
            <p>{formattedAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
