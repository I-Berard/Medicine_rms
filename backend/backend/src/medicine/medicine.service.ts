import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Medicine } from "./medicine.entity";
import { Repository } from "typeorm";
import { CreateMedicineDto } from "./dto/create_medicine.dto";

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private readonly med_repo: Repository<Medicine>
    ){}

    createMedicine(input: CreateMedicineDto): Promise<Medicine> {
        const medicine = this.med_repo.create(input);
        return this.med_repo.save(medicine);
    }

    async findAllMedicine(): Promise<Medicine[]>{
        return this.med_repo.find({
            relations: ["user", "schedule"]
        })
    }

    async findOne(id: number): Promise<Medicine> {
        const medicine = await this.med_repo.findOne({
            where: { id },
            relations: ["user", 'shedule'],
        })

        if(!medicine) throw new NotFoundException("Medicine not found");

        return medicine;
    }
}