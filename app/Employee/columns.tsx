"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export type Employees = {
  employeeId: number;
  name: string;
  roleName: "waiter" | "bartender" | "hookah" | "kitchen";
  hourlyRate: number;
  overtimeRate: number;
};

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
      const hourlyRate = parseFloat(row.getValue("hourlyRate"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(hourlyRate);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "overtimeRate",
    header: () => <div> Overtime Rate</div>,
    cell: ({ row }) => {
      const overtimeRate = parseFloat(row.getValue("overtimeRate"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(overtimeRate);

      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      const handleDelete = async (employeeId: number) => {
        try {
          const res = await fetch(`/api/employee/${employeeId}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error(`Failed to delete employee with ID ${employeeId}`);
          }

          console.log(`Deleted employee with ID ${employeeId}`);
          // You can trigger a table refresh or re-fetch here if needed
        } catch (error) {
          console.error("Error deleting employee:", error);
        }
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{employee.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit</DropdownMenuItem>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Delete employee {employee.name}?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete this
                employee and all related data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleDelete(employee.employeeId)}
              >
                Confirm Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
