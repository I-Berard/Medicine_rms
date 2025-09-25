import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from './schedule/schedule.module';
import { MedicineModule } from './medicine/medicine.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserController } from './users/user.controller';
import { MedicineController } from './medicine/medicine.controller';
import { ScheduleController } from './schedule/schedule.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { DashboardModule } from './dashboard/dashboard.module';

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
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    NotificationModule,
    DashboardModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, NotificationService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes(
      UserController,
      MedicineController,
      ScheduleController
    )
  }
}
