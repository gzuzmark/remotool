/*
  Warnings:

  - The required column `matchId` was added to the `CandidateRecruiterLink` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `CandidateRecruiterLink` ADD COLUMN `matchId` VARCHAR(191) NOT NULL;
