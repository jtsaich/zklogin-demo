"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Place } from "@/types";
import PlaceCard from "./placeCard";

const fetchPlaces = async (q?: string): Promise<Place[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/places?q=${q}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export default function PlacesComponent({ q }: { q?: string }) {
  const [placesData, setPlacesData] = useState<Place[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setPlacesData(await fetchPlaces(q));
    };
    fetchData();
  }, [q]);

  return (
    <div className="flex flex-col w-full items-center gap-4">
      <h1 className="text-3xl">Places</h1>
      {placesData.map(({ id, formattedAddress, displayName, types }) => (
        <PlaceCard
          key={id}
          types={types}
          formattedAddress={formattedAddress}
          displayName={displayName}
          id={id}
        />
      ))}
    </div>
  );
}
