import { getAgent } from "@/lib/http/getAgent";
import { getOffices } from "@/lib/http/getOffices";
import { PageProps } from "@/lib/pageProps";
import { AgentForm } from "./agent-form";

export default async function Agente(props: PageProps) {
  const id = (await props.params).id;
  const offices = await getOffices();
  const agent = await getAgent(id);

  return (
    <div className="p-10">
      <AgentForm offices={offices} agent={agent} />
    </div>
  );
}
