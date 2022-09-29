/*
  Warnings:

  - A unique constraint covering the columns `[matchId]` on the table `CandidateRecruiterLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `CandidateRecruiterLink_matchId_key` ON `CandidateRecruiterLink`(`matchId`);
