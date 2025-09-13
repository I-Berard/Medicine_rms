import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './shedule.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule, Medicine])],
    controllers: [ScheduleController],
    providers: [ScheduleService],
    exports: [ScheduleService]
})

export class ScheduleModule {}
