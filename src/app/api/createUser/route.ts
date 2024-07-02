// src/app/api/createUser.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../../../lib/prismaClient"; // Ensure the path is correct
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method is not POST" }, { status: 400 });
  }

  try {
    const userId = uuidv4();
    const user = await prismaClient.user.create({
      data: {
        id: userId,
      },
    });
    return NextResponse.json(
      {
        user,
        message: "User created successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
