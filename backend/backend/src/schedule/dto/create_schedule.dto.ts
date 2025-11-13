import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDateString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleIntervalDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    medicine: number;

    @ApiProperty({ example: 6, required: false })
    @IsOptional()
    @IsNumber()
    interval_hours: number;

    @ApiProperty({ example: '2023-01-01T08:00:00Z', required: false })
    @IsOptional()
    @IsString()
    start_time: string;

    @ApiProperty({ example: 'fixed_times' })
    @IsString()
    medicine_type: 'fixed_times' | 'interval';

}

export class CreateScheduleTimesDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    medicine: number;

    @ApiProperty({ example: ['08:00', '12:00'] })
    @IsArray()
    @IsString({each: true})
    times_of_the_day: string[]

    @ApiProperty({ example: 'fixed_times' })
    @IsString()
    medicine_type: 'fixed_times' | 'interval';

}

export class CreateScheduleDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    medicine_id: number;

    @ApiProperty({ example: 6, required: false })
    @IsOptional()
    @IsNumber()
    interval_hours: number;

    @ApiProperty({ example: '2023-01-01T08:00:00Z', required: false })
    @IsOptional()
    @IsString()
    start_time: string;

    @ApiProperty({ example: ['08:00', '12:00'] })
    @IsArray()
    @IsString({each: true})
    times_of_the_day: string[]

    @ApiProperty({ example: 'fixed_times' })
    @IsString()
    medicine_type: 'fixed_times' | 'interval';
}