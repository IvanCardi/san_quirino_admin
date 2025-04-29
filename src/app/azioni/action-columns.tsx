"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Action } from "@/lib/models/action";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import PointsPopover from "./points-popover";

export const actionColumns: ColumnDef<Action>[] = [
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
    accessorKey: "contact",
    accessorFn: (row) =>
      `${row.firstName} ${row.lastName}, ${row.fullAddress}, ${row.phone}`,
    header: "Contatto",
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
    accessorFn: (row) => row.agent?.name,
    header: "Agente",
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
    accessorFn: (row) => moment(row.createdAt).format("DD/MM/YYYY"),
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Data appuntamento</p>
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
    accessorFn: (row) =>
      row.appointmentDate
        ? moment(row.appointmentDate).format("DD/MM/YYYY")
        : "",
  },
  {
    accessorKey: "assignmentDate",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Data Inizio Incarico</p>
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
    accessorFn: (row) =>
      row.assignmentDate ? moment(row.assignmentDate).format("DD/MM/YYYY") : "",
  },
  {
    accessorKey: "endAssignmentDate",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Data Fine Incarico</p>
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
    accessorFn: (row) =>
      row.endAssignmentDate
        ? moment(row.endAssignmentDate).format("DD/MM/YYYY")
        : "",
  },
  {
    accessorKey: "saleDate",
    header: ({ column }) => {
      return (
        <div className="flex gap-1 items-center">
          <p>Data Vendita</p>
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
    accessorFn: (row) =>
      row.saleDate ? moment(row.saleDate).format("DD/MM/YYYY") : "",
  },
];
