"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Office } from "@/lib/models/office";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const officeColumns: ColumnDef<Office>[] = [
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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const id = row.original.id;

      return (
        <Link href={`uffici/${id}`} className="hover:underline">
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "address",
    accessorFn: (row) => ({
      street: row.street,
      number: row.number,
      city: row.city,
      province: row.province,
      zipCode: row.zipCode,
    }),
    header: "Indirizzo",
    cell: ({ row }) => {
      const { city, number, province, street, zipCode } = row.getValue(
        "address"
      ) as {
        street: string;
        number: string;
        city: string;
        province: string;
        zipCode: string;
      };

      return <p>{`${street} ${number}, ${city}, ${zipCode}, ${province}`}</p>;
    },
  },
  {
    accessorKey: "manager",
    header: "Responsabile",
    cell: ({ row }) => {
      const manager = row.getValue("manager") as
        | undefined
        | { id: string; name: string };

      return manager?.name ? <p>{manager.name}</p> : <p></p>;
    },
  },
];
