import { Agent } from "../models/agent";

export const getAgent = async (id: string): Promise<Agent> => {
  const agents = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/agents/${id}`, {
    next: { tags: ["agent"], revalidate: 0 },
  });

  return (await agents.json()) as Agent;
};
