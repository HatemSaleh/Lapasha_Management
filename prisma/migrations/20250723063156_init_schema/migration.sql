-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "overtime" DOUBLE PRECISION NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waiter" (
    "id" SERIAL NOT NULL,
    "prevSections" TEXT NOT NULL,
    "tips" DOUBLE PRECISION NOT NULL,
    "waiterid" INTEGER NOT NULL,

    CONSTRAINT "Waiter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Waiter" ADD CONSTRAINT "Waiter_waiterid_fkey" FOREIGN KEY ("waiterid") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
