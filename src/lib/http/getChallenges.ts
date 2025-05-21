import { Challenge } from "../models/challenge";

export async function getChallenges(): Promise<Challenge[]> {
  const challenges = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/challenges`, {
    next: { tags: ["challenges"], revalidate: 0 },
  });

  return (await challenges.json()) as Challenge[];
}
