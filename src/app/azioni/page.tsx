import { CustomTable } from "@/components/custom-table";
import { actionColumns } from "./action-columns";
import { getActions } from "@/lib/http/getActions";

export default async function Azioni() {
  const actions = await getActions();

  return (
    <div className="p-10 flex flex-col gap-3">
      <CustomTable columns={actionColumns} data={actions} />
    </div>
  );
}
