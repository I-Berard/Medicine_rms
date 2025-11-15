import { ApiProperty } from '@nestjs/swagger';

export class UserSafeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string; // remove if you don’t want to expose it
}
