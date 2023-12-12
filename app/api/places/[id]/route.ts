import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${params.id}?key=${process.env.GOOGLE_PLACES_API_KEY}&languageCode=en`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "*",
      },
    }
  );
  const response = await res.json();

  return NextResponse.json(response, { status: 200 });
}
