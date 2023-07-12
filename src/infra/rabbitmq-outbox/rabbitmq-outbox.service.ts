import { Controller, Injectable, OnModuleInit } from '@nestjs/common';
import { MysqlConsumerService } from '../services';
import { MysqlResponseInterface } from '../services/mysql-consumer/interfaces';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PrismaRabbitmqOutbox } from 'src/modules/@shared/providers';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller()
export class RabbitmqOutboxService implements OnModuleInit {

    constructor(
        private readonly mysqlConsumerService: MysqlConsumerService,
        private readonly amqpConnection: AmqpConnection,
        private readonly prismaService: PrismaService,
    ){}

    async onModuleInit() {
        await this.mysqlConsumerService.setUpConsumer({
            name: "RabbitmqOutbox",
            dbUrl: process.env.DATABASE_URL!,
            tableName: 'prisma_rabbitmq_outbox',
            statement: "INSERT"
        }, (events) => this.handleEvents(events))

    }

    async handleEvents(events: MysqlResponseInterface) {
        events.affectedRows.map(async (event) => {
            const { id, topic, eventName, eventSchemaData } = event.after as RabbitmqOutboxService.OutboxRecord
            
            const eventSchemaDataParsed = JSON.parse(eventSchemaData)
            await this.amqpConnection.publish(topic, eventName, eventSchemaDataParsed)
            await this.amqpConnection.publish("eventSourcing", "", eventSchemaDataParsed) 

            const prismaRabbitmqOutbox = new PrismaRabbitmqOutbox(this.prismaService)
            await prismaRabbitmqOutbox.remove(id)
        })
    }
}


export namespace RabbitmqOutboxService {
    export type OutboxRecord = {
        id: string
        eventName: string
        eventSchemaData: string
        topic: string
        retry_count: number
        error_message: string
        payload: any
    }
}