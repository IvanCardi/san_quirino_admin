"use client";

import { CustomTable } from "@/components/custom-table";
import { Button } from "@/components/ui/button";
import { Agent } from "@/lib/models/agent";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { toast } from "sonner";
import { deleteAgents } from "./actions";

export default function AgentTable({
  columns,
  agents,
}: {
  columns: ColumnDef<Agent>[];
  agents: Agent[];
}) {
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
