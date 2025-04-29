import { getOffices } from "@/lib/http/getOffices";
import { officeColumns } from "./office-columns";
import OfficeTable from "./office-table";

export default async function Home() {
  const offices = await getOffices();

  return (
    <div className="p-10">
      <OfficeTable columns={officeColumns} offices={offices}></OfficeTable>
    </div>
  );
}
