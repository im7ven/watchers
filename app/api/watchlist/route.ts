import authOptions from "@/app/auth/authOptions";
import { addMediaSchema, removeMediaSchema } from "@/app/ValidationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";
import { error } from "console";

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

  const {
    mediaId,
    mediaTitle,
    mediaType,
    mediaPoster,
    mediaRating,
    mediaRelease,
    mediaRuntime,
    mediaSeasons,
  } = validation.data;

  try {
    const db = (await client).db();

    const existingItem = await db.collection("watchlist").findOne({
      userId: session.user.email,
      mediaId,
    });

    if (existingItem) {
      return NextResponse.json(
        {
          error: "This item has already been to the watchlist.",
        },
        { status: 409 }
      );
    }

    await db.collection("watchlist").insertOne({
      userId: session.user.email,
      mediaId,
      mediaType,
      mediaPoster,
      mediaTitle,
      mediaRuntime,
      mediaRating,
      mediaRelease,
      mediaSeasons,
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

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const validation = removeMediaSchema.safeParse(body);

  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "Must be an authenticated user" },
      { status: 401 }
    );
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { mediaId } = validation.data;

  const db = (await client).db();

  const existingItem = await db.collection("watchlist").findOne({
    userId: session.user.email,
    mediaId: mediaId,
  });

  if (!existingItem) {
    return NextResponse.json(
      { error: "The item does not exist" },
      { status: 404 }
    );
  } else {
    await db.collection("watchlist").deleteOne(existingItem);
  }

  return NextResponse.json({});
}
