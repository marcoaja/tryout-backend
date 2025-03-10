/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Tryout` table. All the data in the column will be lost.
  - Added the required column `category` to the `Tryout` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tryout_isPublic_idx";

-- AlterTable
ALTER TABLE "Tryout" DROP COLUMN "isPublic",
ADD COLUMN     "category" TEXT NOT NULL;
