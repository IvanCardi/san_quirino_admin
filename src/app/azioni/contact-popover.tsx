"use client";
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
import { Edit } from "lucide-react";
import { useState } from "react";
import { updateAction } from "./actions";

import { Action } from "@/lib/models/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "Inserisci il nome"),
  lastName: z.string().min(1, "Inserisci il congnome"),
  fullAddress: z.string().min(1, "Inserisci l'indirizzo"),
  phone: z.string().min(1, "Inserisci il numero di telefono"),
});

export default function ContactPopover({ action }: { action: Action }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: action.firstName,
      lastName: action.lastName,
      fullAddress: action.fullAddress,
      phone: action.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpen(false);
    await updateAction(action.id, values);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        form.setValue("firstName", action.firstName);
        form.setValue("lastName", action.lastName);
        form.setValue("fullAddress", action.fullAddress);
        form.setValue("phone", action.phone);
        setOpen(open);
      }}
    >
      <PopoverTrigger className="cursor-pointer">
        <Edit size={18}></Edit>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-[400px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
            className="flex flex-col gap-5 m-auto"
          >
            <div className="w-full flex gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Cognome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci il cognome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
           <div className="w-full flex gap-3">
              <FormField
                control={form.control}
                name="fullAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Indirizzo</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Inserisci l'indirizzo" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Inserisci il numero di telefono"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           </div>
            <button type="submit" className="hidden" aria-hidden="true" />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
