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
import { Office } from "@/lib/models/office";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteOffices } from "../actions";
import { updateOffice } from "./actions";

const formSchema = z.object({
  name: z.string().nonempty("Inserire un valore per il nome"),
  street: z.string().nonempty("Inserire un valore per la via"),
  city: z.string().nonempty("Inserire un valore per la città"),
  number: z.string().nonempty("Inserire un valore per il numero civico"),
  province: z.string().nonempty("Inserire un valore per la provincia"),
  zipCode: z.string().nonempty("Inserire un valore per il CAP"),
  // manager: z.string().optional(),
});

export function OfficeForm({ office }: { office: Office }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: office.city,
      name: office.name,
      number: office.number,
      province: office.province,
      street: office.street,
      zipCode: office.zipCode,
      // manager: office.manager?.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await updateOffice(office.id, values);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      toast("Ufficio modificato con successo!");
      router.push("/uffici");
    }
  };

  const onDelete = async (ids: string[]) => {
    const result = await deleteOffices(ids);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      router.push("/uffici");
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
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome ufficio</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Inserisci il nome dell'ufficio"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manager</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona manager" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage email addresses in your{" "}
                      <Link href="/examples/forms">email settings</Link>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="w-full flex gap-5 items-start">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="w-[85%]">
                    <FormLabel>Via</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci la via" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="w-[15%]">
                    <FormLabel>Numero civico</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex gap-5 items-start">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
                    <FormLabel>Città</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci la città" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="w-[40%]">
                    <FormLabel>Provincia</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci la provincia" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>CAP</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inseirisci il CAP" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              className="cursor-pointer"
              variant="destructive"
              onClick={() => onDelete([office.id])}
            >
              Elimina
            </Button>
            <Button className="cursor-pointer" type="submit">
              Modifica
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
