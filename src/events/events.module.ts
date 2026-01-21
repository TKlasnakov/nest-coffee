import { Module } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class EventsModule {}
