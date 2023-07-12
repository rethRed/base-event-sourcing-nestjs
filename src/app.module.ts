import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { RabbitmqOutboxModule } from './infra/rabbitmq-outbox/rabbitmq-outbox.module';
import { RabbitModule } from './rabbitmq';
import { EventSourcingModule } from './infra/event-sourcing/event-sourcing.module';

@Module({
  imports: [
    RabbitModule,
    PrismaModule,
    UserModule,
    RabbitmqOutboxModule,
    EventSourcingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
