import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ScheduleService } from 'src/schedule/schedule.service';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { NotificationModule } from 'src/notification/notification.module';
import { MedicineModule } from 'src/medicine/medicine.module';

@Module({
  imports: [ScheduleModule, NotificationModule, MedicineModule],
  providers: [DashboardService],
  controllers: [DashboardController]
})
export class DashboardModule {}
