import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  const body = await req.json()

  const newEmployee = await prisma.employees.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      roleName: body.roleName,
      hourlyRate: body.hourlyRate,
      overTimeRate: body.overTimeRate,
      isActive: true,
    },
  })

  return NextResponse.json(newEmployee)
}
