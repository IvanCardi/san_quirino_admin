import { Agent } from "../models/agent";

export const getAgents = async (): Promise<Agent[]> => {
  const agents = await fetch(`${process.env.BE_BASE_URL}/agents`, {
    next: { tags: ["agents"] },
  });

  return (await agents.json()) as Agent[];
};
