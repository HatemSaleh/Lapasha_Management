/*
  Warnings:

  - You are about to drop the column `roleId` on the `Employees` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hourlyRate` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overTimeRate` to the `Employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleName` to the `Employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employees" DROP CONSTRAINT "Employees_roleId_fkey";

-- AlterTable
ALTER TABLE "Employees" DROP COLUMN "roleId",
ADD COLUMN     "hourlyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "overTimeRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roleName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Roles";
