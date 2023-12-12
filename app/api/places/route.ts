import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  const res = await fetch(
    `https://places.googleapis.com/v1/places:searchNearby`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.GOOGLE_PLACES_API_KEY || "",
        "X-Goog-FieldMask": "*",
      },
      body: JSON.stringify({
        includedTypes: ["restaurant"],
        maxResultCount: 10,
        languageCode: "en",
        locationRestriction: {
          circle: {
            center: {
              latitude: 37.7937,
              longitude: -122.3965,
            },
            radius: 500.0,
          },
        },
      }),
    }
  );
  const response = await res.json();

  return NextResponse.json(response.places, { status: 200 });
}
