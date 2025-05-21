"use server";
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function createAgent(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type: string;
  officeId: string;
}): Promise<ServerActionResponse> {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        info: {
          firstName: data.firstName,
          lastName: data.lastName,
          type: data.type,
          officeId: data.officeId,
        },
      }),
    });

    if (result.status !== 201) {
      return {
        status: "error",
        message: (await result.json()).message,
      };
    }

    revalidateTag("agents");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
