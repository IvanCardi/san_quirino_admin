import { CustomTable } from "@/components/custom-table";
import { Agent } from "@/lib/models/agent";
import { agentColumns } from "./agent-columns";

const getAgents = async (): Promise<Agent[]> => {
  const cars = await fetch(`${process.env.BE_BASE_URL}/agents`);

  return (await cars.json()) as Agent[];
};

export default async function Agenti() {
  const agents = await getAgents();

  return (
    <div className="p-10">
      <CustomTable columns={agentColumns} data={agents}></CustomTable>
    </div>
  );
}
