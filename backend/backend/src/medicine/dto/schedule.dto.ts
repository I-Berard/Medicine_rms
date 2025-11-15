import { ApiProperty } from '@nestjs/swagger';

export class ScheduleDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false, nullable: true, type: [String] })
  times_of_the_day: string[] | null;

  @ApiProperty({ required: false, nullable: true })
  interval_hours: number | null;

  @ApiProperty({ required: false, nullable: true })
  start_time: string | null;

  @ApiProperty()
  times: number;

  @ApiProperty()
  medicine_type: string;
}
