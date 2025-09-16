import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateScheduleIntervalDto {
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsOptional()
    @IsNumber()
    interval_hours: number;

    @IsOptional()
    @IsString()
    start_time: string;

    @IsString()
    medicine_type: string;

}

export class CreateScheduleTimesDto {
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsArray()
    @IsString({each: true})
    times_of_the_day: string[]

    @IsString()
    medicine_type: string;

}

export class CreateScheduleDto {
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @IsOptional()
    @IsNumber()
    interval_hours: number;

    @IsOptional()
    @IsString()
    start_time: string;

    @IsArray()
    @IsString({each: true})
    times_of_the_day: string[]

    @IsString()
    medicine_type: string;
}