import { Controller, Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaRabbitmqOutbox } from 'src/modules/@shared/providers';
import { PrismaService } from 'src/prisma/prisma.service';
import { BaseEvent } from 'src/modules/@shared';
import { OutboxRecord } from './interface';
import { PublishEventRabbitmqService } from './publish-event-rabbitmq.service';

@Controller()
export class RetryRabbitmqOutboxService implements OnModuleInit {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly publishEventRabbitmqService: PublishEventRabbitmqService
    ){}

    async onModuleInit() {
        const prismaRabbitmqOutbox = new PrismaRabbitmqOutbox(this.prismaService)
        setInterval(async () => {
            const failedEvents = await prismaRabbitmqOutbox.getAllFailedEvents()
            for (const event of failedEvents) {
                this.publishEventRabbitmqService.publish(event)
            }
        }, 1500 ) // 1.5 seconds
    }

    
}
