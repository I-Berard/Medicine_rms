import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ example: 'fixed_times' })
  medicine_type: 'fixed_times' | 'interval';

  @ApiProperty({ example: 'Aspirin' })
  medicine_name: string;

  @ApiProperty({ example: ['08:00', '12:00'], required: false })
  times_of_the_day?: string[];

  @ApiProperty({ example: 6, required: false })
  interval_hours?: number;

  @ApiProperty({ example: '2023-01-01T08:00:00Z', required: false })
  start_time?: string; 
}

export class NotificationResponseDto {
  @ApiProperty({ example: ['08:00', '12:00'] })
  times: string[];

  @ApiProperty({ example: 'Aspirin' })
  name: string;
}