import { Agent } from "../models/agent";

export const getAgent = async (id: string): Promise<Agent> => {
  const agents = await fetch(`${process.env.BE_BASE_URL}/agents/${id}`, {
    next: { tags: ["agent"] },
  });

  return (await agents.json()) as Agent;
};
