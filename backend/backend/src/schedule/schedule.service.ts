import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/shedule.entity';
import { CreateScheduleIntervalDto, CreateScheduleTimesDto } from './dto/create_schedule.dto';
import { UpdateScheduleDto } from './dto/update_schedule.dto';
import { MedicineService } from 'src/medicine/medicine.service';
import { Medicine } from 'src/medicine/medicine.entity';
import { ScheduleDto } from './dto/safe-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
    // private readonly medicineServ: MedicineService
    @InjectRepository(Medicine)
    private readonly medRepo: Repository<Medicine>
  ) { }

  async createIntervalSchedule(input: CreateScheduleIntervalDto): Promise<ScheduleDto> { // This just creates a Schedule for a medicine based on intervals and start time
    const medicine = await this.medRepo.findOne({ where: { id: input.medicine } });

    if (!medicine) throw new NotFoundException('Medicine Not Found')

    const schedule = this.scheduleRepo.create({
      ...input,
      medicine
    });
    this.scheduleRepo.save(schedule);
  
    return {
      id: schedule.id,
      medicine: schedule.medicine && {
        id: schedule.medicine?.id,
        name: schedule.medicine?.name,
        form: schedule.medicine?.form,
        user: schedule.medicine?.user && {
          id: schedule.medicine?.user?.id,
          name: schedule.medicine?.user?.name,
        },
      },
      times_of_the_day: schedule.times_of_the_day,
      interval_hours: schedule.interval_hours,
      start_time: schedule.start_time,
      times: schedule.times,
      medicine_type: schedule.medicine_type,
    };
  }

  async createTimesSchedule(input: CreateScheduleTimesDto): Promise<ScheduleDto> { // This one creates a schedule based on an array of times of the day 
    const medicine = await this.medRepo.findOne({ where: { id: input.medicine } });

    if (!medicine) throw new NotFoundException('Medicine Not Found')

    const schedule = this.scheduleRepo.create({
      ...input,
      medicine
    });

    this.scheduleRepo.save(schedule);

    return {
      id: schedule.id,
      medicine: schedule.medicine && {
        id: schedule.medicine?.id,
        name: schedule.medicine?.name,
        form: schedule.medicine?.form,
        user: schedule.medicine?.user && {
          id: schedule.medicine?.user?.id,
          name: schedule.medicine?.user?.name,
        },
      },
      times_of_the_day: schedule.times_of_the_day,
      interval_hours: schedule.interval_hours,
      start_time: schedule.start_time,
      times: schedule.times,
      medicine_type: schedule.medicine_type,
    };
  }

  async findAll(): Promise<ScheduleDto[]> { // this just finds all schedules 
    const results = this.scheduleRepo.find({
      relations: ['medicine', 'medicine.user'],
    });

    return (await results).map(s => ({
      id: s.id,
      medicine: s.medicine && {
        id: s.medicine?.id,
        name: s.medicine?.name,
        form: s.medicine?.form,
        user: s.medicine?.user && {
          id: s.medicine?.user?.id,
          name: s.medicine?.user?.name,
        },
      },
      times_of_the_day: s.times_of_the_day,
      interval_hours: s.interval_hours,
      start_time: s.start_time,
      times: s.times,
      medicine_type: s.medicine_type,
    }));


  }

  async findOne(id: number): Promise<ScheduleDto> {
    const s = await this.scheduleRepo.findOne({ // This finds one schedule based on its id in the database
      where: { id },
      relations: ['medicine', 'medicine.user'],
    });
    if (!s) throw new NotFoundException('Schedule not found');
    
    return  {
      id: s.id,
      medicine: s.medicine && {
        id: s.medicine?.id,
        name: s.medicine?.name,
        form: s.medicine?.form,
        user: s.medicine?.user && {
          id: s.medicine?.user?.id,
          name: s.medicine?.user?.name,
        },
      },
      times_of_the_day: s.times_of_the_day,
      interval_hours: s.interval_hours,
      start_time: s.start_time,
      times: s.times,
      medicine_type: s.medicine_type,
    };
  }

  async updateSchedule(id: number, input: UpdateScheduleDto): Promise<string> { // This one is used to update the schedule in the database
    const schedule = await this.scheduleRepo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException('Schedule not found');

    if (input.medicine_id) {
      const medicine = await this.medRepo.findOne({ where: { id: input.medicine_id } });
      if (!medicine) throw new NotFoundException('Medicine not found');
      schedule.medicine = medicine;
    }

    Object.assign(schedule, { ...input, medicineId: undefined });

    this.scheduleRepo.save(schedule);

    return "Successfully updated schedule"
  }


  async removeSchedule(id: number): Promise<{ message: string }> { // This pretty much does the job of removing the schedule from the database
    const result = await this.scheduleRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Schedule not found');
    return { message: 'Schedule deleted successfully' };
  }
}
