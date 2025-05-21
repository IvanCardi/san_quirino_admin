import { Agent } from "../models/agent";

export const getAgents = async (): Promise<Agent[]> => {
  const agents = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/agents`, {
    next: { tags: ["agents"], revalidate: 0 },
  });

  return (await agents.json()) as Agent[];
};
