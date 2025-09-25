import { Injectable } from '@nestjs/common';
import { MedicineService } from 'src/medicine/medicine.service';
import { NotificationService } from 'src/notification/notification.service';
import { DashboardDto } from './dto/dashboard.dto';
import { NotificationDto } from 'src/notification/dto/notification.dto';

@Injectable()
export class DashboardService {
    constructor (
        private readonly notificationService: NotificationService,
        private readonly medicineService: MedicineService,
    ){}

    async dashboard(dashboardinput: DashboardDto): Promise<any> {
        const notification_data = {medicine_type: dashboardinput.medicine_type, medicine_name: dashboardinput.medicine_name, times_of_the_day: dashboardinput.times_of_the_day, interval_hours: dashboardinput.interval_hours, start_time: dashboardinput.start_time}
        const notifications = this.notificationService.getNotificationTimes(notification_data);
        const medicine = await this.medicineService.findOneByUserId(dashboardinput.userId);

        return {
            notifications,
            medicine
        }
    }
}
