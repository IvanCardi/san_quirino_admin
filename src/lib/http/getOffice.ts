import { Office } from "../models/office";

export const getOffice = async (id: string): Promise<Office> => {
  const offices = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/offices/${id}`, {
    next: { tags: ["office"], revalidate: 0 },
  });

  return (await offices.json()) as Office;
};
