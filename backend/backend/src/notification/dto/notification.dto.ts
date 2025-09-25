export class NotificationDto {
  medicine_type: 'fixed_times' | 'interval';
  medicine_name: string;
  times_of_the_day?: string[];
  interval_hours?: number;
  start_time?: string; 
}

export class NotificationResponseDto {
  times: string[];
  name: string;
}