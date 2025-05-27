/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function login(username: string, password: string) {
  if (process.env.USERNAME !== username || process.env.PASSWORD !== password) {
    throw new Error("invalid credentials");
  }

  const token = jwt.sign(
    {
      username,
      password,
    },
    process.env.SECRET ?? "",
    {
      expiresIn: process.env.EXPIRES ?? ("" as any),
    }
  );

  (await cookies()).set({
    name: "access_token",
    value: token ?? "",
    path: "/",
    sameSite: "none", // <‑‑ must be 'none'
    secure: true,
    httpOnly: true,
    maxAge: (60 * 60 * 2) - 20,
  });
}
