import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseEvent } from 'src/modules/@shared';
import { PrismaEventSourcingProvider, PrismaIdpotenceConsumer } from 'src/modules/@shared/providers';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventSourcingService {

    static consumerName = "event-sourcing-queue"

    constructor(
        private readonly prismaService: PrismaService,
    ){}

    @RabbitRPC({
        exchange: 'eventSourcing',
        routingKey: "",
        queue:  EventSourcingService.consumerName
      })
    public async consumer(msg: BaseEvent.Schema) {
        console.log("🚀 ~ file: event-sourcing.service.ts:23 ~ EventSourcingService ~ consumer ~ msg:", msg)
        await this.prismaService.$transaction(async (prisma: PrismaClient) => {
            
            const prismaEventSourcingProvider = new PrismaEventSourcingProvider(prisma)
            const prismaIdpotenceConsumer = new PrismaIdpotenceConsumer(prisma)
            
            const isEventRegistered = await prismaIdpotenceConsumer.isEventRegistered(msg.id, EventSourcingService.consumerName)
            if(isEventRegistered) return

            await prismaEventSourcingProvider.insertEvent(msg)
            await prismaIdpotenceConsumer.registerEvent(msg.id, EventSourcingService.consumerName)
  
        })
    }
}
