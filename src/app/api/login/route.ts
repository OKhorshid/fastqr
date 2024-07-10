import { google as google } from "@/lib/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  "use server";
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  try {
    const url: URL = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email"],
    });
    //const tokens: GoogleTokens = await google.validateAuthorizationCode(code, codeVerifier);
    //const tokens: GoogleRefreshedTokens = await google.refreshAccessToken(refreshToken);

    console.log("urllll: ", url.href);
    const response = new NextResponse(url.toJSON());

    // store state verifier as cookie
    response.cookies.set("state", state, {
      secure: true, // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });

    // store code verifier as cookie
    response.cookies.set("code_verifier", codeVerifier, {
      secure: true, // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });
    response.headers;
    return response;
  } catch (e) {
    console.error(e); // Log the error for debugging
    return NextResponse.json(
      { error: "serverrrrr erroooorrrrr" },
      { status: 500 }
    );
  }
};
