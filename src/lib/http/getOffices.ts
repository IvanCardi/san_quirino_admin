"use server"
import { Office } from "../models/office";

export const getOffices = async (): Promise<Office[]> => {
  const url = `${process.env.NEXT_PUBLIC_BE_BASE_URL}/offices`;

  const offices = await fetch(url, {
    next: { tags: ["offices"], revalidate: 0 },
  });

  return (await offices.json()) as Office[];
};
