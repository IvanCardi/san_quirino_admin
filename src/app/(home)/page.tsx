import { Office } from "@/lib/models/office";
import { officeColumns } from "./office-columns";
import { CustomTable } from "@/components/custom-table";

const getOffices = async (): Promise<Office[]> => {
  const cars = await fetch(`${process.env.BE_BASE_URL}/offices`);

  return (await cars.json()) as Office[];
};

export default async function Home() {
  const offices = await getOffices();

  return (
    <div className="p-10">
      <CustomTable columns={officeColumns} data={offices}></CustomTable>
    </div>
  );
}
