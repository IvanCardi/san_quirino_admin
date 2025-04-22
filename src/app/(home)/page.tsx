import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { getOffices } from "@/lib/http/getOffices";
import Link from "next/link";
import { officeColumns } from "./office-columns";

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
