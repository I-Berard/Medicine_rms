import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/shedule.entity';
import { CreateScheduleIntervalDto, CreateScheduleTimesDto } from './dto/create_schedule.dto';
import { UpdateScheduleDto } from './dto/update_schedule.dto';
import { MedicineService } from 'src/medicine/medicine.service';
import { Medicine } from 'src/medicine/medicine.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
    // private readonly medicineServ: MedicineService
    @InjectRepository(Medicine)
    private readonly medRepo: Repository<Medicine>
  ) {}

  async createIntervalSchedule(input: CreateScheduleIntervalDto): Promise<Schedule> {
    const medicine = await this.medRepo.findOne({where: {id : input.medicine}});

    if(!medicine) throw new NotFoundException('Medicine Not Found')

    const schedule = this.scheduleRepo.create({
      ...input,
      medicine
    });    
    return this.scheduleRepo.save(schedule);
  }

  async createTimesSchedule(input: CreateScheduleTimesDto): Promise<Schedule>{
    const medicine = await this.medRepo.findOne({where: {id : input.medicine}});

    if(!medicine) throw new NotFoundException('Medicine Not Found')

    const schedule = this.scheduleRepo.create({
      ...input,
      medicine
    });

    return this.scheduleRepo.save(schedule);
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepo.find({
      relations: ['medicine', 'medicine.user'],
    });
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOne({
      where: { id },
      relations: ['medicine', 'medicine.user'],
    });
    if (!schedule) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  async updateSchedule(id: number, input: UpdateScheduleDto): Promise<Schedule> {
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');

    if (input.medicine_id) {
      const medicine = await this.medRepo.findOne({ where: { id: input.medicine_id } });
      if (!medicine) throw new NotFoundException('Medicine not found');
      schedule.medicine = medicine;
    }

    Object.assign(schedule, { ...input, medicineId: undefined });

    return this.scheduleRepo.save(schedule);
  }


  async removeSchedule(id: number): Promise<{ message: string }> {
    const result = await this.scheduleRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Schedule not found');
    return { message: 'Schedule deleted successfully' };
  }
}
