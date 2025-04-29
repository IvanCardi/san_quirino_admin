"use server";
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function deleteOffices(
  officesIds: string[]
): Promise<ServerActionResponse> {
  try {
    const result = await fetch(
      `${process.env.BE_BASE_URL}/offices?${officesIds
        .map((id) => `officesIds=${id}`)
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

    revalidateTag("offices");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
