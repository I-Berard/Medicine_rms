export class NotificationDto {
  medicine_type: 'fixed_times' | 'interval';
  times_of_the_day?: string[];
  interval_hours?: number;
  start_time?: string; 
}
