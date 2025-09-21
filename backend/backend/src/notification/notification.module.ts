import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/schedule/shedule.entity';
import { NotificationService } from './notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule])],
    providers: [NotificationService],
    exports: [NotificationService]
})
export class NotificationModule {}
