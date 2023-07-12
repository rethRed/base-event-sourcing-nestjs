-- AlterTable
ALTER TABLE `prisma_rabbitmq_outbox` ADD COLUMN `error_message` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `retry_count` INTEGER NOT NULL DEFAULT 0;
