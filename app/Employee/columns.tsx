"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
export type Employees = {
  id: number
  name: string
  roleName: "waiter" | "bartender" | "hookah" | "kitchen"
  hourlyRate: number
  overtimeRate: number
}

export const columns: ColumnDef<Employees>[] = [
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
        
    },

    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "roleName",
      header: "Role",
    },
    {
      accessorKey: "hourlyRate",
      header: () => <div> Hourly Rate</div>,
            cell: ({ row }) => {
            const hourlyRate = parseFloat(row.getValue("hourlyRate"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(hourlyRate)
        
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
      accessorKey: "overtimeRate",
      header: () => <div> Overtime Rate</div>,
            cell: ({ row }) => {
            const overtimeRate = parseFloat(row.getValue("overtimeRate"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(overtimeRate)
        
            return <div className="font-medium">{formatted}</div>
        },
    },

    {
        id: "actions",
        
        cell: ({ row }) => {
          const employee = row.original
    
          return (
            <div className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => console.log("Edit", employee.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => console.log("Delete", employee.id)}
                  >
                    Delete
                  </Button>
                </div>
            </div>
          )
        },
      },

    
  ]