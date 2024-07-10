// app/login/google/callback/route.ts
import { google, luciaAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { prismaClient } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

interface googleIdToken {
  iss: "https://accounts.google.com";
  azp: "1234987819200.apps.googleusercontent.com";
  aud: "1234987819200.apps.googleusercontent.com";
  sub: "10769150350006150715113082367";
  at_hash: "HK6E_P6Dh8Y93mRNtsDB1Q";
  hd: "example.com";
  email: "jsmith@example.com";
  email_verified: "true";
  iat: 1353601026;
  exp: 1353604926;
  nonce: "0394852-3190485-2490358";
  family_name: "";
  given_name: "";
  locale: "";
  name: "";
  picture: "";
  profile: "";
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const authCode = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("code_verifier")?.value ?? null;
  if (
    !authCode ||
    !state ||
    !storedState ||
    state !== storedState ||
    !codeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      authCode,
      codeVerifier
    );
    const googleUserResponse = await fetch("https://api.google.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const googleUser: googleUser = await googleUserResponse.json();

    let existingUser = await prismaClient.user.findFirst({
      where: {
        id: googleUser.id,
      },
    });

    if (!existingUser) {
      const newUser = await prismaClient.user.create({
        data: {
          id: googleUser.id,
        },
        select: {
          id: true,
        },
      });

      existingUser = newUser;
    }

    const response = new NextResponse();

    const session = await luciaAuth.createSession(existingUser.id, {});
    const sessionCookie = luciaAuth.createSessionCookie(session.id);
    response.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return response;
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface googleUser {
  id: string;
  login: string;
}
