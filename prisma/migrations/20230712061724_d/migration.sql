/*
  Warnings:

  - Added the required column `eventsSchema` to the `prisma_rabbitmq_outbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prisma_rabbitmq_outbox` ADD COLUMN `eventsSchema` LONGTEXT NOT NULL;
