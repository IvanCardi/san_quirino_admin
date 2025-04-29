import { Challenge } from "../models/challenge";

export async function getChallenges(): Promise<Challenge[]> {
  const challenges = await fetch(`${process.env.BE_BASE_URL}/challenges`, {
    next: { tags: ["challenges"] },
  });

  return (await challenges.json()) as Challenge[];
}
