import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';

@Module({
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
