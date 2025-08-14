import prisma from "@/lib/prisma";
import { columns, Employees } from "./columns";
import { DataTable } from "@/components/DataTable";

async function getData(): Promise<Employees[]> {
  const dbEmployees = await prisma.employees.findMany();

  return dbEmployees.map((emp) => ({
    employeeId: emp.employeeId,
    name: `${emp.firstName} ${emp.lastName}`,
    roleName: emp.roleName as Employees["roleName"],
    phoneNumber: emp.phoneNumber,
    hourlyRate: emp.hourlyRate,
    overtimeRate: emp.overTimeRate,
  }));
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
