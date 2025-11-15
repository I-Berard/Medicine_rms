import { ApiProperty } from '@nestjs/swagger';
import { MedicineDto } from './medicine.dto';

export class ScheduleDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: MedicineDto })
  medicine: MedicineDto;

  @ApiProperty()
  times_of_the_day: string[];

  @ApiProperty()
  interval_hours: number;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  times: number;

  @ApiProperty()
  medicine_type: string;
}
