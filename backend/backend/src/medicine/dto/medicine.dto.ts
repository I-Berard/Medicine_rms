import { ApiProperty } from '@nestjs/swagger';
import { UserSafeDto } from './user-safe.dto';
import { ScheduleDto } from './schedule.dto';

export class MedicineDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  form: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: () => UserSafeDto, nullable: true })
  user: UserSafeDto | null;

  @ApiProperty({ type: () => [ScheduleDto] })
  schedule: ScheduleDto[];
}
