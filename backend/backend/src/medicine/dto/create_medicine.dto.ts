import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    form: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    times_per_day: string[];
}