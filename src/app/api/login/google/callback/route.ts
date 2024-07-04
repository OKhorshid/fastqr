import { google as google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse> => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  try {
    const url: URL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });
    //const tokens: GoogleTokens = await google.validateAuthorizationCode(code, codeVerifier);
    //const tokens: GoogleRefreshedTokens = await google.refreshAccessToken(refreshToken);

    // store state verifier as cookie
    cookies().set("state", state, {
      secure: true, // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });

    // store code verifier as cookie
    cookies().set("code_verifier", codeVerifier, {
      secure: true, // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });

    return NextResponse.json({ url }, { status: 302 });
  } catch (e) {
    return NextResponse.json({ error: "serverrr errorrrr" }, { status: 500 });
  }
};
