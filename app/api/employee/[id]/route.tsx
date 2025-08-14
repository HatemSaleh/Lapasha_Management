import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma instances during dev
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// Proper async function with context param
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; //params needs to be awaited before you access its props.
  const myid = parseInt(id);

  if (isNaN(myid)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await Promise.all([
      prisma.tips.deleteMany({ where: { workerId: myid } }),
      prisma.shifts.deleteMany({ where: { workerId: myid } }),
      prisma.payrolls.deleteMany({ where: { workerId: myid } }),
    ]);

    const deletedEmployee = await prisma.employees.delete({
      where: { employeeId: myid },
    });

    return NextResponse.json(
      { message: "Employee and related records deleted", deletedEmployee },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Could not delete employee" },
      { status: 500 }
    );
  }
}
