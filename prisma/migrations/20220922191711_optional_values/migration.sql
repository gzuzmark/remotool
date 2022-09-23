-- AlterTable
ALTER TABLE `CandidateRecruiterLink` MODIFY `maxSalary` DECIMAL(10, 2) NULL,
    MODIFY `url` VARCHAR(2000) NULL,
    MODIFY `slug` VARCHAR(191) NULL;
