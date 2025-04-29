import { Office } from "../models/office";

export const getOffice = async (id: string): Promise<Office> => {
  const offices = await fetch(`${process.env.BE_BASE_URL}/offices/${id}`, {
    next: { tags: ["office"] },
  });

  return (await offices.json()) as Office;
};
