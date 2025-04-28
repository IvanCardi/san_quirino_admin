"use server";
import { ServerActionResponse } from "@/lib/serverActionResponse";
import { revalidateTag } from "next/cache";

export async function sendNotification(data: {
  title: string;
  body: string;
  sendTo: string;
  office?: string;
  agentType?: string;
  users?: string[];
}): Promise<ServerActionResponse> {
  try {
    const result = await fetch(`${process.env.BE_BASE_URL}/notifications`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
