"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Agent } from "@/lib/models/agent";
import { agentTypes } from "@/lib/models/agentTypes";
import { Office } from "@/lib/models/office";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateAgent } from "./actions";

const formSchema = z.object({
  firstName: z.string().nonempty("Inserire un valore per il nome"),
  lastName: z.string().nonempty("Inserire un valore per il cognome"),
  email: z.string().email("Inserire una mail corretta"),
  type: z.string().nonempty(),
  officeId: z.string().nonempty(),
});

export function AgentForm({
  agent,
  offices,
}: {
  agent: Agent;
  offices: Office[];
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: agent.email,
      firstName: agent.firstName,
      lastName: agent.lastName,
      officeId: agent.office ? agent.office.id : "",
      type: agent.type,
    },
  });

  const selectedType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateAgent(agent.id, values);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      toast("Agente modificato con successo!");
      router.push("/agenti");
    }
  };

  return (
    <Card className="w-[50%] m-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full"
        >
          <CardContent className="flex flex-col gap-5 w-full">
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci il nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Cognome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci il cognome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex gap-5 items-start">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Tipologia</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleziona la tipologia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {agentTypes.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="officeId"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Ufficio</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedType}
                    >
                      <FormControl style={{ width: "100%" }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleziona l'ufficio" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {offices.map((o) => (
                          <SelectItem key={o.id} value={o.id}>
                            {o.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Inserisci la email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="cursor-pointer" type="submit">
              Modifica
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
