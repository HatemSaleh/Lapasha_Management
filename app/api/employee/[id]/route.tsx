import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

// Prevent multiple Prisma instances during dev
declare global {
  var prisma: PrismaClient | undefined
}
const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") global.prisma = prisma

// Proper async function with context param
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id)

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
  }

  try {
    await prisma.tips.deleteMany({ where: { workerId: id } })
    await prisma.shifts.deleteMany({ where: { workerId: id } })
    await prisma.payrolls.deleteMany({ where: { workerId: id } })

    const deletedEmployee = await prisma.employees.delete({
      where: { employeeId: id },
    })

    return NextResponse.json(
      { message: "Employee and related records deleted", deletedEmployee },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Failed to delete employee:", error.message || error)
    return NextResponse.json(
      { error: "Could not delete employee" },
      { status: 500 }
    )
  }
}
