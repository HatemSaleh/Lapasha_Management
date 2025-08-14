import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing = await prisma.employees.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This phone number already exists." },
        { status: 409 }
      );
    }
    const newEmployee = await prisma.employees.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        roleName: body.roleName,
        hourlyRate: body.hourlyRate,
        overTimeRate: body.overTimeRate,
        isActive: true,
      },
    });

    return NextResponse.json(newEmployee);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
