import { Action } from "../models/action";

export const getActions = async (): Promise<Action[]> => {
  const agents = await fetch(`${process.env.BE_BASE_URL}/actions`, {
    next: { tags: ["actions"] },
  });

  return (await agents.json()) as Action[];
};
