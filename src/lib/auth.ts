import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";
import { cache } from "react";
// import google

import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { prismaAdapter } from "./prismaClient";
import { Google } from "arctic";

const luciaAuth = new Lucia(prismaAdapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production", // replaces `env` config
    },
  },
  getUserAttributes: (attributes) => {
    return {
      clientID: attributes.clientID,
      clientSecret: attributes.clientSecret,
    };
  },
});
const clientID: string = process.env.CLIENT_ID ?? "";
const clientSecret: string = process.env.CLIENT_SECRET ?? "";
export const google = new Google(clientID, clientSecret, "/api/login");

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: {
      clientID: string;
      clientSecret: string;
    };
  }
}