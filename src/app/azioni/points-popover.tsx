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
import { updatePoints } from "./actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  value: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({ message: "Inserire un numero maggiore di 0" })
      .min(0, "Inserire un numero maggiore di 0")
  ),
});

export default function PointsPopover(props: {
  actionId: string;
  initialValue: number;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: props.initialValue,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    customerId: string
  ) => {
    setOpen(false);
    await updatePoints(values.value, customerId);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        form.setValue("value", props.initialValue);
        setOpen(open);
      }}
    >
      <PopoverTrigger className="cursor-pointer">
        <Edit size={18}></Edit>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 w-fit">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmit(data, props.actionId)
            )}
            className="flex flex-col gap-5 m-auto"
          >
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Punteggio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[100px]"
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
