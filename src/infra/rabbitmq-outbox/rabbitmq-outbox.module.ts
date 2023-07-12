import { Module } from '@nestjs/common';
import { RabbitmqOutboxService } from './rabbitmq-outbox.service';
import { MysqlConsumerService } from '../services';

@Module({
    providers: [ 
        MysqlConsumerService,
        RabbitmqOutboxService,
    ],
    imports: [ ],
    controllers: [
        
    ]
})
export class RabbitmqOutboxModule {}
