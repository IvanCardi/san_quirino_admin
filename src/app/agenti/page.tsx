import { getAgents } from "@/lib/http/getAgents";
import { agentColumns } from "./agent-columns";
import AgentTable from "./agent-table";

export default async function Agenti() {
  const agents = await getAgents();

  return (
    <div className="p-10 flex flex-col gap-3">
      <AgentTable agents={agents} columns={agentColumns} />
    </div>
  );
}
