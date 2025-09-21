import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './shedule.entity';
import { Medicine } from 'src/medicine/medicine.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { MedicineService } from 'src/medicine/medicine.service';
import { MedicineModule } from 'src/medicine/medicine.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule, Medicine]), NotificationModule],
    controllers: [ScheduleController],
    providers: [ScheduleService],
    exports: [ScheduleService]
})

export class ScheduleModule {}
