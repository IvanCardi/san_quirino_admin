"use client";
import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Action } from "@/lib/models/action";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteActions } from "./actions";

export default function ActionTable({
  columns,
  actions,
}: {
  columns: ColumnDef<Action>[];
  actions: Action[];
}) {
  const onDelete = async (ids: string[]) => {
    const result = await deleteActions(ids);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    }
  };

  return (
    <CustomTable data={actions} columns={columns}>
      {({ table }) => {
        return (
          <div className="flex justify-between">
            <div className=""></div>
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
            </div>
          </div>
        );
      }}
    </CustomTable>
  );
}
