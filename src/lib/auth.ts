import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { cookies } from "next/headers";
import { cache } from "react";
// import google

import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { prismaClient, prismaAdapter } from "./prismaClient";

const auth = new Lucia(prismaAdapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production", // replaces `env` config
    },
  },
});
