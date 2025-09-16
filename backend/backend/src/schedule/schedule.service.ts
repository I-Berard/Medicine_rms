import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/shedule.entity';
import { CreateScheduleIntervalDto, CreateScheduleTimesDto } from './dto/create_schedule.dto';
import { UpdateScheduleDto } from './dto/update_schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async createIntervalSchedule(input: CreateScheduleIntervalDto): Promise<Schedule> {
    const schedule = this.scheduleRepo.create(input);
    return this.scheduleRepo.save(schedule);
  }

  async createTimesSchedule(input: CreateScheduleTimesDto): Promise<Schedule>{
    const schedule = this.scheduleRepo.create(input);
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
    const schedule = await this.scheduleRepo.preload({ id, ...input });
    if (!schedule) throw new NotFoundException('Schedule not found');
    return this.scheduleRepo.save(schedule);
  }

  async removeSchedule(id: number): Promise<{ message: string }> {
    const result = await this.scheduleRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Schedule not found');
    return { message: 'Schedule deleted successfully' };
  }
}
