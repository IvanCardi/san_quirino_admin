import { getOffices } from "@/lib/http/getOffices";
import { OfficeForm } from "./agent-form";

export default async function NuovoUfficio() {
  const offices = await getOffices();

  return (
    <div className="p-10">
      <OfficeForm offices={offices} />
    </div>
  );
}
