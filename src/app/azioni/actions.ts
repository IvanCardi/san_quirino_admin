"use server";
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function updatePoints(
  value: number,
  actionId: string
): Promise<ServerActionResponse> {
  try {
    const response = await fetch(
      `${process.env.BE_BASE_URL}/actions/${actionId}/points`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ points: value }),
      }
    );

    if (response.status !== 200) {
      return { status: "error", message: "" };
    }

    revalidateTag("actions");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
