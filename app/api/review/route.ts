import authOptions from "@/app/auth/authOptions";
import {
  addMediaReviewSchema,
  removeReviewSchema,
} from "@/app/ValidationSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "User must be authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const validation = addMediaReviewSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { reviewId, reviewMessage, reviewPoster, reviewRating, reviewTitle } =
    validation.data;

  const db = (await client).db();

  const existingReview = await db.collection("review").findOne({
    userId: session.user.email,
    reviewId,
  });

  if (existingReview) {
    return NextResponse.json(
      {
        error: "A review for this item already exists",
      },
      { status: 409 }
    );
  }

  const newReview = await db.collection("review").insertOne({
    userId: session.user.email,
    reviewId,
    reviewPoster,
    reviewMessage,
    reviewRating,
    reviewTitle,
  });

  return NextResponse.json(newReview, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json(
      { error: "User must be authenticated" },
      { status: 401 }
    );
  }

  try {
    const db = (await client).db();

    const reviews = await db
      .collection("review")
      .find({
        userId: session.user.email,
      })
      .toArray();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user?.email) {
    return NextResponse.json(
      { error: "User must be authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const validation = removeReviewSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { reviewId } = validation.data;

  const db = (await client).db();

  const existingReview = await db.collection("review").findOne({
    userId: session.user.email,
    reviewId: reviewId,
  });

  if (!existingReview) {
    return NextResponse.json(
      { error: "The review does not exist" },
      { status: 404 }
    );
  } else {
    db.collection("review").deleteOne(existingReview);
    return NextResponse.json({ status: 204 });
  }
}
