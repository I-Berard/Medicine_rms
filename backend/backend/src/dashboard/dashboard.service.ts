import { Injectable } from '@nestjs/common';
import { MedicineService } from 'src/medicine/medicine.service';
import { NotificationService } from 'src/notification/notification.service';
import { DashboardDto } from './dto/dashboard.dto';
import { NotificationDto, NotificationResponseDto } from 'src/notification/dto/notification.dto';

@Injectable()
export class DashboardService {
    constructor (
        private readonly notificationService: NotificationService,
        private readonly medicineService: MedicineService,
    ){}

    async dashboard(dashboardinput: DashboardDto): Promise<any> {
        const notifications: NotificationResponseDto[] = [];
        // const notification_data = {medicine_type: dashboardinput.medicine_type, medicine_name: dashboardinput.medicine_name, times_of_the_day: dashboardinput.times_of_the_day, interval_hours: dashboardinput.interval_hours, start_time: dashboardinput.start_time}
        const medicine = await this.medicineService.findOneByUserId(dashboardinput.userId); // This one fetches a user 
        for (const med of medicine){
            for (const sch of med.schedule){
                const notification_data: NotificationDto = {medicine_name: sch.medicine.name, medicine_type: sch.medicine_type, times_of_the_day: sch.times_of_the_day, interval_hours: sch.interval_hours, start_time: sch.start_time};
                const notification = this.notificationService.getNotificationTimes(notification_data);// and later get's this user notification times for the day
                notifications.push(notification);
            }
        }
        console.log(medicine, notifications)

        return {
            notifications,
            medicine
        }
    }
}
