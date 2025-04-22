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
import { createOffice } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().nonempty("Inserire un valore per il nome"),
  street: z.string().nonempty("Inserire un valore per la via"),
  city: z.string().nonempty("Inserire un valore per la città"),
  number: z.string().nonempty("Inserire un valore per il numero civico"),
  province: z.string().nonempty("Inserire un valore per la provincia"),
  zipCode: z.string().nonempty("Inserire un valore per il CAP"),
});

export function OfficeForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      name: "",
      number: "",
      province: "",
      street: "",
      zipCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await createOffice(values);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    } else {
      toast("Ufficio aggiunto con successo!");
      router.push("/");
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
