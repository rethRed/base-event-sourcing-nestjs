-- CreateTable
CREATE TABLE `event_sourcing` (
    `id` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `eventName` VARCHAR(191) NOT NULL,
    `schemaVersion` VARCHAR(191) NOT NULL,
    `dateTimeOccurred` DATETIME(3) NOT NULL,
    `payload` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `idpotence_consumer` (
    `eventId` VARCHAR(191) NOT NULL,
    `consumerName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`eventId`, `consumerName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
