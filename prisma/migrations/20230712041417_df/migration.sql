/*
  Warnings:

  - You are about to drop the `PrismaRabbitmqOutbox` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `PrismaRabbitmqOutbox`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prisma_rabbitmq_outbox` (
    `id` VARCHAR(191) NOT NULL,
    `eventName` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `schemaVersion` VARCHAR(191) NOT NULL,
    `dateTimeOccurred` DATETIME(3) NOT NULL,
    `payload` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
