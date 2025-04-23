"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createAgent } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Office } from "@/lib/models/office";
import { PassInput } from "@/components/ui/pass-input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const formSchema = z
  .object({
    firstName: z.string().nonempty("Inserire un valore per il nome"),
    lastName: z.string().nonempty("Inserire un valore per il cognome"),
    email: z.string().email("Inserire una mail corretta"),
    type: z.string().nonempty(),
    officeId: z.string().nonempty(),
    password: z
      .string()
      .min(8, "La password deve essere lunga almeno 8 caratteri")
      .regex(/[A-Z]/, "La password deve contenere almeno una lettera maiuscola")
      .regex(/[a-z]/, "La password deve contenere almeno una lettera minuscola")
      .regex(/\d/, "La password deve contenere almeno un numero")
      .regex(
        /[@$!%*?&]/,
        "La password deve contenere almeno un carattere speciale (@$!%*?&)"
      )
      .refine((password) => !/\s/.test(password), {
        message: "La password non può contenere spazi",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "La password non corrispondono",
    path: ["confirmPassword"], // This highlights the confirmPassword field in errors
  });

const agentTypes = [
  { label: "Notiziere", value: "news_hunter" },
  { label: "Coach", value: "coach" },
  { label: "Responsabile", value: "manager" },
];

export function OfficeForm({ offices }: { offices: Office[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      officeId: "",
      password: "",
      type: "",
    },
  });

  const selectedType = form.watch("type");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createAgent(values);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      toast("Agente aggiunto con successo!");
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
                        {offices
                          .filter((o) => {
                            if (selectedType === "manager") {
                              return !o.manager;
                            }

                            return true;
                          })
                          .map((o) => (
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
            <div className="w-full flex gap-5 items-start">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PassInput
                        {...field}
                        placeholder="Inserisci la password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Conferma passwrod</FormLabel>
                    <FormControl>
                      <PassInput
                        {...field}
                        placeholder="Inserisci la password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="cursor-pointer" type="submit">
              Aggiungi
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
