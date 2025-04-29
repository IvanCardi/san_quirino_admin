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

export async function deleteActions(
  actionsIds: string[]
): Promise<ServerActionResponse> {
  try {
    const result = await fetch(
      `${process.env.BE_BASE_URL}/actions?${actionsIds
        .map((id) => `actionsIds=${id}`)
        .join("&")}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (result.status !== 200) {
      return {
        status: "error",
        message: (await result.json()).message,
      };
    }

    revalidateTag("actions");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
