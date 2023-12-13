import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const textQuery = searchParams.get("q");

  const url = textQuery
    ? "https://places.googleapis.com/v1/places:searchText"
    : "https://places.googleapis.com/v1/places:searchNearby";
  const body = textQuery
    ? {
        includedType: "restaurant",
        textQuery,
        locationBias: {
          circle: {
            center: {
              latitude: 25.043884077115404,
              longitude: 121.56062622792051,
            },
            radius: 50000.0,
          },
        },
      }
    : {
        includedTypes: ["restaurant"],
        locationRestriction: {
          circle: {
            center: {
              latitude: 25.043884077115404,
              longitude: 121.56062622792051,
            },
            radius: 50000.0,
          },
        },
      };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY || "",
      "X-Goog-FieldMask": "*",
    },
    body: JSON.stringify({
      ...body,
      maxResultCount: 10,
      languageCode: "zh-TW",
    }),
  });
  const response = await res.json();

  return NextResponse.json(response.places, { status: 200 });
}
