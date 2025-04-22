import { CustomTable } from "@/components/custom-table";
import { getAgents } from "@/lib/http/getAgents";
import { agentColumns } from "./agent-columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Agenti() {
  const agents = await getAgents();

  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex justify-end ">
        <Link href={"/nuovo-agente"}>
          {" "}
          <Button className="w-fit cursor-pointer">Aggiungi</Button>
        </Link>
      </div>
      <CustomTable columns={agentColumns} data={agents}></CustomTable>
    </div>
  );
}
