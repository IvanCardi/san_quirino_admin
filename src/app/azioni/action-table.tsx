"use client";
import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Action } from "@/lib/models/action";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { deleteActions } from "./actions";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { actionType } from "@/lib/models/actionTypes";

export default function ActionTable({
  columns,
  actions,
}: {
  columns: ColumnDef<Action>[];
  actions: Action[];
}) {
  const [filterType, setFilterType] = useState<"contact" | "type" | "agent">(
    "contact"
  );

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
      {({ table, setColumnFilters, columnFilters }) => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select
                value={filterType}
                onValueChange={(value) => {
                  setFilterType(value as "contact" | "type" | "agent");
                  setColumnFilters([]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact">Contatto</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="agent">Agente</SelectItem>
                </SelectContent>
              </Select>
              {filterType === "contact" && (
                <Input
                  placeholder="Ricerca per contatto..."
                  value={
                    (table.getColumn("contact")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("contact")
                      ?.setFilterValue(event.target.value)
                  }
                />
              )}
              {filterType === "type" && (
                <Select
                  value={
                    (table.getColumn("type")?.getFilterValue() as string) ?? ""
                  }
                  onValueChange={(value) => {
                    table.getColumn("type")?.setFilterValue(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipologia utente" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionType.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {filterType === "agent" && (
                <Input
                  placeholder="Ricerca per agente..."
                  value={
                    (table.getColumn("agent")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("agent")?.setFilterValue(event.target.value)
                  }
                />
              )}
              {columnFilters.length > 0 && (
                <Button
                  onClick={() => {
                    setColumnFilters([]);
                  }}
                >
                  Reset
                </Button>
              )}
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
            </div>
          </div>
        );
      }}
    </CustomTable>
  );
}
