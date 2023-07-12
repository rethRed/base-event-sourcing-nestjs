import { Module } from '@nestjs/common';
import { EventSourcingService } from './event-sourcing.service';

@Module({
    providers: [
        EventSourcingService
    ]
})
export class EventSourcingModule {}
