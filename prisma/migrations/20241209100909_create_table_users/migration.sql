-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "frist_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
