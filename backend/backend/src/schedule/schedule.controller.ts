import { Get, Controller, Put, Patch, Post, Body, Inject, Param, Delete } from "@nestjs/common";
import { CreateScheduleTimesDto, CreateScheduleIntervalDto } from "./dto/create_schedule.dto";
import { Schedule } from "./shedule.entity";
import { ScheduleService } from "./schedule.service";
import { UpdateScheduleDto } from "./dto/update_schedule.dto";
import { NotificationService } from "src/notification/notification.service";
import { NotificationDto } from "src/notification/dto/notification.dto";

@Controller("schedule")
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
        private readonly notificationService: NotificationService
    ){}

    @Post('times')
    async createTimesSchedule(@Body() input: CreateScheduleTimesDto): Promise<Schedule> {
        const schedule = await this.scheduleService.createTimesSchedule(input);

        return schedule
    }
    
    @Post('interval')
    async createIntervalSchedule(@Body() input: CreateScheduleIntervalDto): Promise<Schedule>{
        const schedule = await this.scheduleService.createIntervalSchedule(input);

        return schedule
    }

    @Get()
    async findAll(): Promise<Schedule[]>{
        const schedules = await this.scheduleService.findAll();

        return schedules;
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Schedule> {
        const schedule = await this.scheduleService.findOne(id);

        return schedule;   
    }

    @Patch(':id')
    async updateSchedule(@Param('id') id: number, @Body() input: UpdateScheduleDto): Promise<Schedule> {
        const schedule = await this.scheduleService.updateSchedule(id, input);

        return schedule;
    }

    @Delete(':id')
    async deleteSchedule(@Param('id') id: number): Promise<{message: string }>{
        const result = await this.scheduleService.removeSchedule(id);
        
        return result;
    }

    @Post('notification')
    async getTimes(@Body() input: NotificationDto): Promise<{ times: string[], name: string }> {
        const notifications = this.notificationService.getNotificationTimes(input); 

        return notifications;
    }
}
