"use client";

import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Office } from "@/lib/models/office";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";
import { deleteOffices } from "./actions";
import { Input } from "@/components/ui/input";

export default function OfficeTable({
  columns,
  offices,
}: {
  columns: ColumnDef<Office>[];
  offices: Office[];
}) {
  const onDelete = async (ids: string[]) => {
    const result = await deleteOffices(ids);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    }
  };
  return (
    <CustomTable data={offices} columns={columns}>
      {({ table, columnFilters, setColumnFilters }) => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Ricerca per nome..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
              />
              {columnFilters.length > 0 && (
                <Button
                  onClick={() => {
                    setColumnFilters([]);
                  }}
                >
                  Reset
                </Button>
              )}
              <p className="min-w-fit font-bold text-[12px]">Totale uffici: {offices.length}</p>
            </div>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                disabled={table.getSelectedRowModel().rows.length === 0}
                variant="destructive"
                onClick={() =>
                  onDelete(
                    table
                      .getSelectedRowModel()
                      .rows.map((row) => row.original.id)
                  )
                }
              >
                Elimina
              </Button>
              <Link href={"/nuovo-ufficio"}>
                <Button className="w-fit cursor-pointer">Aggiungi</Button>
              </Link>
            </div>
          </div>
        );
      }}
    </CustomTable>
  );
}
