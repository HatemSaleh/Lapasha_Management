"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EditEmployeeForm } from "@/components/EditEmployeeForm";
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
  firstName: string;
  lastName: string;
  roleName: "waiter" | "bartender" | "hookah" | "kitchen";
  phoneNumber: string;
  hourlyRate: number;
  overtimeRate: number;
};
export const columns: ColumnDef<Employees>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div>
          {employee.firstName} {employee.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "roleName",
    header: "Role",
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
      const router = useRouter();
      const handleDelete = async () => {
        try {
          const res = await fetch(`/api/employee/${employee.employeeId}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to delete employee: ${errorText}`);
          }
          router.refresh();
        } catch (error) {
          alert(
            `Could not delete '${employee.firstName} ${employee.lastName}'. Please try again.`
          );
        }
      };

      const handleEdit = async (updated: any) => {
        try {
          const res = await fetch(`/api/employee/${employee.employeeId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
          });
          if (!res.ok) throw new Error("Failed to update employee");
          router.refresh();
        } catch (err) {
          alert("Failed to update employee. Please try again.");
          console.error(err);
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
              <DropdownMenuLabel>
                {employee.firstName} {employee.lastName}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <EditEmployeeForm
                  employee={employee}
                  onSave={(updated) => handleEdit(updated)}
                />
              </DropdownMenuItem>

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
                Delete employee {employee.firstName} {employee.lastName}?
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
                onClick={() => handleDelete()}
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
