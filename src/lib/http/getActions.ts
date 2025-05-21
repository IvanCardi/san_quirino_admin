import { Action } from "../models/action";

export const getActions = async (): Promise<Action[]> => {
  const agents = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/actions`, {
    next: { tags: ["actions"], revalidate: 0 },
  });

  return (await agents.json()) as Action[];
};
