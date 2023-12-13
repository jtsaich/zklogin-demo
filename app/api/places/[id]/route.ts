import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${params.id}?key=${process.env.GOOGLE_PLACES_API_KEY}&languageCode=zh-TW`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "*",
      },
    }
  );
  const response = await res.json();

  if (response.photos.length) {
    const photoRes = await fetch(
      `https://places.googleapis.com/v1/${response.photos[0].name}?key=${process.env.GOOGLE_PLACES_API_KEY}&skipHttpRedirect=true&maxHeightPx=400&maxWidthPx=400&languageCode=zh-TW`
    );
    // const photo = await photoRes.json();
    console.log(photoRes.body);
  }

  return NextResponse.json(response, { status: 200 });
}
