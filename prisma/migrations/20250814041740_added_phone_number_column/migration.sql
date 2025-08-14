/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Employees" ADD COLUMN     "phoneNumber" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employees_phoneNumber_key" ON "public"."Employees"("phoneNumber");
