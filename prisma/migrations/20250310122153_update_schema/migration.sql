/*
  Warnings:

  - Added the required column `description` to the `Tryout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tryout" ADD COLUMN     "description" TEXT NOT NULL;
