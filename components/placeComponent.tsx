import React from "react";
import axios from "axios";
import { Place } from "@/types";
import PlaceCard from "./placeCard";

const fetchPlaces = async (): Promise<Place[]> => {
  try {
    const response = await axios.get("/api/places");
    return response.data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
};

export default async function PlacesComponent() {
  const placesData = await fetchPlaces();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Places</h1>
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
