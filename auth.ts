import { PrismaAdapter } from "@auth/prisma-adapter";
import nextAuth from "next-auth";
import { NextRequest } from 'next/server'

import prisma from "@/src/lib/prisma";

import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = nextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});

export type NextAuthRequest = NextRequest
