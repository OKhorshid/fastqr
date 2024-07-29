// app/login/google/callback/route.ts
import { google, luciaAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { GoogleTokens, OAuth2RequestError } from "arctic";
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
  const url = new URL(request.headers.get("url") ?? "", "localhost:3000");
  const authCode = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("code_verifier")?.value ?? null;
  //console.log("CB URL:", url);
  if (!authCode || !state || !storedState || !codeVerifier) {
    return new Response(null, {
      status: 599,
    });
  } else if (state !== storedState) {
    return new Response(null, {
      status: 598,
    });
  }
  try {
    let tokens: GoogleTokens;
    let googleUserResponse: Response;
    let googleUser: googleUser;
    try {
      tokens = await google.validateAuthorizationCode(authCode, codeVerifier);
    } catch (error) {
      console.error(
        "Error validating authorization code:",
        error,
        (error as Error).message,
        (error as Error).cause
      );
      // Handle or rethrow the error
    }
    try {
      googleUserResponse = await fetch(
        "https://www.googleapis.com/auth/userinfo.email",
        {
          headers: {
            Authorization: `Bearer ${tokens!.accessToken}`,
          },
        }
      );
    } catch (e) {
      console.log("errror fel GUR");
    }
    try {
      if (googleUserResponse!) googleUser = await googleUserResponse.json();
    } catch (e) {
      console.log("errror fel GU");
    }

    let existingUser = await prismaClient.user.findFirst({
      where: {
        id: googleUser!.id,
      },
    });

    if (!existingUser) {
      const newUser = await prismaClient.user.create({
        data: {
          id: googleUser!.id,
        },
        select: {
          id: true,
        },
      });

      existingUser = newUser;
    }
    console.log(existingUser);
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
      console.log(e.message, "==>", e.description);
      return new Response(null, {
        status: 400,
        statusText: e.message,
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
