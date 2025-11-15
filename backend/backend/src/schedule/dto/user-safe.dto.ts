import { ApiProperty } from '@nestjs/swagger';

export class UserSafeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
