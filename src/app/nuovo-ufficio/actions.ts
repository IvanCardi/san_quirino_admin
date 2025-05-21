"use server";

import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function createOffice(data: {
  name: string;
  street: string;
  city: string;
  number: string;
  province: string;
  zipCode: string;
}): Promise<ServerActionResponse> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/offices`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status !== 201) {
      return {
        status: "error",
        message: (await result.json()).message,
      };
    }

    revalidateTag("offices");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
