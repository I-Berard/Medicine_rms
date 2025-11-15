import { ApiProperty } from '@nestjs/swagger';
import { UserSafeDto } from './user-safe.dto';

export class MedicineDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  form: string;

  @ApiProperty({ type: UserSafeDto })
  user: UserSafeDto;
}
