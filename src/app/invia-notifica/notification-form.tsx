"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Agent } from "@/lib/models/agent";
import { agentTypes } from "@/lib/models/agentTypes";
import { Office } from "@/lib/models/office";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendNotification } from "./actions";
import { toast } from "sonner";

const formSchema = z
  .object({
    title: z.string().nonempty("Inserire un titolo"),
    body: z.string().nonempty("Inserirci il contenuto"),
    sendTo: z.string().nonempty("Seleziona a chi inviare"),
    users: z.array(z.string()).optional(),
    userType: z.string().optional(),
    office: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.sendTo === "selected_users" &&
      (!data.users || data.users.length === 0)
    ) {
      ctx.addIssue({
        path: ["users"],
        message: "Seleziona almeno un utente",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.sendTo === "user_type" && !data.userType) {
      ctx.addIssue({
        path: ["userType"],
        message: "Seleziona una tipologia di utente",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.sendTo === "office" && !data.office) {
      ctx.addIssue({
        path: ["office"],
        message: "Seleziona un ufficio",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const sendToOptions = [
  { label: "Tutti", value: "all" },
  { label: "Utenti selezionati", value: "selected_users" },
  { label: "Tipologia utente", value: "user_type" },
  { label: "Ufficio", value: "office" },
];

export default function NotificationForm({
  offices,
  agents,
}: {
  offices: Office[];
  agents: Agent[];
}) {
  //   const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      sendTo: "",
      userType: "",
      office: "",
      users: [],
    },
  });

  const sendTo = form.watch("sendTo");

  const getUsersNames = (ids: string[]) => {
    const usersNames = [];

    for (const id of ids) {
      const user = agents.find((a) => a.userId === id);

      if (user) {
        usersNames.push(`${user.firstName} ${user.lastName}`);
      }
    }

    return usersNames;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await sendNotification(values);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      toast("Notifica inviata con successo!");
    }
  };

  return (
    <Card className="w-[700px] m-auto">
      <CardHeader>
        <CardTitle>Invia una notifica</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="sendTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invia a</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        form.setValue("office", "");
                        form.setValue("users", []);
                        form.setValue("userType", "");
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona a chi inviare" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sendToOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sendTo === "user_type" && (
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="w-[50%]">
                      <FormLabel>Tipologia utente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona tipologia utente" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {agentTypes.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {sendTo === "office" && (
                <FormField
                  control={form.control}
                  name="office"
                  render={({ field }) => (
                    <FormItem className="w-[50%]">
                      <FormLabel>Ufficio</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleziona ufficio" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {offices.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {sendTo === "selected_users" && (
                <FormField
                  control={form.control}
                  name="users"
                  render={({ field }) => (
                    <FormItem className="min-w-[50%]">
                      <FormLabel>Ufficio</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-[200px] justify-between"
                            >
                              <p className="w-full overflow-hidden overflow-ellipsis">
                                {field.value?.length
                                  ? getUsersNames(field.value).join(", ")
                                  : "Seleziona utenti"}
                              </p>
                              <ChevronDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Cerca utente..." />
                            <CommandList>
                              {agents.map((agent) => (
                                <CommandItem
                                  key={agent.userId}
                                  onSelect={() => {
                                    const isSelected = field.value?.includes(
                                      agent.userId
                                    );
                                    if (isSelected) {
                                      field.onChange(
                                        field.value?.filter(
                                          (val) => val !== agent.userId
                                        )
                                      );
                                    } else {
                                      field.onChange([
                                        ...(field.value ?? []),
                                        agent.userId,
                                      ]);
                                    }
                                  }}
                                >
                                  <Checkbox
                                    checked={field.value?.includes(
                                      agent.userId
                                    )}
                                    className="mr-2"
                                    aria-label={`${agent.firstName} ${agent.lastName}`}
                                  />
                                  {`${agent.firstName} ${agent.lastName}`}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Titolo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Inserisci il titolo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contenuto</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Inserisci il contenuto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Invia</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
