"use client";
import { Button } from "@/components/ui/button";
import { Action } from "@/lib/models/action";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import PointsPopover from "./points-popover";

export const actionColumns: ColumnDef<Action>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: "Nome",
    /*  header: ({ column }) => {
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
    }, */
  },
  {
    accessorKey: "fullAddress",
    header: "Indirizzo",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
  },
  {
    accessorKey: "type",
    header: "Tipologia",
    cell: ({ row }) => {
      const type = row.getValue("type");

      let label: string;

      if (type === "news") {
        label = "Notizia";
      } else if (type === "cdv") {
        label = "CDV";
      } else if (type === "assignment") {
        label = "Incarico";
      } else {
        label = "Vendita";
      }

      return <p>{label}</p>;
    },
  },

  {
    accessorKey: "agent",
    header: "Agente",
    cell: ({ row }) => {
      const agent = row.getValue("agent") as { id: string; name: string };

      return <p>{agent.name}</p>;
    },
  },
  {
    accessorKey: "points",
    header: "Punteggio",
    cell: ({ row }) => {
      const id = row.original.id;
      const points = row.getValue("points") as number;

      return (
        <div className="flex gap-2 items-center">
          <p>{points}</p>
          <PointsPopover actionId={id} initialValue={points} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Data di creazione</p>
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
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;

      return <p>{moment(createdAt).format("DD/MM/YYYY")}</p>;
    },
  },
];
