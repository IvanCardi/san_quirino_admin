"use server";
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function deleteAgents(
  agentsIds: string[]
): Promise<ServerActionResponse> {
  try {
    const result = await fetch(
      `${process.env.BE_BASE_URL}/agents?${agentsIds
        .map((id) => `agentsIds=${id}`)
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

    revalidateTag("agents");

    return { status: "ok" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { status: "error", message: "" };
  }
}
