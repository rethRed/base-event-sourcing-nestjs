import { PrismaClient } from "@prisma/client";
import { BaseEvent } from "../base";

export class PrismaRabbitmqOutbox {

    constructor(
        private readonly prismaClient: PrismaClient,
    ){}

    async publish(event: BaseEvent): Promise<void> {
        await this.prismaClient.prismaRabbitmqOutbox.create({
            data: {
                ...event.format(),
                payload: JSON.stringify(event.payload),
                eventSchemaData: JSON.stringify(event.format())
            }
        })
    }

    async remove(id: string): Promise<void> {
        await this.prismaClient.prismaRabbitmqOutbox.deleteMany({
            where: {
                id
            }
        })
    }
}