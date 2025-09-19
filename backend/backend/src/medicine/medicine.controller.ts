import { Body, Controller, Param, Patch, Post, Get, ParseIntPipe } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create_medicine.dto';
import { Medicine } from './medicine.entity';
import { UpdateMedicineDto } from './dto/update_medicine.dto';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService){}

    @Post()
    async createMedicine(@Body() input: CreateMedicineDto): Promise<Medicine> {
        const medicine = await this.medicineService.createMedicine(input);

        return medicine
    }

    @Get()
    async getAllMedicine(): Promise<Medicine[]> {
        const medicine = await this.medicineService.findAllMedicine();

        return medicine;
    }

    @Get(':id')
    async getOne(id: number): Promise<Medicine>{
        const medicine = await this.medicineService.findOne(id);

        return medicine;
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateMedicineDto,
    ) {
        return this.medicineService.updateMedicine(id, body);
    }
}
