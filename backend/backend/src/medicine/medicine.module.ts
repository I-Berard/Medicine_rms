import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/schedule/shedule.entity';
import { Medicine } from './medicine.entity';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule, Medicine])],
    controllers: [MedicineController],
    providers: [MedicineService],
    exports: [MedicineService]
})
export class MedicineModule {}
