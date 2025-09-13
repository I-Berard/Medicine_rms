import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateScheduleDto {
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsArray()
    @IsString({each: true})
    @IsOptional()
    times_of_the_day: string[]

    @IsOptional()
    @IsNumber()
    interval_hours: number;

    @IsOptional()
    @IsString()
    start_time: string;

    @IsString()
    medicine_type: string;

}