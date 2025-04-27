import { getChallenges } from "@/lib/http/getChallenges";
import { ChallengesList } from "./challenges-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { value: "pending", label: "In attesa" },
  { value: "in_progress", label: "In corso" },
  { value: "closed", label: "Terminate" },
];
export default async function Challenges() {
  const challenges = await getChallenges();

  return (
    <div className="p-10">
      <Tabs className="gap-5" defaultValue={tabs[0].value}>
        <TabsList>
          {tabs.map((t) => (
            <TabsTrigger className="px-8" key={t.value} value={t.value}>
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <ChallengesList
              challenges={challenges.filter((c) => c.status === t.value)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
