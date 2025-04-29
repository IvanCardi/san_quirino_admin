import { getActions } from "@/lib/http/getActions";
import { actionColumns } from "./action-columns";
import ActionTable from "./action-table";

export default async function Azioni() {
  const actions = await getActions();

  return (
    <div className="p-10 flex flex-col gap-3">
      <ActionTable columns={actionColumns} actions={actions} />
    </div>
  );
}
