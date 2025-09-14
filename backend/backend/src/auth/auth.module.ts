import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  imports: [User],
  controllers: [AuthController]
})
export class AuthModule {}
