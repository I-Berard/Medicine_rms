import { Injectable } from '@nestjs/common';
import { Schedule } from 'src/schedule/shedule.entity';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    getNotificationTimes(schedule: NotificationDto): Date[] {
        const notifications: Date[] = [];
        const now = new Date();

        if (schedule.medicine_type === 'fixed_times'){
            const today = new Date()
            console.log(schedule.times_of_the_day)
            for (const time of schedule.times_of_the_day! ){
                const [hours, minutes] = time.split(":").map(Number)
                const date = new Date(today);
                date.setHours(hours, minutes, 0, 0);
                if(date > now){
                    notifications.push(date)
                }
            }
        }else if(schedule.medicine_type === "interval"){
            const [hours, minutes] = schedule.medicine_type.split(':').map(Number);

            let start = new Date(now)
            start.setHours(hours, minutes, 0, 0)
            
            while(start < now) {
                start = new Date(start.getTime() + schedule.interval_hours! * 60 * 60 * 1000);
            }

            for (let i = 0; i < 5; i++) {
                notifications.push(new Date(start.getTime() + i * schedule.interval_hours! * 60 * 60 * 1000));
            }

        }
        console.log(notifications)
        return notifications;
    }
}
