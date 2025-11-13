import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
    @ApiProperty({ example: 'Aspirin' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    user: number;

    @ApiProperty({ example: 'fixed_times' })
    @IsString()
    @IsNotEmpty()
    form: 'fixed_times' | 'interval';

    @ApiProperty({ example: 'Pain relief medicine' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: ['08:00', '12:00'], required: false })
    @IsOptional()
    times_per_day: string[];
}