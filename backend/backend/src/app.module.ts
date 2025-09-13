import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',   // ✅ correct order
      password: 'mypassword',
      database: 'medicine_rs',
      autoLoadEntities: true, // ✅ auto detect entities
      synchronize: true,
    }),
    UserModule,
    ScheduleModule,
    MedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
