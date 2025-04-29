"use client";
import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Agent } from "@/lib/models/agent";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAgents } from "./actions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { agentTypes } from "@/lib/models/agentTypes";

export default function AgentTable({
  columns,
  agents,
}: {
  columns: ColumnDef<Agent>[];
  agents: Agent[];
}) {
  const [filterType, setFilterType] = useState<"name" | "type" | "office">(
    "name"
  );

  const onDelete = async (ids: string[]) => {
    const result = await deleteAgents(ids);

    if (result.status === "error") {
      toast("Si è verificato un errore", {
        description: result.message,
      });
    }
  };

  return (
    <CustomTable data={agents} columns={columns}>
      {({ table, setColumnFilters, columnFilters }) => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Select
                value={filterType}
                onValueChange={(value) => {
                  setFilterType(value as "name" | "office" | "type");
                  setColumnFilters([]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nome</SelectItem>
                  <SelectItem value="type">Tipo</SelectItem>
                  <SelectItem value="office">Ufficio</SelectItem>
                </SelectContent>
              </Select>
              {filterType === "name" && (
                <Input
                  placeholder="Ricerca per nome..."
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
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
                    {agentTypes.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {filterType === "office" && (
                <Input
                  placeholder="Ricerca per ufficio..."
                  value={
                    (table.getColumn("office")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("office")
                      ?.setFilterValue(event.target.value)
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
              <Link href={"/nuovo-agente"}>
                <Button className="w-fit cursor-pointer">Aggiungi</Button>
              </Link>
            </div>
          </div>
        );
      }}
    </CustomTable>
  );
}
