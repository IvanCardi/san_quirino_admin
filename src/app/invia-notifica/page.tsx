import { getOffices } from "@/lib/http/getOffices";
import NotificationForm from "./notification-form";
import { getAgents } from "@/lib/http/getAgents";

export default async function InviaNotifica() {
  const offices = await getOffices();
  const agents = await getAgents();

  return (
    <div className="py-20">
      <NotificationForm offices={offices} agents={agents} />
    </div>
  );
}
