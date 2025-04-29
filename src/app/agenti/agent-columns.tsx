"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Agent } from "@/lib/models/agent";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const agentColumns: ColumnDef<Agent>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Nome</p>
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "type",
    header: "Tipologia",
    cell: ({ row }) => {
      const type = row.getValue("type");

      let label: string;

      if (type === "news_hunter") {
        label = "Notiziere";
      } else if (type === "coach") {
        label = "Coach";
      } else {
        label = "Responsabile";
      }

      return <p>{label}</p>;
    },
  },
  {
    accessorKey: "office",
    header: "Ufficio",
    cell: ({ row }) => {
      const office = row.getValue("office") as { id: string; name: string };

      return <p>{office.name}</p>;
    },
  },
];
