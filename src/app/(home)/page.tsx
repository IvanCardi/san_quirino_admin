import { Office } from "@/lib/models/office";
import { officeColumns } from "./office-columns";
import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getOffices = async (): Promise<Office[]> => {
  const cars = await fetch(`${process.env.BE_BASE_URL}/offices`, {
    next: { tags: ["offices"] },
  });

  return (await cars.json()) as Office[];
};

export default async function Home() {
  const offices = await getOffices();

  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex justify-end ">
        <Link href={"/nuovo-ufficio"}>
          {" "}
          <Button className="w-fit cursor-pointer">Aggiungi</Button>
        </Link>
      </div>
      <CustomTable columns={officeColumns} data={offices}></CustomTable>
    </div>
  );
}
