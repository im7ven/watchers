import authOptions from "@/app/auth/authOptions";
import { addMediaSchema } from "@/app/ValidationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = addMediaSchema.safeParse(body);

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Must be authenticated" },
      { status: 401 }
    );
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { mediaId, mediaTitle, mediaType, mediaPoster } = validation.data;

  try {
    const db = (await client).db();

    await db.collection("watchlist").insertOne({
      userId: session.user.email,
      mediaId,
      mediaType,
      mediaPoster,
      mediaTitle,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: `${validation.data.mediaType} added to watchlist` },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error adding movie to watchlist", error);
    return NextResponse.json({ error: "Failed to add moive" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Must be authenticated" },
      { status: 401 }
    );
  }

  try {
    const db = (await client).db();
    const watchlist = await db
      .collection("watchlist")
      .find({
        userId: session.user.email,
      })
      .toArray();
    return NextResponse.json(watchlist, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve the watch list" },
      { status: 500 }
    );
  }
}
