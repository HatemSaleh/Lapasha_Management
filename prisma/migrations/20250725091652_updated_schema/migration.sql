/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Waiter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Waiter" DROP CONSTRAINT "Waiter_waiterid_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Waiter";

-- CreateTable
CREATE TABLE "Employees" (
    "employeeId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "Salary" DOUBLE PRECISION NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "overTimeRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shifts" (
    "id" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "clockInTime" TIME NOT NULL,
    "clockOutTime" TIME NOT NULL,
    "breaksTaken" DOUBLE PRECISION NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tips" (
    "tipId" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "tipAmount" DOUBLE PRECISION NOT NULL,
    "paidInCashAmount" DOUBLE PRECISION NOT NULL,
    "totalTips" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Tips_pkey" PRIMARY KEY ("tipId")
);

-- CreateTable
CREATE TABLE "Payrolls" (
    "payrollId" SERIAL NOT NULL,
    "workerId" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "totalHours" DOUBLE PRECISION NOT NULL,
    "overTime" DOUBLE PRECISION NOT NULL,
    "totalHourlyPay" DOUBLE PRECISION NOT NULL,
    "totalTips" DOUBLE PRECISION NOT NULL,
    "netPay" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Payrolls_pkey" PRIMARY KEY ("payrollId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleName_key" ON "Roles"("roleName");

-- AddForeignKey
ALTER TABLE "Employees" ADD CONSTRAINT "Employees_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shifts" ADD CONSTRAINT "Shifts_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tips" ADD CONSTRAINT "Tips_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tips" ADD CONSTRAINT "Tips_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payrolls" ADD CONSTRAINT "Payrolls_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
