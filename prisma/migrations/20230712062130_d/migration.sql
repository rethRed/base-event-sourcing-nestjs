/*
  Warnings:

  - You are about to drop the column `eventsSchemaData` on the `prisma_rabbitmq_outbox` table. All the data in the column will be lost.
  - Added the required column `eventSchemaData` to the `prisma_rabbitmq_outbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prisma_rabbitmq_outbox` DROP COLUMN `eventsSchemaData`,
    ADD COLUMN `eventSchemaData` LONGTEXT NOT NULL;
